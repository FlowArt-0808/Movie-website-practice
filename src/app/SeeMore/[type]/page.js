"use client";

import { useEffect } from "react";
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

const SeeMore = (props) => {
  const limit = 10;

  const { movieData, parameter } = useSeeMoreContext();

  return (
    <div className="relative flex flex-col">
      <Header />
      <div className="w-[1440px] flex flex-col pl-20 pr-20 mb-[52px]">
        <div
          aria-label="subtitle for Popular"
          className="mb-9 flex items-center justify-between"
        >
          <p className="text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA] capitalize">
            {parameter.type}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-x-8 gap-y-7 ">
          {movieData.slice(0, limit).map((movie, index) => {
            return (
              <MovieCard
                key={index}
                movieName={movie.title}
                score={movie.vote_average.toFixed(1)}
                imageURL={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            );
          })}
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {/* <PaginationPrevious href="#" onClick={() =>setPage((p) => Math.max(p - 1, 1))} /> */}
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            {/* <PaginationNext href="#" onClick={setPage((p) =>Math.max (p+1))} /> */}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Footer />
    </div>
  );
};

export default SeeMore;
