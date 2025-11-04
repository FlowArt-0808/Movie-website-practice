"use client";

import { MovieCard } from "@/app/_components/MovieCard";
import SeeMoreRightArrow from "@/app/_components/_icons/SeeMoreRightArrow";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RightArrow from "@/app/_components/_icons/RightArrow";
import Skeleton from "react-loading-skeleton";
const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const MovieList = (props) => {
  const { type, movieId } = props;

  const router = useRouter();

  const [movieData, setMovieData] = useState([]);

  const [loading, setLoading] = useState(true);

  const limit = 10;

  // Copied from video, requires further examining and learning it

  const getData = async () => {
    const movieEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page1`;
    // const movieIdEndPoint = `${BASE_URL}/movie/${movieId}?language=en-US`;

    const response = await fetch(movieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    // const response2 = await fetch(movieIdEndPoint, {
    //   headers: {
    //     Authorization: `Bearer ${ACCESS_TOKEN}`,
    //     "Content-Type": "application/json",
    //   },
    // });

    const data = await response.json();
    const IdData = await response2.json();

    console.log("MovieList Data", data);
    // console.log(`Movie ID`, data)

    setMovieData(data.results);

    setLoading(false);
  };

  useEffect(() => {
    console.log(`page running once`);
    getData();
  }, []);

  //
  const seeMoreButton = () => {
    router.push(`/SeeMore/${type}`);
  };

  return (
    <div className="w-[1440px] flex flex-col pl-[80px] pr-[80px] mb-[52px]">
      <div
        id="subtitle for Popular"
        className="mb-[36px] flex items-center justify-between"
      >
        <div className="text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA] capitalize">
          {type}
        </div>

        <button
          className="flex gap-2 items-center cursor-pointer"
          onClick={seeMoreButton}
        >
          <div className="text-[#09090B] text-[14px] font-[500] dark:text-[#FAFAFA] hover:underline underline-offset-3">
            {" "}
            See More
          </div>
          <SeeMoreRightArrow className="stroke-[#09090b] fill-[#09090b] dark:stroke-[#FAFAFA] dark:fill-[#FAFAFA]" />
        </button>
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
  );
};
