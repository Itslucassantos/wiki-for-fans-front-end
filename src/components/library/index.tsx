"use client";
import { Card } from "../card";
import { CardInfo } from "@/types/card.types";
import { useQuery } from "@tanstack/react-query";
import { fetchLibrary } from "@/lib/library";

export function Library() {
  const { data, isLoading, isError } = useQuery<CardInfo[]>({
    queryKey: ["library"],
    queryFn: fetchLibrary,
  });

  if (isLoading) {
    return (
      <p className="text-white text-center mt-20 font-medium text-lg">
        Loading library...
      </p>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-white text-center mt-20 font-medium text-lg">
        Failed to load library...
      </p>
    );
  }

  return (
    <section>
      {data.length === 0 ? (
        <p className="font-medium text-lg text-white text-center mt-20">
          Your movie and TV show library is empty...
        </p>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 mb-8">
          {data.map((card) => {
            if (card.type === "movie") {
              return (
                <Card
                  key={`movie-${card.id}`}
                  id={card.id}
                  type="movie"
                  favorite={card.favorite}
                  name={card.originalTitle}
                  date={card.releaseDate}
                  overview={card.overview}
                  voteAverage={card.voteAverage}
                  posterImg={card.posterPath}
                  genres={card.genres}
                />
              );
            }

            return (
              <Card
                key={`tvshow-${card.id}`}
                id={card.id}
                type="tvshow"
                favorite={card.favorite}
                name={card.originalName}
                date={card.firstAirDate}
                overview={card.overview}
                voteAverage={card.voteAverage}
                posterImg={card.posterImage}
                genres={card.genres}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
