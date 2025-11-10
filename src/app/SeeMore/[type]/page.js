"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const SeeMore = (props) => {
  const parameter = useParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const limit = 10;

  const getData = async () => {
    const movieEndpoint = `${BASE_URL}/movie/${parameter.type}?language=en-US&page=${page}`;

    const response = await fetch(movieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setMovieData(data.results);

    setLoading(false);
  };

  const handlePageIncrease = () => {
    setPage(+2);
  };

  const handlePageDecrease = () => {
    setPage(-2);
  };

  useEffect(() => {
    console.log(`page running once`);
    getData();
  }, []);

  return (
    <div className="relative flex flex-col">
      <Header />
      <div className="w-[1440px] flex flex-col pl-[80px] pr-[80px] mb-[52px]">
        <div
          id="subtitle for Popular"
          className="mb-[36px] flex items-center justify-between"
        >
          <div className="text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA] capitalize">
            {parameter.type}
          </div>
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
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={handlePageIncrease} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Footer />
    </div>
  );
};

export default SeeMore;
