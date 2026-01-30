export interface MovieCardInfo {
  id: number;
  favorite: boolean;
  originalTitle: string;
  releaseDate: string;
  overview: string;
  voteAverage: number;
  posterPath: string;
  genres: GenreInfo[];
}

interface GenreInfo {
  id: number;
  name: string;
}
