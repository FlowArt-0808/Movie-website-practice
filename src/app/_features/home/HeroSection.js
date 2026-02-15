import * as React from "react";
import { Card } from "@/components/ui/card";
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
import Skeleton from "react-loading-skeleton";
import { getBackdropUrl, tmdbFetch } from "@/lib/tmdb";
import TrailerModal from "@/app/_components/TrailerModal";

export const HeroSection = () => {
  const { getNowPlayingData, movieNowPlayingData, nowPlayingLoading } =
    useHomePageContext();
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);

  useEffect(() => {
    getNowPlayingData();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeTrailer();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openTrailer = async (movie) => {
    setTrailerLoading(true);
    try {
      const data = await tmdbFetch(`/movie/${movie.id}/videos`, {
        language: "en-US",
      });
      const trailer =
        data.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        ) || data.results?.find((video) => video.site === "YouTube");

      if (!trailer?.key) {
        setActiveTrailer({
          key: "",
          movieId: movie.id,
          title: `${movie.original_title || movie.title}: Trailer`,
        });
        return;
      }

      setActiveTrailer({
        key: trailer.key,
        movieId: movie.id,
        title: `${movie.original_title || movie.title}: Trailer`,
      });
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setActiveTrailer({
        key: "",
        movieId: movie.id,
        title: `${movie.original_title || movie.title}: Trailer`,
      });
    } finally {
      setTrailerLoading(false);
    }
  };

  const closeTrailer = () => {
    setActiveTrailer(null);
  };

  return (
    <div className="mb-10 md:mb-[52px]">
      {nowPlayingLoading ? (
        <Skeleton className="w-full h-[420px] md:h-[560px] lg:h-[600px]" />
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {movieNowPlayingData.slice(0, 3).map((movie, index) => (
              <CarouselItem key={movie.id || index}>
                <Card
                  className="flex flex-col w-full h-[420px] md:h-[560px] lg:h-[600px] bg-center bg-cover rounded-none overflow-hidden border border-[#E4E4E7]/40 dark:border-[#27272A]"
                  style={{
                    backgroundImage: `url(${getBackdropUrl(
                      movie.backdrop_path
                    )})`,
                  }}
                >
                  <div
                    aria-label="Every content"
                    className="max-w-[560px] h-full flex flex-col gap-3 md:gap-4 items-start px-4 sm:px-6 md:pl-14 lg:pl-24 xl:pl-32 pb-8 md:pb-12 lg:pb-16 pt-8 md:pt-16 lg:pt-28 bg-gradient-to-r from-black/70 to-transparent"
                  >
                    <p className="text-[16px] font-[400] text-[#FFFFFF]">
                      Now Playing
                    </p>
                    <p className="text-[28px] md:text-[34px] lg:text-[36px] leading-tight font-[700] text-[#FFFFFF]">
                      {movie.original_title}
                    </p>
                    <div className="flex items-center gap-[4px]">
                      <NowPlayingGoldenStar />
                      <div className="flex items-center">
                        <p className="font-[600] text-[18px] text-[#FFFFFF]">
                          {movie.vote_average?.toFixed(1) || "0.0"}
                        </p>
                        <p className="text-[#71717A] font-[400] text-[16px]">
                          /10
                        </p>
                      </div>
                    </div>
                    <p
                      aria-label="Movie Description"
                      className="text-[#FFFFFF] text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] font-[400] max-w-[460px]"
                    >
                      {movie.overview || "No description available."}
                    </p>
                    <button
                      onClick={() => openTrailer(movie)}
                      disabled={trailerLoading}
                      className="cursor-pointer flex items-center rounded-md pt-2 pb-2 pr-2 pl-4 bg-[#F4F4F5] gap-[8px] hover:opacity-70 duration-100"
                    >
                      <PlayButton />
                      <p className="font-[500] text-[14px] text-[#18181B]">
                        {trailerLoading ? "Loading..." : "Watch Trailer"}
                      </p>
                    </button>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      )}

      <TrailerModal
        isOpen={Boolean(activeTrailer)}
        trailerKey={activeTrailer?.key}
        title={activeTrailer?.title || "Trailer"}
        movieId={activeTrailer?.movieId}
        onClose={closeTrailer}
      />
    </div>
  );
};
