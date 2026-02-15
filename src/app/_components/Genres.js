import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DownArrow from "./_icons/DownArrow";
import Badge from "./Badge";
import { tmdbFetch } from "@/lib/tmdb";

export const Genres = () => {
  const router = useRouter();
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGenreData = async () => {
    setLoading(true);
    try {
      const genreResponse = await tmdbFetch("/genre/movie/list", {
        language: "en",
      });
      setGenreData(genreResponse.genres || []);
    } catch (error) {
      console.error("Error fetching genre data:", error);
      setGenreData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGenreData();
  }, []);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 h-9 justify-center border border-[#E4E4E7] dark:border-[#27272A] rounded-md px-4 py-2 hover:bg-[#E4E4E7] dark:hover:bg-[#27272A] cursor-pointer bg-white dark:bg-[#09090B] text-[14px]">
            <DownArrow className="" />
            <span>Genre</span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="max-h-[360px] w-[calc(100vw-2rem)] sm:w-[420px] md:w-[577px] overflow-auto flex flex-col border dark:border-[#27272A] border-[#E4E4E7] rounded-lg p-4 md:p-5 bg-[#FFF] dark:bg-[#09090B]">
          <DropdownMenuLabel className="text-[22px] md:text-[24px] font-semibold">Genres</DropdownMenuLabel>
          <p className="px-2 text-sm text-[#71717a]">
            See lists of movies by genre
          </p>
          <DropdownMenuSeparator />
          {loading ? (
            <p className="px-2 py-2 text-sm text-[#71717a]">Loading genres...</p>
          ) : (
            <div className="flex flex-wrap gap-2 py-2 px-1">
              {genreData.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() =>
                    router.push(
                      `/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`
                    )
                  }
                  className="text-left cursor-pointer"
                >
                  <Badge genreName={genre.name} />
                </button>
              ))}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
