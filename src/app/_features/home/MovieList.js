"use client";

import { MovieCard } from "@/app/_components/MovieCard";
import SeeMoreRightArrow from "@/app/_components/_icons/SeeMoreRightArrow";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RightArrow from "@/app/_components/_icons/RightArrow";
import Skeleton from "react-loading-skeleton";
const BASE_URL = "https://api.themoviedb.org/3";
import SkeletonCard from "@/app/_components/SkeletonCard";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const MovieList = (props) => {
  const { type, title } = props;

  const router = useRouter();

  const [movieData, setMovieData] = useState([]);

  const [loading, setLoading] = useState(true);

  const limit = 10;

  const getData = async () => {
    const movieEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page1`;

    const response = await fetch(movieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("MovieList Data", data);

    setMovieData(data.results);

    setLoading(false);
  };

  useEffect(() => {
    console.log(`page running once`);
    getData();
  }, []);

  const handleSeeMoreButton = () => {
    router.push(`/SeeMore/${type}`);
  };

  return (
    <div className="w-[1440px] flex flex-col pl-[80px] pr-[80px] mb-[52px]">
      <div
        id="subtitle for Popular"
        className="mb-[36px] flex items-center justify-between"
      >
        <div className="text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA] capitalize">
          {title}
        </div>

        <button
          className="flex gap-2 items-center cursor-pointer"
          onClick={handleSeeMoreButton}
        >
          <div className="text-[#09090B] text-[14px] font-[500] dark:text-[#FAFAFA] hover:underline underline-offset-3">
            {" "}
            See More
          </div>
          <SeeMoreRightArrow className="stroke-[#09090b] fill-[#09090b] dark:stroke-[#FAFAFA] dark:fill-[#FAFAFA]" />
        </button>
      </div>

      <SkeletonCard />

      <div className="grid grid-cols-5 gap-x-8 gap-y-7 ">
        {movieData.slice(0, limit).map((movie, index) => {
          return (
            <MovieCard
              key={index}
              movieId={movie.id}
              movieName={movie.title}
              score={movie.vote_average.toFixed(1)}
              imageURL={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          );
        })}
      </div>
    </div>
  );
};
