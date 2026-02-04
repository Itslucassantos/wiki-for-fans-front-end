import { CardInfo, GenreInfo, MediaType } from "@/types/card";
import { Calendar, Heart, Star, Trash2 } from "lucide-react";

interface Card {
  favorite: boolean;
  name: string;
  date: string;
  overview: string;
  voteAverage: number;
  posterImg: string;
  genres: GenreInfo[];
  type: MediaType;
}

export function Card({
  favorite,
  name,
  date,
  overview,
  voteAverage,
  posterImg,
  genres,
  type,
}: Card) {
  return (
    <div className="bg-gray-900 rounded-lg group overflow-hidden hover:scale-105 duration-200">
      <div
        className="relative w-full h-100 bg-cover bg-center object-cover overflow-hidden rounded-t-lg hover:cursor-pointer"
        style={{ backgroundImage: `url(${posterImg})` }}
      >
        <div className="flex items-center justify-between mt-3 px-2">
          <div className="border bg-black/80 border-gray-700 rounded-lg px-2 flex items-center justify-center py-1">
            <span className="text-xs text-white font-medium">
              {type === "movie" ? "Movie" : "TV Show"}
            </span>
          </div>

          <div className="border border-gray-700 rounded-lg px-2 py-1 bg-black/80">
            <div className="flex items-center gap-2">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs text-white font-semibold">
                {voteAverage.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-gray-300 line-clamp-3">{overview}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-white font-semibold cursor-pointer text-xl hover:text-red-500 duration-300">
          {name}
        </h3>

        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <Calendar className="h-3 w-3" />
          <p>{date}</p>
        </div>

        <div className="w-full flex items-center gap-2 mb-3">
          {genres.slice(0, 3).map((genre) => (
            <div
              key={genre.id}
              className="border border-gray-700 rounded-lg px-2 flex items-center justify-center py-1"
            >
              <span className="text-xs text-gray-300 font-medium">
                {genre.name}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center gap-2">
          <button className="flex flex-1 items-center justify-center hover:bg-red-600 hover:text-white h-8 hover:rounded-lg">
            <Heart className="h-4 w-4" />
          </button>
          <button className="flex flex-1 items-center justify-center hover:bg-red-600 hover:text-white h-8 hover:rounded-lg">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
