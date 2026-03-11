import { api } from "./api";
import { MediaType } from "@/types/media.types";
import { MovieInfo } from "@/types/movie.types";
import { TvShowInfo } from "@/types/tvshow.types";

export type LibraryDetailsResult =
  | { type: "movie"; data: MovieInfo }
  | { type: "tvshow"; data: TvShowInfo };

const endpointByType: Record<MediaType, string> = {
  movie: "/movie/searchMovieById",
  tvshow: "/tvshow/searchTvShowById",
};

export async function fetchLibraryDetails(
  type: MediaType,
  id: number,
): Promise<LibraryDetailsResult> {
  if (type === "movie") {
    const { data } = await api.get<MovieInfo>(endpointByType.movie, {
      params: { id },
    });

    return {
      type: "movie",
      data,
    };
  }

  const { data } = await api.get<TvShowInfo>(endpointByType.tvshow, {
    params: { id },
  });

  return {
    type: "tvshow",
    data,
  };
}
