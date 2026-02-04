export type CardInfo =
  | ({ type: "movie" } & CardMovieInfo)
  | ({ type: "tvshow" } & CardTvShowInfo);

export interface CardMovieInfo {
  id: number;
  favorite: boolean;
  originalTitle: string;
  releaseDate: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
  genres: GenreInfo[];
}

export interface CardTvShowInfo {
  id: number;
  favorite: boolean;
  originalName: string;
  firstAirDate: string;
  overview: string;
  voteAverage: number;
  posterImage: string;
  genres: GenreInfo[];
}

export type MediaType = "movie" | "tvshow";

export interface GenreInfo {
  id: number;
  name: string;
}
