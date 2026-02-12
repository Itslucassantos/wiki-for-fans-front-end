export interface CharacterInfo {
  id: number;
  characterName: string;
  actorId: number;
  actorName: string;
  actorBiography: string;
  actorBirthday?: string | null;
  actorDeathday?: string | null;
  actorAge?: number | null;
  actorPlaceOfBirth?: string | null;
  actorProfileImage?: string | null;
  actorPopularity: number;
  actorGender: string;
  actorKnownFor: string;
  actorAlsoKnownAs: string[];
  actorHomepage?: string | null;
  actorImdbId: string;
}
