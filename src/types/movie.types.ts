import { CharacterInfo } from "./character.types";

export interface MovieInfo {
  id: number;
  posterPath: string;
  backdropPath: string;
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
