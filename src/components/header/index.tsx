"use client";

import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Film, Heart, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  type: z.enum(["movie", "tvshow"]),
  search: z.string().min(1, "this field is mandatory"),
});

type FormData = z.infer<typeof schema>;

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "movie",
      search: "",
    },
  });

  async function handleSearchForMovieOrTvshow(data: FormData) {
    if (data.search === "" || data.search === null) return;
    setIsSearching(true);

    try {
      await api.post(data.type === "tvshow" ? "/tvshow" : "/movie", {
        nameReq: data.search,
      });

      queryClient.invalidateQueries({
        queryKey: ["library"],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <header className="w-full bg-black/95 relative">
      <div className="h-20 px-4 md:px-6 flex items-center justify-around">
        <div className="sm:hidden mr-5">
          <Menu
            className="text-white w-6 h-6 cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>

        <nav
          className={`
            ${openMenu ? "flex" : "hidden"}
            sm:flex
            flex-col sm:flex-row
            items-start sm:items-center
            gap-2 sm:gap-5
            absolute sm:static
            top-16 left-0
            w-full sm:w-auto
            bg-black/95 sm:bg-transparent
            px-4 py-4 sm:p-0
            z-50
          `}
        >
          <div className="hidden sm:flex justify-center items-center">
            <Film className="h-8 w-8 text-red-600" />
            <Link href="/" className="text-white text-2xl font-bold ml-1">
              FanWiki
            </Link>
          </div>

          <Link
            href="/"
            className={`text-lg text-gray-400 transition-all
              ${pathname === "/" ? "font-bold text-white" : "font-semibold"}
            `}
          >
            Home
          </Link>

          <div>
            <Link
              href="/favorites"
              className={`flex items-center text-gray-400 gap-1 text-lg transition-all
                ${pathname === "/favorites" ? "font-bold text-white" : "font-semibold"}
              `}
            >
              <Heart className="h-4 w-4" />
              <span className="text-lg ml-1">Favorites</span>
            </Link>
          </div>
        </nav>

        <form
          onSubmit={handleSubmit(handleSearchForMovieOrTvshow)}
          className="flex items-center gap-2 md:ml-4"
        >
          <select
            id="type"
            {...register("type")}
            className="text-white text-sm sm:text-base bg-gray-900 border border-gray-700 px-2 rounded focus:bg-gray-800 h-8"
          >
            <option value="movie">Movie</option>
            <option value="tvshow">TV Show</option>
          </select>

          <input
            id="search"
            type="text"
            placeholder="Search for movies and series..."
            {...register("search")}
            className="w-full md:w-64 text-white text-sm sm:text-base outline-none bg-gray-900 border border-gray-700 placeholder:text-gray-400 px-2 rounded h-8"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white rounded px-3 h-8 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSearching}
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>
    </header>
  );
}
