export type MediaType = "movie" | "tvshow";

export interface CardInfo {
  id: number;
  type: MediaType;

  favorite: boolean;
  originalTitle: string;
  releaseDate: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
  genres: GenreInfo[];
}

export interface GenreInfo {
  id: number;
  name: string;
}
