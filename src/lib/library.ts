import { api } from "@/lib/api";
import { CardInfo, CardMovieInfo, CardTvShowInfo } from "@/types/card";

export async function fetchLibrary(): Promise<CardInfo[]> {
  const [movies, tvshows] = await Promise.all([
    api.get<CardMovieInfo[]>("/movie/searchAllMovies"),
    api.get<CardTvShowInfo[]>("/tvshow/searchAllTvShows"),
  ]);

  return [
    ...movies.data.map((movie) => ({
      ...movie,
      type: "movie" as const,
    })),
    ...tvshows.data.map((tvshow) => ({
      ...tvshow,
      type: "tvshow" as const,
    })),
  ];
}

export async function fetchFavoriteLibrary(): Promise<CardInfo[]> {
  const [movies, tvshows] = await Promise.all([
    api.get<CardMovieInfo[]>("/movie/searchAllFavorites"),
    api.get<CardTvShowInfo[]>("/tvshow/searchAllFavorites"),
  ]);

  return [
    ...movies.data.map((movie) => ({
      ...movie,
      type: "movie" as const,
    })),
    ...tvshows.data.map((tvshow) => ({
      ...tvshow,
      type: "tvshow" as const,
    })),
  ];
}
