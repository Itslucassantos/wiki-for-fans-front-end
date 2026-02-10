"use client";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { fetchFavoriteLibrary } from "@/lib/library";
import { CardInfo } from "@/types/card";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { data, isLoading, isError } = useQuery<CardInfo[]>({
    queryKey: ["favorites"],
    queryFn: fetchFavoriteLibrary,
  });

  if (isLoading) {
    return (
      <p className="text-white text-center mt-20 font-medium text-lg">
        Loading favorites...
      </p>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-white text-center mt-20 font-medium text-lg">
        Failed to load favorites...
      </p>
    );
  }

  return (
    <>
      <Header />

      <Container>
        <div className="flex gap-4 items-center">
          <Heart className="fill-red-500 text-red-500 h-8 w-8 sm:h-10 sm:w-10" />
          <h1 className="text-white text-2xl sm:text-3xl">My Favorites</h1>
        </div>

        {data.length > 0 && (
          <h2 className="text-gray-400 mt-2 font-normal text-md">
            {data.length} favorites
          </h2>
        )}

        <section>
          {data.length === 0 ? (
            <p className="font-medium text-lg text-white text-center mt-20">
              No movies or TV shows on your favorites list...
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
      </Container>
    </>
  );
}
