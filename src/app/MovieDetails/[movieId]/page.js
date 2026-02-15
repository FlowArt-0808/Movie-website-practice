"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/_features/Header";
import { MovieCard } from "@/app/_components/MovieCard";
import Footer from "@/app/_features/Footer";
import SeeMoreRightArrow from "@/app/_components/_icons/SeeMoreRightArrow";
import { useMovieDetailsContext } from "@/app/_provider/movieDetailsProvider";
import MovieDetailsGoldenStar from "@/app/_components/_icons/MovieDetailsGoldenStar";
import PlayButton from "@/app/_components/_icons/PlayButton";
import Badge from "@/app/_components/Badge";
import Skeleton from "react-loading-skeleton";
import { getBackdropUrl, getPosterUrl } from "@/lib/tmdb";
import TrailerModal from "@/app/_components/TrailerModal";
import SkeletonCard from "@/app/_components/SkeletonCard";

const MovieDetails = () => {
  const movieDetailsLimit = 5;
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const router = useRouter();

  const {
    loading,
    numberFormatter,
    creditsData,
    movieIdData,
    recommendationData,
    trailerKey,
    durationHour,
    durationMinutes,
    handleSeeMoreButton,
  } = useMovieDetailsContext();

  const directors =
    creditsData.crew?.filter((member) => member.job === "Director") || [];
  const writers =
    creditsData.crew?.filter(
      (member) =>
        member.job === "Writer" ||
        member.job === "Screenplay" ||
        member.job === "Story"
    ) || [];
  const stars = creditsData.cast?.slice(0, 4) || [];

  useEffect(() => {
    setIsTrailerOpen(false);
  }, [movieIdData.id]);

  return (
    <div>
      <Header />
      <div
        aria-label="Every-content"
        className="flex flex-col gap-6 md:gap-8 px-4 md:px-8 lg:px-20 w-full pb-10 max-w-[1240px] mx-auto"
      >
        {loading ? (
          <>
            <div className="space-y-3">
              <Skeleton width={320} height={40} />
              <Skeleton width={420} height={24} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] gap-6">
              <Skeleton className="w-full h-[420px] lg:h-[520px]" />
              <Skeleton className="w-full h-[280px] sm:h-[420px] lg:h-[520px]" />
            </div>
            <Skeleton className="w-full h-[180px]" />
          </>
        ) : (
          <>
            <div aria-label="Info about the movie" className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4">
              <div className="space-y-1">
                <p className="text-[30px] md:text-[36px] leading-tight text-[#09090B] font-bold dark:text-[#FAFAFA]">
                  {movieIdData.original_title}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[14px] md:text-[16px] text-[#71717A]">
                  <span>{movieIdData.release_date}</span>
                  <span>·</span>
                  <span>PG</span>
                  <span>·</span>
                  <span>
                    {durationHour}h {durationMinutes}m
                  </span>
                </div>
              </div>

              <div className="text-left md:text-right">
                <p className="text-[12px] font-semibold text-[#71717A] mb-1">Rating</p>
                <div className="inline-flex items-center gap-1">
                  <MovieDetailsGoldenStar className="text-[#FDE047] dark:text-[#FAFAFA]" />
                  <p className="text-[18px] font-bold text-[#09090B] dark:text-[#FAFAFA]">
                    {movieIdData.vote_average?.toFixed(1)}
                    <span className="text-[16px] text-[#71717a]">/10</span>
                  </p>
                </div>
                <p className="text-[12px] text-[#A1A1AA]">{numberFormatter()}</p>
              </div>
            </div>

            <div
              aria-label="Movie poster and trailer"
              className="grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] gap-5 md:gap-8 items-start"
            >
              <div className="w-[180px] h-[270px] md:w-[230px] md:h-[345px] lg:w-[290px] lg:h-[430px] rounded-none overflow-hidden bg-[#E4E4E7] dark:bg-[#27272A] border border-[#E4E4E7] dark:border-[#27272A] mx-auto lg:mx-0">
                <img
                  src={getPosterUrl(movieIdData.poster_path)}
                  alt={movieIdData.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                aria-label="Main trailer stage"
                className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[430px] rounded-none overflow-hidden bg-center bg-cover border border-[#E4E4E7] dark:border-[#27272A]"
                style={{
                  backgroundImage: `url(${getBackdropUrl(movieIdData.backdrop_path)})`,
                }}
              >
                <div className="w-full h-full bg-black/25 flex items-end justify-start p-4">
                  {trailerKey ? (
                    <button
                      onClick={() => setIsTrailerOpen(true)}
                      className="cursor-pointer flex items-center gap-2 rounded-full bg-white/90 hover:bg-white px-3 py-2 text-[#18181B]"
                    >
                      <PlayButton />
                      <span className="text-sm font-medium">Play trailer</span>
                      <span className="text-sm text-[#71717A]">2:35</span>
                    </button>
                  ) : (
                    <div className="text-white">Trailer unavailable</div>
                  )}
                </div>
              </div>
            </div>

            <div aria-label="Genres, cast information" className="flex flex-col gap-5">
              <div aria-label="Badges about the movie" className="flex flex-wrap gap-2">
                {(movieIdData.genres || []).map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() =>
                      router.push(
                        `/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`
                      )
                    }
                    className="cursor-pointer"
                  >
                    <Badge genreName={genre.name} />
                  </button>
                ))}
              </div>
              <p
                aria-label="Movie Description"
                className="text-[14px] md:text-[16px] leading-6 md:leading-7 text-[#09090B] dark:text-[#FAFAFA]"
              >
                {movieIdData.overview}
              </p>
              <div
                aria-label="Movie-cast"
                className="text-sm md:text-base border-y border-[#E4E4E7] dark:border-[#27272A]"
              >
                <p className="text-[#09090B] dark:text-[#FAFAFA] py-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
                  <span className="font-semibold">Director:</span>{" "}
                  {directors.map((member) => member.name).join(", ") || "N/A"}
                </p>
                <p className="text-[#09090B] dark:text-[#FAFAFA] py-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
                  <span className="font-semibold">Writers:</span>{" "}
                  {[...new Set(writers.map((member) => member.name))].join(", ") ||
                    "N/A"}
                </p>
                <p className="text-[#09090B] dark:text-[#FAFAFA] py-3">
                  <span className="font-semibold">Stars:</span>{" "}
                  {stars.map((member) => member.name).join(", ") || "N/A"}
                </p>
              </div>
            </div>
          </>
        )}

        <div aria-label="Movie Card Section" className="flex flex-col">
          <div
            aria-label="More Like This and See More"
            className="mb-6 md:mb-9 flex items-center justify-between"
          >
            <p className="text-[22px] md:text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA] capitalize">
              More Like This
            </p>

            <button
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => handleSeeMoreButton("popular")}
            >
              <p className="text-[#09090B] text-[14px] font-medium dark:text-[#FAFAFA] hover:underline underline-offset-3">
                See More
              </p>
              <SeeMoreRightArrow className="stroke-[#09090b] fill-[#09090b] dark:stroke-[#FAFAFA] dark:fill-[#FAFAFA]" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-x-8 md:gap-y-7 justify-items-center">
            {loading
              ? Array.from({ length: movieDetailsLimit }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : recommendationData.slice(0, movieDetailsLimit).map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    movieName={movie.title}
                    score={movie.vote_average?.toFixed(1)}
                    imageURL={getPosterUrl(movie.poster_path)}
                  />
                ))}
          </div>
          {!loading && recommendationData.length === 0 && (
            <div className="mt-4 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] p-4 text-sm text-[#71717A]">
              No related movies available for this title yet.
            </div>
          )}
        </div>
      </div>
      <TrailerModal
        isOpen={isTrailerOpen}
        trailerKey={trailerKey}
        title={`${movieIdData.original_title || movieIdData.title || "Movie"}: Trailer`}
        movieId={movieIdData.id}
        onClose={() => setIsTrailerOpen(false)}
      />
      <Footer />
    </div>
  );
};

export default MovieDetails;
