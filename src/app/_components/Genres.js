import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  GenreCategory,
  GenreCategories,
  GenreMenu,
} from "@/components/ui/dropdown-menu";

import DownArrow from "./_icons/DownArrow";
import Badge from "./Badge";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const Genres = (props) => {
  const type = { props };
  const genreCategoryLimit = 17;

  const [genreDataForBadge, setGenre] = useState([]);

  const getGenreData = async () => {
    const genreEndpont = `${BASE_URL}/genre/movie/list?language=en`;

    const responseGenreData = await fetch(genreEndpont, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const genreData = await responseGenreData.json();
    console.log(`GenreData`, genreData);
    setGenre(genreData.genres);
  };

  useEffect(() => {
    console.log(`skibidi`);
    getGenreData();
  }, []);

  {
    return (
      <div>
        <GenreMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-[8px] h-[36px] justify-center border border-[#E4E4E7] dark:border-[#27272A] rounded-md px-4 py-2 hover:bg-[#E4E4E7] dark:hover:bg-[#27272A] cursor-pointer">
              <DownArrow className="" />
              <span>Genre</span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="h-[293px] w-[537px] flex flex-col border dark:border-[#27272A] border-[#E4E4E7] rounded-lg p-[20px] bg-[#FFF] dark:bg-[#09090B]">
            <DropdownMenuLabel>Genres</DropdownMenuLabel>
            <DropdownMenuItem>See list of movies by genre</DropdownMenuItem>
            <DropdownMenuSeparator />
            <GenreCategories>
              <div className="grid ">
                {genreDataForBadge
                  .slice(0, genreCategoryLimit)
                  .map((genre, index) => {
                    return <Badge key={index} genreName={genre.name} />;
                  })}
              </div>
            </GenreCategories>
          </DropdownMenuContent>
        </GenreMenu>
      </div>
    );
  }
};
