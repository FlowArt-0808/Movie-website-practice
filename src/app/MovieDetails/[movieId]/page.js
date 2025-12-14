"use client";

import Header from "@/app/_features/Header";
import { MovieCard } from "@/app/_components/MovieCard";
import Footer from "@/app/_features/Footer";
import SeeMoreRightArrow from "@/app/_components/_icons/SeeMoreRightArrow";
import { useMovieDetailsContext } from "@/app/_provider/movieDetailsProvider";
import MovieDetailsGoldenStar from "@/app/_components/_icons/MovieDetailsGoldenStar";

const MovieDetails = () => {
  const movieDetailsLimit = 5;

  const {
    getMovieIdData,
    getCreditsData,
    numberFormatter,
    creditsData,
    movieIdData,
    durationHour,
    durationMinutes,
    handleSeeMoreButton,
    movieData,
  } = useMovieDetailsContext();

  return (
    <div>
      <Header />
      <div
        aria-label="Every-content"
        className="flex flex-col gap-8 pl-20 pr-20 w-full"
      >
        <div aria-label="Movie name and poster" className="flex flex-col gap-6">
          {" "}
          <div
            aria-label="Info about the movie"
            className="flex justify-between"
          >
            <div
              aria-label="Movie name, release date, duration"
              className="flex flex-col"
            >
              <p className="text-[36px] text-[#09090B] font-bold dark:text-[#FAFAFA]">
                {" "}
                {movieIdData.original_title}
              </p>
              <div aria-label="" className="flex">
                <p className="text-[18px] text-[#09090B] font-normal dark:text-[#FAFAFA]">
                  {movieIdData.release_date} ·‎{" "}
                </p>
                <span className="text-[18px] text-[#09090B] dark:text-[#FAFAFA]">
                  ‎ {durationHour}h <span>{durationMinutes}m</span>
                </span>
              </div>
            </div>
            <div aria-label="Rating, votecount">
              <MovieDetailsGoldenStar className="text-[#FDE047] dark:text-[#FAFAFA]" />
              <p className="text-[18px] font-bold text-[#09090B] dark:text-[#FAFAFA]">
                {movieIdData.vote_average}
                <span className="text-[16px] text-[#71717a]">/10</span>{" "}
              </p>
              <p className="text-[12px] text-[#A1A1AA]">
                {numberFormatter()} votes
              </p>
            </div>
          </div>
          <div aria-label="Movie poster and trailer" className="flex gap-8">
            <div
              aria-label="Movie poster"
              className="w-[290px] h-107 border border-amber-200"
            >
              {" "}
            </div>
            <div
              aria-label="Movie trailer"
              className="h-107 w-190 border border-amber-200"
            ></div>
          </div>
        </div>
        <div
          aria-label="Genres, cast information"
          className="flex flex-col gap-5"
        >
          {" "}
          <div aria-label="Badges about the movie"></div>
          <p
            aria-label="Movie Description"
            className="text-[16px] text-[#09090B] dark:text-[#FAFAFA]"
          >
            {movieIdData.overview}
          </p>
          <div aria-label="Movie-cast">
            {/* <div id="Director">{director}</div>
          <div id="Writers">{writers}</div>
          <div id="Stars">{stars}</div> */}
          </div>
        </div>

        <div aria-label="Movie Card Section" className="flex flex-col">
          <div
            aria-label="More Like This and See More"
            className="mb-9 flex items-center justify-between"
          >
            <p className="text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA] capitalize">
              More Like This
            </p>

            <button
              className="flex gap-2 items-center cursor-pointer"
              // onClick={() => handleSeeMoreButton}
            >
              <p className="text-[#09090B] text-[14px] font-medium dark:text-[#FAFAFA] hover:underline underline-offset-3">
                {" "}
                See More
              </p>
              <SeeMoreRightArrow className="stroke-[#09090b] fill-[#09090b] dark:stroke-[#FAFAFA] dark:fill-[#FAFAFA]" />
            </button>
          </div>
          {/* <div className="grid grid-cols-5 ">
            {movieData.slice(0, movieDetailsLimit).map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  movieName={movie.title}
                  score={movie.vote_average.toFixed(1)}
                  imageURL={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              );
            })}
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetails;
