import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import NowPlayingGoldenStar from "@/app/_components/_icons/NowPlayingGoldenStar";

import PlayButton from "@/app/_components/_icons/PlayButton";
import { useEffect, useState } from "react";
import { useHomePageContext } from "@/app/_provider/homeProvider";
import { The_Girl_Next_Door } from "next/font/google";
import { useTheme } from "next-themes";

export const HeroSection = () => {
  const { theme } = useTheme();
  const { getNowPlayingData, movieNowPlayingData, loading } =
    useHomePageContext();
  useEffect(() => {
    console.log(`Hero Section Data`);
    getNowPlayingData();
  }, []);

  return (
    <div className="mb-[52px]">
      {loading ? (
        <div
          className={`w-full h-150 ${
            theme === "dark" ? "bg-[#27272a]" : "bg-[#f4f4f5]"
          }`}
        ></div>
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {movieNowPlayingData.slice(0, 3).map((movie, index) => (
              <CarouselItem key={movie.id || index}>
                <Card
                  className="flex aspect-square flex-col w-full h-[600px] bg-center bg-cover rounded-none"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  }}
                >
                  <div
                    aria-label="Every content"
                    className="w-101 h-full flex flex-col gap-[16px]  items-start pl-35 pb-[158px] pt-[178px]"
                  >
                    <p className="text-[16px] font-[400] text-[#FFFFFF]">
                      Now Playing
                    </p>
                    <p className="text-[36px] font-[700] text-[#FFFFFF]">
                      {movie.original_title}
                    </p>
                    <div className="flex items-center gap-[4px]">
                      <NowPlayingGoldenStar />
                      <div className="flex items-center">
                        <p className="font-[600] text-[18px] text-[#FFFFFF]">
                          {movie.vote_average.toFixed(1)}
                        </p>
                        <p className="text-[#71717A] font-[400] text-[16px]">
                          /10
                        </p>
                      </div>
                    </div>
                    <p
                      aria-label="Movie Description"
                      className="text-[#FFFFFF] font-[300]"
                    >
                      {movie.overview}
                    </p>
                    <button className="flex items-center rounded-md pt-2 pb-2 pr-2 pl-4 bg-[#F4F4F5] gap-[8px] hover:opacity-70 duration-100">
                      <PlayButton />
                      <p className="font-[500] text-[14px] text-[#18181B]">
                        Watch Trailer
                      </p>
                    </button>
                  </div>
                  <button className="grid grid-rows-3 "></button>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};
