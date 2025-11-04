

const getMovieVideos = async () => {


}


useEffect(() => {
    getMovieVideos()
    
},  [selectedMovieId]

const handleWatchTrailerButton = (id) => {
  setSelectedMovieId(id);
};

setMovieTrailer(data);
setTrailerLoading(false);

<div>
  {selectedMovieId && !trailerLoading && <div>trailer loading</div>}</div>


"use client";
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

export const HeroSection = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const moviesOnTheatreEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;

    try {
      const response = await fetch(moviesOnTheatreEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // ✅ Log to check API data
      console.log("Fetched movie data:", data);

      setMovieData(data.results || []);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mb-[52px]">
      <Carousel className="w-full">
        {loading ? (
          <Skeleton className="w-full h-[600px]" />
        ) : (
          <CarouselContent>
            {movieData.slice(0, 3).map((movie, index) => (
              <CarouselItem key={index} className="w-full h-[600px]">
                <Card className="flex flex-col w-full h-[600px]">
                  <CardContent className="p-0">
                    <div
                      id="Now Playing Movie Images"
                      className="w-full h-full flex flex-col gap-[16px] justify-center items-start bg-cover bg-center text-white p-10"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                      }}
                    >
                      <div className="text-[16px] font-[400]">Now Playing</div>

                      <div className="text-[36px] font-[700] max-w-[600px]">
                        {movie.title}
                      </div>

                      <div className="flex items-center gap-1">
                        <NowPlayingGoldenStar />
                        <div className="flex items-center">
                          <div className="font-[600] text-[18px]">
                            {Math.round(movie.vote_average)}
                          </div>
                          <div className="text-[#D1D1D1] font-[400] text-[16px]">
                            /10
                          </div>
                        </div>
                      </div>

                      <div
                        id="Movie Description"
                        className="max-w-[600px] text-[16px] font-[400] text-[#E4E4E7]"
                      >
                        {movie.overview.length > 200
                          ? movie.overview.slice(0, 200) + "..."
                          : movie.overview}
                      </div>

                      <button className="flex items-center rounded-md pt-2 pb-2 pr-2 pl-4 bg-[#F4F4F5] text-black gap-[8px] hover:opacity-70 duration-100">
                        <PlayButton />
                        <div className="font-[500] text-[14px]">Watch Trailer</div>
                      </button>
                    </div>
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
