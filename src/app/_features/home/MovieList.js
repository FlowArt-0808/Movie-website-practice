"use client";

import { MovieCard } from "@/app/_components/MovieCard";
import SeeMoreRightArrow from "@/app/_components/_icons/SeeMoreRightArrow";
import * as React from "react";
import { useEffect } from "react";
import { useHomePageContext } from "@/app/_provider/homeProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";
export const MovieList = (props) => {
  const { title, type } = props;
  const { theme } = useTheme();

  const { movieData, getData, handleSeeMoreButton, loading } =
    useHomePageContext();

  const limit = 10;
  useEffect(() => {
    console.log(`This is type`, type);
    getData(type);
  }, [type]);

  const specificMovieDataType = movieData[type] || [];
  return (
    <div className="w-full flex flex-col  pl-[80px] pr-[80px] mb-[52px]">
      <div className="mb-[36px] flex items-center justify-between">
        <p className="text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA] capitalize">
          {title || <Skeleton />}
        </p>

        <button
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => handleSeeMoreButton(type)}
        >
          <p className="text-[#09090B] text-[14px] font-[500] dark:text-[#FAFAFA] hover:underline underline-offset-3">
            {" "}
            See More
          </p>
          <SeeMoreRightArrow className="stroke-[#09090b] fill-[#09090b] dark:stroke-[#FAFAFA] dark:fill-[#FAFAFA]" />
        </button>
      </div>

      <div className="grid grid-cols-5 gap-x-8 gap-y-7 ">
        {loading ? (
          <Skeleton
            width={230}
            height={439}
            baseColor={theme === "dark" ? "#27272A" : "#F4F4F5"}
          />
        ) : (
          specificMovieDataType.slice(0, limit).map((movie, index) => {
            return (
              <MovieCard
                key={index}
                movieId={movie.id}
                movieName={movie.title}
                score={movie.vote_average.toFixed(1)}
                imageURL={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
