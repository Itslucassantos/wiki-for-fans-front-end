import { CharacterInfo } from "./character.types";

export interface MovieCardInfo {
  id: number;
  posterPath: string | null;
  backdropPath: string | null;
  originalTitle: string;
  voteAverage: number;
  voteCount: number;
  releaseDate: string;
  runtime: number;
  genres: GenreInfo[];
  overview: string;
  favorite: boolean;
  characters: CharacterInfo[];
}

export interface GenreInfo {
  id: number;
  name: string;
}
