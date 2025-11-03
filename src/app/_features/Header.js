"use client";

import BlueMovieIcon from "../_components/_icons/BlueMovieIcon";
import DarkMode from "../_components/_icons/DarkMode";
import DownArrow from "../_components/_icons/DownArrow";
import Search from "../_components/_icons/Search";
import { useTheme } from "next-themes";
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
import RightArrow from "../_components/_icons/RightArrow";
import Genres from "../_components/Genres";
import LightMode from "@/app/_components/_icons/LightMode";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN = "";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div id="Navigation" className="px-20 w-[1440px] mb-6">
      <div
        id="Navigation Items"
        className=" flex justify-between items-center mt-[11.5px] mb-[11.5px]"
      >
        <div
          id="Text and movie icon"
          className="gap-[9.67px] flex justify-between items-center"
        >
          <BlueMovieIcon />
          <div className="italic text-[#4338CA] text-[16px] font-[700]">
            Movie{" "}
            <span className="italic text-[#4338CA] text-[16px] font-[700]">
              Z
            </span>
          </div>
        </div>
        <div
          id="Search and Dropdown"
          className="flex justify-between items-center gap-[12px]"
        >
          <div className="flex items-center gap-[8px] h-[36px]  justify-center border-1 border-[#E4E4E7]  dark:border-[#27272A] rounded-md pr-4 pl-4 pt-2 pb-2 hover:bg-[#E4E4E7] dark:hover:bg-[#27272A]">
            <DownArrow className="" />
            <GenreMenu>
              <DropdownMenuTrigger>Genre</DropdownMenuTrigger>
              <DropdownMenuContent className="h-[293px] w-[537px] flex flex-col border-1 dark:border-[#27272A] border-[#E4E4E7] rounded-lg p-[20px] bg-[#FFF] dark:bg-[#09090B]">
                <DropdownMenuLabel>Genres</DropdownMenuLabel>
                <DropdownMenuItem>See list of movies by genre</DropdownMenuItem>
                <DropdownMenuSeparator />
                <GenreCategories>
                  <GenreCategory className="grid">
                    Action <RightArrow className="stroke-[#FAFAFA]" />
                  </GenreCategory>
                </GenreCategories>
              </DropdownMenuContent>
            </GenreMenu>
          </div>
          <div className="flex gap-[12.13px] border-1 border-[#E4E4E7] dark:border-[#27272A] items-center rounded-lg pr-3 pl-3 h-[36px] w-[355px]">
            <Search />
            <input type="search" placeholder="Search.."></input>
          </div>
        </div>
        <button
          id="Swith Mode"
          className="flex items-center justify-center h-[36px] w-[36px] border-1 rounded-md cursor-pointer"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" && <DarkMode />}
          {theme === "dark" && <LightMode />}
        </button>
      </div>
    </div>
  );
};
