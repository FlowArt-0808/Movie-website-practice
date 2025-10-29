"use client";

import BlueMovieIcon from "../_components/_icons/BlueMovieIcon";
import DarkLightMode from "../_components/_icons/DarkLightMode";
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

const BASE_URL = "https://api.themoviedb.org/3";

export default function Header() {
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
          <div className="flex items-center gap-[8px] pl-4 pt-2 pr-4 pb-2 justify-center border-1 border-[#E4E4E7]  dark:border-[#27272A] rounded-md bg-">
            <DownArrow className="" />
            <GenreMenu>
              <DropdownMenuTrigger>Genre</DropdownMenuTrigger>
              <DropdownMenuContent className="h-[293px] w-[537px] flex flex-col border-1 dark:border-[#27272A] border-[#E4E4E7] rounded-lg p-[20px] bg-[#FFF] dark:bg-[#09090B]">
                <DropdownMenuLabel>Genres</DropdownMenuLabel>
                <DropdownMenuItem>See list of movies by genre</DropdownMenuItem>
                <DropdownMenuSeparator />
                <GenreCategories>
                  <GenreCategory className="grid grod">
                    Action <RightArrow className="stroke-[#FAFAFA]" />
                  </GenreCategory>
                </GenreCategories>
              </DropdownMenuContent>
            </GenreMenu>
          </div>
          <div className="flex gap-[12.13px] border-1 border-[#E4E4E7] dark:border-[#27272A] items-center rounded-lg pr-3 pl-3">
            <Search />
            <input type="search" placeholder="Search.."></input>
          </div>
        </div>
        <button
          id="Swith Mode"
          className="pt-2 pr-4 pb-2 pl-4 border-1 rounded-md "
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <DarkLightMode className="stroke-[#18181B] dark:stroke-[#FAFAFA] cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
