"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchLibraryDetails } from "@/lib/library-detail";
import { MediaType } from "@/types/card.types";

export default function DetailsClient() {
  const params = useParams<{
    id: string;
    type: MediaType;
  }>();
  const id = Number(params.id);
  const type = params.type;

  const { data, isLoading, error } = useQuery({
    queryKey: ["library-details", type, id],
    queryFn: () => fetchLibraryDetails(type, id),
    enabled: !!id && !!type,
  });

  console.log(data);

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error loading details</p>;

  return (
    <div>
      <h1>{data?.name}</h1>
    </div>
  );
}
