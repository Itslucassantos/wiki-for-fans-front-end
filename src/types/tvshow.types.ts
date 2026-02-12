import { CharacterInfo } from "./character.types";
import { GenreInfo } from "./movie.types";

export interface TvShowInfo {
  id: number;
  name: string;
  originalName: string;
  overview: string;
  posterImage?: string | null;
  backdropImage?: string | null;
  firstAirDate: string;
  voteAverage: number;
  voteCount: number;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  status: string;
  genres: GenreInfo[];
  characters: CharacterInfo[];
}
