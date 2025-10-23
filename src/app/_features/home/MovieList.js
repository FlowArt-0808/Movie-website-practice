import MovieCard from "@/app/_components/MovieCard";
import RightArrow from "@/app/_components/_icons/RightArrow";
import * as React from "react";

export default function MovieList() {
  return (
    <div className="w-[1440px] flex flex-col pl-[80px] pr-[80px] mb-[52px]">
      <div
        id="subtitle for Popular"
        className="mb-[36px] flex items-center justify-between"
      >
        <div className="text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA]">
          Popular
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-[#09090B] text-[14px] font-[500] dark:text-[#FAFAFA]">
            {" "}
            See More
          </div>
          <RightArrow className="stroke-[#09090b] dark:stroke-[#FAFAFA]" />
        </div>
      </div>
      <div className="flex flex-col gap-[32px] ">
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
