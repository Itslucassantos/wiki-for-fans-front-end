"use client";
import { api } from "@/lib/api";
import { Card } from "../card";
import { CardInfo } from "@/types/card";
import { useQuery } from "@tanstack/react-query";

export function Library() {
  const { data, isLoading, isError } = useQuery<CardInfo[]>({
    queryKey: ["library"],
    queryFn: fetchLibrary,
  });

  if (isLoading) {
    return <p className="text-white">Loading library...</p>;
  }

  if (isError || !data) {
    return <p className="text-white">Failed to load library</p>;
  }

  if (data.length === 0) {
    return (
      <p className="text-white">Your movie and TV show library is empty</p>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 mb-8">
      {data.length === 0 ? (
        <p>Your movie and TV show library is empty</p>
      ) : (
        data.map((card) => <Card key={card.id} card={card} />)
      )}
    </div>
  );
}

async function fetchLibrary(): Promise<CardInfo[]> {
  const [movies, tvshows] = await Promise.all([
    api.get<CardInfo[]>("/movie/searchAllMovies"),
    api.get<CardInfo[]>("/tvshow/searchAllTvShows"),
  ]);

  console.log(tvshows.data);

  return [
    ...movies.data.map((movie) => ({ ...movie, type: "movie" as const })),
    ...tvshows.data.map((tvshow) => ({ ...tvshow, type: "tvshow" as const })),
  ];
}
