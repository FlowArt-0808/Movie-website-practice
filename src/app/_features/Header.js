"use client";

import BlueMovieIcon from "../_components/_icons/BlueMovieIcon";
import DarkMode from "../_components/_icons/DarkMode";
import DownArrow from "../_components/_icons/DownArrow";
import Search from "../_components/_icons/Search";
import { useTheme } from "next-themes";

import LightMode from "@/app/_components/_icons/LightMode";
import "react-loading-skeleton/dist/skeleton.css";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { Genres } from "../_components/Genres";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [genre, setGenre] = useState([]);

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
    setGenre(genreData.results);
  };

  useEffect(() => {
    console.log(`skibidi`);
    getGenreData();
  }, []);

  return (
    <div id="Navigation" className="pl-4 pr-4 w-[1440px] mb-[24px]">
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
          <Genres />

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
export default Header;
