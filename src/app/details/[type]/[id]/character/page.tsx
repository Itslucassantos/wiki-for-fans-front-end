"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { CharacterInfo } from "@/types/character.types";

export default function CharacterDetailsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const character = useMemo<CharacterInfo | null>(() => {
    const rawCharacter = searchParams.get("character");

    if (!rawCharacter) {
      return null;
    }

    try {
      return JSON.parse(decodeURIComponent(rawCharacter)) as CharacterInfo;
    } catch {
      return null;
    }
  }, [searchParams]);

  if (!character) {
    return (
      <div className="relative min-h-screen bg-black text-white">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 hover:bg-white/20 hover:text-black text-white px-3 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="relative h-64 w-full bg-linear-to-b from-gray-900 to-black" />

        <p className="text-center pt-10 font-medium text-lg">
          Character data not found.
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-10 flex items-center gap-2 hover:bg-white/20 hover:text-black text-white px-3 py-2 rounded-lg transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="relative h-24 w-full bg-linear-to-b from-gray-900 to-black" />

      <div className="px-6 pb-8 sm:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-72 h-96 rounded-lg overflow-hidden bg-gray-800 shrink-0">
            {character.actorProfileImage ? (
              <Image
                src={character.actorProfileImage}
                alt={character.actorName}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No image available
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-white text-3xl font-bold mb-2">
              {character.characterName}
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Played by: {character.actorName}
            </p>

            <div className="space-y-2 text-gray-300">
              <p>Known for: {character.actorKnownFor}</p>
              <p>Popularity: {character.actorPopularity}</p>
              <p>Gender: {character.actorGender}</p>
              {character.actorBirthday && (
                <p>Birthday: {character.actorBirthday}</p>
              )}
              {character.actorDeathday && (
                <p>Deathday: {character.actorDeathday}</p>
              )}
              {character.actorAge && <p>Age: {character.actorAge}</p>}
              {character.actorPlaceOfBirth && (
                <p>Place of birth: {character.actorPlaceOfBirth}</p>
              )}
              {character.actorImdbId && <p>IMDB: {character.actorImdbId}</p>}
            </div>

            {character.actorAlsoKnownAs.length > 0 && (
              <div className="mt-6">
                <p className="text-gray-400 text-sm mb-2">Also known as</p>
                <div className="flex flex-wrap gap-2">
                  {character.actorAlsoKnownAs.map((alias) => (
                    <span
                      key={alias}
                      className="border border-gray-700 rounded-lg px-2 py-1 text-xs text-gray-300"
                    >
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {character.actorBiography && (
              <div className="mt-6">
                <h2 className="text-white text-xl font-semibold mb-2">
                  Biography
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {character.actorBiography}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
