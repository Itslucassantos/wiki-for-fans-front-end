import { MediaType } from "@/types/card.types";
import { api } from "./api";

const endpointByType: Record<MediaType, string> = {
  movie: "/movie/searchMovieById",
  tvshow: "/tvshow/searchTvShowById",
};

export async function fetchLibraryDetails(type: MediaType, id: number) {
  const endpoint = endpointByType[type];

  const { data } = await api.get(endpoint, {
    params: { id },
  });

  return data;
}
