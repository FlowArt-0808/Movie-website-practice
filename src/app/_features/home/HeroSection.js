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
import Skeleton from "react-loading-skeleton";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const HeroSection = ({ movieName, imageURL }) => {
  const [movieData, setMovieData] = useState([]);

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const moviesOnTheatreEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page1`;

    const response = await fetch(moviesOnTheatreEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setMovieData(data.results);

    setLoading(false);
  };

  useEffect(() => {
    console.log(`page running once`);
    getData();
  }, []);

  return (
    <div className="mb-[52px]">
      <Carousel className="w-full ">
        {loading ? (
          <Skeleton className="w-full h-[600px]" />
        ) : (
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index} className="w-full h-[600px]">
                <Card className="flex aspect-square flex-col w-full h-[600px]">
                  <CardContent>
                    <div
                      id="Now Playing Movie Images"
                      className="w-full h-full flex flex-col gap-[16px] justify-center items-start"
                    >
                      <div className="text-[16px] font-[400]">Now Playing</div>
                      <div className="text-[36px] font-[700]">2</div>
                      <div className="flex items-center">
                        <NowPlayingGoldenStar />
                        <div className="flex items-center">
                          <div className="font-[600] text-[18px]">6.9</div>
                          <div className="text-[#71717A] font-[400] text-[16px]">
                            /10
                          </div>
                        </div>
                      </div>
                      <div id="Movie Description"></div>
                      <button className="flex items-center rounded-md pt-2 pb-2 pr-2 pl-4 bg-[#F4F4F5] gap-[8px]">
                        <PlayButton />
                        <div className="font-[500] text-[14px] text-[#18181B]">
                          Watch Trailer
                        </div>
                      </button>
                    </div>
                    <button className="grid grid-rows-3 "></button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        )}

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
