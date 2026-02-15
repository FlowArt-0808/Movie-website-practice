"use client";

import { MovieCard } from "@/app/_components/MovieCard";
import SeeMoreRightArrow from "@/app/_components/_icons/SeeMoreRightArrow";
import * as React from "react";
import { useEffect } from "react";
import { useHomePageContext } from "@/app/_provider/homeProvider";
import Skeleton from "react-loading-skeleton";
import { getPosterUrl } from "@/lib/tmdb";
export const MovieList = (props) => {
  const { title, type } = props;

  const { movieData, getData, handleSeeMoreButton, loadingByType } =
    useHomePageContext();

  const limit = 10;
  useEffect(() => {
    getData(type);
  }, [type]);

  const specificMovieDataType = movieData[type] || [];
  const isLoading = loadingByType[type];
  return (
    <div className="w-full flex flex-col px-4 md:px-8 lg:px-20 mb-10 md:mb-[52px]">
      <div className="max-w-[1240px] mx-auto w-full">
      <div className="mb-6 md:mb-[36px] flex items-center justify-between">
        <p className="text-[22px] md:text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA] capitalize">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-x-8 md:gap-y-7 justify-items-center">
        {isLoading ? (
          Array.from({ length: limit }).map((_, index) => (
            <Skeleton key={index} className="w-[170px] md:w-[230px] h-[360px] md:h-[439px]" />
          ))
        ) : (
          specificMovieDataType.slice(0, limit).map((movie, index) => {
            return (
              <MovieCard
                key={index}
                movieId={movie.id}
                movieName={movie.title}
                score={movie.vote_average?.toFixed(1)}
                imageURL={getPosterUrl(movie.poster_path)}
              />
            );
          })
        )}
      </div>
      </div>
    </div>
  );
};
