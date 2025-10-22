import MovieCard from "@/app/_components/MovieCard";
import RightArrow from "@/app/_components/_icons/RightArrow";
import * as React from "react";

export default function TopRatedMovieList() {
  return (
    <div className="w-[1440px] flex flex-col pl-[80px] pr-[80px]">
      <div
        id="subtitle for TopRatedMovieList"
        className="mb-[36px] flex items-center justify-between"
      >
        <div className="text-[24px] text-[#09090B] font-semibold">
          Top Rated
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-[#09090B] text-[14px] font-[500]"> See More</div>
          <RightArrow />
        </div>
      </div>
      <div className="flex flex-col gap-[32px]">
        <div className="flex gap-[32px] ">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
        <div className="flex gap-[32px]">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </div>
    </div>
  );
}
