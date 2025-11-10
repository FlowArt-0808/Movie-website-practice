"use client";

import Header from "@/app/_features/Header";
import { MovieCard } from "@/app/_components/MovieCard";
import Footer from "@/app/_features/Footer";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SeeMoreRightArrow from "@/app/_components/_icons/SeeMoreRightArrow";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const MovieDetails = ({
  original_title,
  vote_average,
  overview,
  poster_path,
}) => {
  const router = useRouter();
  const movieDetailsLimit = 5;
  const parameterId = useParams(); // Learn how Param allows you to send return data from different pages

  const [movieData, setMovieData] = useState([]);
  const [movieIdData, setMovieIdData] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageURL = `https://image.tmdb.org/t/p/${poster_path}`;

  const getMovieIdData = async () => {
    const movieIdEndPoint = `${BASE_URL}/movie/${parameterId.movieId}?language=en-US`;

    const responseMovieId = await fetch(movieIdEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const movieIdData = await responseMovieId.json();
    console.log("MovieID DATA", movieIdData);

    setMovieIdData(movieIdData); // Learn why removing ".results" makes it unavailble to use the datas from API
  };

  // const getData = async () => {
  //   const movieEndpoint = `${BASE_URL}/movie/${}?language=en-US&page=1`;

  //   const response = await fetch(movieEndpoint, {
  //     headers: {
  //       Authorization: `Bearer ${ACCESS_TOKEN}`,
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await response.json();
  //   setMovieData(data.results);
  //   setLoading(false);
  // };

  const getCreditsData = async () => {
    const creditsEndPoint = `${BASE_URL}/movie/${parameterId.movieId}/credits?language=en-US`;

    const responseCreditsData = await fetch(creditsEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const creditsData = await responseCreditsData.json();
    setCreditsData(creditsData.results);

    console.log(creditsData, "Credits Data");
  };

  useEffect(() => {
    console.log(`page running once`);
    getCreditsData(), getMovieIdData();
  }, []);

  const handleSeeMoreButton = () => {
    router.push(`/SeeMore/${type}`);
  };

  return (
    <div>
      <Header />
      <div id="Every-content" className="flex flex- col pl-[80px] pr-[80px]">
        <div id="Info about the movie">
          <div id="Movie Name">{movieIdData.original_title}</div>{" "}
          <div id="Rating">{movieIdData.vote_average}</div>
        </div>
        <div id="Movie poster and trailer">
          <div id="Movie Poster">
            {" "}
            <img
              src={`https://image.tmdb.org/t/p/w500${movieIdData.poster_path}`}
              alt="1234"
            />{" "}
          </div>
          <div id="Movie Trailer"></div>
        </div>
        <div id="Badges about the movie"></div>
        <div id="Movie-cast">
          <div>{movieIdData.overview}</div>
          <div>
            <div id="Director">{}</div>
            <div id="Writers"></div>
            <div id="Stars"></div>
          </div>
        </div>
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
            {(movieData ?? [])
              .slice(0, movieDetailsLimit)
              .map((movie, index) => {
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
