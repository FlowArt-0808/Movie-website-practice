"use client";

import { MovieCard } from "@/app/_components/MovieCard";
import Footer from "@/app/_features/Footer";
import Header from "@/app/_features/Header";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useSeeMoreContext } from "@/app/_provider/seeMoreProvider";
import { getPosterUrl } from "@/lib/tmdb";
import SkeletonCard from "@/app/_components/SkeletonCard";

const SeeMore = (props) => {
  const limit = 10;

  const { movieData, parameter, loading, page, totalPages, setPage } =
    useSeeMoreContext();
  const title = parameter.type?.replaceAll("_", " ");

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;
  const nextPage = Math.min(page + 1, totalPages);
  const showEllipsis = totalPages > nextPage + 1;
  const showLastPage = totalPages > page;

  return (
    <div className="relative flex flex-col">
      <Header />
      <div className="w-full flex flex-col px-4 md:px-8 lg:px-20 mb-[52px]">
        <div className="max-w-[1240px] mx-auto w-full">
        <div
          aria-label="subtitle for Popular"
          className="mb-6 md:mb-9 flex items-center justify-between"
        >
          <p className="text-[22px] md:text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA] capitalize">
            {title}
          </p>
          <p className="text-sm text-[#71717A]">Page {page}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-x-8 md:gap-y-7 justify-items-center">
          {loading
            ? Array.from({ length: limit }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
              : movieData.slice(0, limit).map((movie, index) => {
                return (
                  <MovieCard
                    key={index}
                    movieId={movie.id}
                    movieName={movie.title}
                    score={movie.vote_average?.toFixed(1)}
                    imageURL={getPosterUrl(movie.poster_path)}
                  />
                );
              })}
        </div>
        </div>
      </div>
      <div className="px-4 md:px-8 lg:px-20 mb-10">
        <Pagination className="max-w-[1240px] mx-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (canGoPrev) setPage((prev) => Math.max(prev - 1, 1));
                }}
                className={!canGoPrev ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>

            {nextPage !== page && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(nextPage);
                  }}
                >
                  {nextPage}
                </PaginationLink>
              </PaginationItem>
            )}

            {showEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {showLastPage && nextPage !== totalPages && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(totalPages);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (canGoNext) setPage((prev) => Math.min(prev + 1, totalPages));
                }}
                className={!canGoNext ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </div>
  );
};

export default SeeMore;
