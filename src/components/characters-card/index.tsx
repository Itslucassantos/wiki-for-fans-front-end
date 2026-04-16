import Image from "next/image";
import Link from "next/link";

interface CharacterCardProps {
  href: string;
  characterName: string;
  actorName: string;
  actorProfileImage?: string | null;
  actorKnownFor: string;
  actorAlsoKnownAs: string[];
}

export function CharactersCard({
  href,
  characterName,
  actorName,
  actorProfileImage,
  actorKnownFor,
  actorAlsoKnownAs,
}: CharacterCardProps) {
  return (
    <Link
      href={href}
      className="block bg-gray-900 rounded-lg group overflow-hidden hover:scale-105 duration-200"
    >
      <div className="relative w-full h-80 bg-cover bg-center object-cover overflow-hidden rounded-t-lg">
        {actorProfileImage ? (
          <Image
            src={actorProfileImage}
            alt={actorName}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image available</span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-gray-300 line-clamp-3">
              Known for: {actorKnownFor}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-white font-semibold text-xl">
          {characterName}
        </h3>

        <p className="text-gray-400 text-sm mb-3 font-medium">
          Played by: {actorName}
        </p>

        {actorAlsoKnownAs.length > 0 && (
          <div className="mb-3">
            <p className="text-gray-400 text-xs mb-1">Also known as:</p>
            <div className="flex flex-wrap gap-1">
              {actorAlsoKnownAs.slice(0, 2).map((alias, index) => (
                <span
                  key={index}
                  className="border border-gray-700 rounded-lg px-2 text-xs text-gray-300 py-1"
                >
                  {alias}
                </span>
              ))}
              {actorAlsoKnownAs.length > 2 && (
                <span className="border border-gray-700 rounded-lg px-2 text-xs text-gray-300 py-1">
                  +{actorAlsoKnownAs.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
