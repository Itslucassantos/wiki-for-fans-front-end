"use client";

import { fetchLibrary } from "@/lib/library";
import { CardInfo } from "@/types/card.types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface BannerItem {
  id: number;
  type: "movie" | "tvshow";
  title: string;
  overview: string;
  image: string;
  date: string;
}

export function HomeBanners() {
  const { data } = useQuery<CardInfo[]>({
    queryKey: ["library"],
    queryFn: fetchLibrary,
  });

  const banners = useMemo<BannerItem[]>(() => {
    if (!data) {
      return [];
    }

    const movieBanners = data
      .filter((item) => item.type === "movie")
      .slice(0, 2)
      .map((movie) => ({
        id: movie.id,
        type: "movie" as const,
        title: movie.originalTitle,
        overview: movie.overview,
        image: movie.backdropPath || movie.posterPath,
        date: movie.releaseDate,
      }));

    const tvShowBanners = data
      .filter((item) => item.type === "tvshow")
      .slice(0, 2)
      .map((tvshow) => ({
        id: tvshow.id,
        type: "tvshow" as const,
        title: tvshow.originalName,
        overview: tvshow.overview,
        image: tvshow.backdropImage || tvshow.posterImage,
        date: tvshow.firstAirDate,
      }));

    return [...movieBanners, ...tvShowBanners];
  }, [data]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [banners.length]);

  useEffect(() => {
    if (activeIndex >= banners.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, banners.length]);

  if (!banners.length) {
    return null;
  }

  return (
    <section className="relative w-11/12 max-w-6xl mx-auto my-10 h-105 rounded-xl overflow-hidden">
      {banners.map((banner, index) => (
        <article
          key={`${banner.type}-${banner.id}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <div className="absolute inset-0">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              quality={100}
              className="object-cover"
              priority={index === 0}
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/20" />

          <div className="relative z-10 h-full flex items-end">
            <div className="p-6 sm:p-8 max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-gray-300 mb-2">
                {banner.type === "movie" ? "Movie" : "TV Show"} • {banner.date}
              </p>
              <h2 className="text-white text-2xl sm:text-4xl font-bold mb-3 line-clamp-2">
                {banner.title}
              </h2>
              <p className="text-gray-200 text-sm sm:text-base line-clamp-3 mb-5">
                {banner.overview}
              </p>

              <Link
                href={`/details/${banner.type}/${banner.id}`}
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
              >
                View details
              </Link>
            </div>
          </div>
        </article>
      ))}

      <div className="absolute z-20 bottom-4 right-4 flex items-center gap-2">
        {banners.map((banner, index) => (
          <button
            key={`${banner.type}-${banner.id}-dot`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? "w-7 bg-white" : "w-2.5 bg-white/45"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
