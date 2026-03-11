"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchLibraryDetails } from "@/lib/library-detail";
import { isMediaType } from "@/types/media.types";
import { Calendar, Clock, Star } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/container";

export default function DetailsClient() {
  const params = useParams();

  const id = Number(params.id);
  const rawType = params.type as string;

  if (!isMediaType(rawType)) {
    throw new Error("Invalid media type");
  }

  const type = rawType;

  const { data, isLoading, error } = useQuery({
    queryKey: ["library-details", type, id],
    queryFn: () => fetchLibraryDetails(type, id),
    select: (result) => {
      if (result.type === "movie") {
        return {
          type: "movie" as const,
          ...result.data,
        };
      }

      return {
        type: "tvshow" as const,
        ...result.data,
      };
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <p className="text-white text-center mt-20 font-medium text-lg">
        Loading details...
      </p>
    );
  }

  if (error || !data) {
    return (
      <p className="text-white text-center mt-20 font-medium text-lg">
        Failed to load details...
      </p>
    );
  }

  if (data.type === "tvshow") {
    return <h1 className="text-white">{data.originalName}</h1>;
  }

  return (
    <Container>
      <section>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="relative w-54 h-76 sm:w-64 sm:h-96 ">
            <Image
              src={data.posterPath}
              alt={data.originalTitle}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div>
            <h1 className="text-white font-bold text-3xl text-center my-5 lg:my-0">
              {data.originalTitle}
            </h1>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />

                <span className="text-white font-bold">{data.voteAverage}</span>

                <p className="text-gray-400">({data.voteCount} votes)</p>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                <p>{data.releaseDate}</p>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{data.runtime} min</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
