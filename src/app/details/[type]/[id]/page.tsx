"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLibraryDetails } from "@/lib/library-detail";
import { isMediaType } from "@/types/media.types";
import { api } from "@/lib/api";
import { ArrowLeft, Calendar, Clock, Heart, Star } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/container";
import { CharactersCard } from "@/components/characters-card";

export default function DetailsClient() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

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

  const toggleFavoriteMutation = useMutation({
    mutationFn: (nextFavorite: boolean) =>
      api.post(`${type}/favorite`, {
        id: id,
        favorite: nextFavorite,
      }),

    onError: (error) => {
      console.log("Error:", error);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library-details"] });
      queryClient.invalidateQueries({ queryKey: ["library"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
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

  const isMovie = data.type === "movie";
  const title = isMovie ? data.originalTitle : data.originalName;
  const posterImage = isMovie ? data.posterPath : data.posterImage;
  const backdropImage = isMovie ? data.backdropPath : data.backdropImage;
  const releaseDate = isMovie ? data.releaseDate : data.firstAirDate;

  return (
    <Container>
      <div className="relative">
        <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
          {backdropImage ? (
            <Image
              src={backdropImage}
              alt={title}
              quality={100}
              fill
              className="object-cover object-top"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-900" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/30" />
        </div>

        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 hover:bg-white/20 hover:text-black text-white px-3 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-8 pt-20 pb-10">
          <div className="relative w-52 sm:w-64 aspect-2/3 shrink-0">
            {posterImage ? (
              <Image
                src={posterImage}
                alt={title}
                quality={100}
                fill
                className="object-cover rounded-lg"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center text-sm text-gray-300">
                No image
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-white font-bold text-3xl text-center my-5 lg:my-0">
                {title}
              </h1>

              {isMovie && (
                <button
                  onClick={() => toggleFavoriteMutation.mutate(!data.favorite)}
                  disabled={toggleFavoriteMutation.isPending}
                  className={`${!data.favorite ? "hover:text-white" : ""} flex items-center justify-center hover:bg-red-600 h-8 w-8 hover:rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors mr-20`}
                >
                  <Heart
                    className={`${data.favorite ? "fill-red-500 text-red-500" : "text-white"} h-4 w-4`}
                  />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-4 items-center mb-3">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />

                <span className="text-white font-bold">{data.voteAverage}</span>

                <p className="text-gray-400">({data.voteCount} votes)</p>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                <p>{releaseDate}</p>
              </div>

              {isMovie && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{data.runtime} min</span>
                </div>
              )}
            </div>

            <div className="mb-3">
              {data.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="text-white bg-red-500 px-2 py-1 rounded-md text-sm mt-4 mr-2"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div>
              <h2 className="text-white font-bold text-2xl">Overview</h2>
              <p className="text-gray-400">{data.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-white font-bold text-2xl">Main Cast</h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 mb-8">
          {data.characters.map((character) => (
            <CharactersCard
              key={character.id}
              href={`/details/${type}/${id}/character?character=${encodeURIComponent(JSON.stringify(character))}`}
              characterName={character.characterName}
              actorName={character.actorName}
              actorProfileImage={character.actorProfileImage}
              actorKnownFor={character.actorKnownFor}
              actorAlsoKnownAs={character.actorAlsoKnownAs}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
