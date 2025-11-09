"use client";

import Header from "@/app/_features/Header";
import { MovieCard } from "@/app/_components/MovieCard";
import Footer from "@/app/_features/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SeeMoreRightArrow from "@/app/_components/_icons/SeeMoreRightArrow";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const MovieDetails = (props) => {
  const router = useRouter();
  const movieDetailsLimit = 5;
  const { type, movieId } = props;
  const [movieData, setMovieData] = useState([]);
  const [movieIdData, setMovieIdData] = useState([]);
  const [creditsData, setCreditsData] = useState({})

  const [loading, setLoading] = useState(true);
  const getMovieIdData = async () => {
    const movieIdEndPoint = `${BASE_URL}/movie/${movieId}?language=en-US`;

    const responseMovieId = await fetch(movieIdEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const movieIdData = await responseMovieId.json();
    console.log("MovieID DATA", movieIdData);

    setMovieIdData(movieIdData.results);
  };

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
  const getCreditsData = async () => {
    const creditsEndPoint = `${BASE_URL}/movie/${id}/credits?language=en-US`;

    const responseCreditsData = await fetch (creditsEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json"
      }
    })
const creditsData = await response.json ()
setCreditsData(creditsData.results)

  };

  useEffect(() => {
    console.log(`page running once`);
    getMovieIdData(), getData();
  }, []);

  const handleSeeMoreButton = () => {
    router.push(`/SeeMore/${type}`);
  };

  return (
    <div>
      <Header />
      <div id="Every-content" className="flex flex- col pl-[80px] pr-[80px]">
        <div id="Info about the movie"></div>
        <div id="Movie poster and trailer"></div>
        <div id="Badges about the movie"></div>
        <div id="Movie-cast"></div>
        <div id="Movie Card Section" className="flex flex-col">
          <div
            id="More Like This and See More"
            className="mb-[36px] flex items-center justify-between"
          >
            <div className="text-[24px] text-[#09090B] font-semibold dark:text-[#FAFAFA] capitalize">
              More Like This
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
          <div className="grid grid-cols-5 ">
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetails;
