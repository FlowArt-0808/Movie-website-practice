import MovieCard from "@/app/_components/MovieCard";
import RightArrow from "@/app/_components/_icons/RightArrow";
import * as React from "react";
import { useEffect, useState } from "react";
const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function MovieList() {
  const [movieData, setMovieData] = useState([]);
  const getData = async () => {
    const upcomingMovieEndpoint = `${BASE_URL}/movie/upcoming?language=en-US&page1`;

    const response = await fetch(upcomingMovieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response, "responseresponse");

    const data = await response.json();

    console.log(data, "datadatadata");
    setMovieData(data.results);
  };

  useEffect(() => {
    console.log(`page running once`);
    getData();
  }, []);

  return (
    <div className="w-[1440px] flex flex-col pl-[80px] pr-[80px] mb-[52px]">
      <div
        id="subtitle for Popular"
        className="mb-[36px] flex items-center justify-between"
      >
        <div className="text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA]">
          Popular
        </div>
        <button className="flex gap-2 items-center cursor-pointer">
          <div className="text-[#09090B] text-[14px] font-[500] dark:text-[#FAFAFA]">
            {" "}
            See More
          </div>
          <RightArrow className="stroke-[#09090b] dark:stroke-[#FAFAFA]" />
        </button>
      </div>
      <div className="grid grid-col-5 gap 8 gap-[32px] ">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}
