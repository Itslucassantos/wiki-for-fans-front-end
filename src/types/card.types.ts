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
  backdropPath?: string;
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
  backdropImage?: string;
  genres: GenreInfo[];
}

export interface GenreInfo {
  id: number;
  name: string;
}
