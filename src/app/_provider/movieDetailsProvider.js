"use client";

import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const MovieDetailsContext = createContext(null);

export const useMovieDetailsContext = () => {
  const context = useContext(MovieDetailsContext);

  if (!context) {
    throw new Error(
      "useMovieDetailsContext must be used inside <MovieDetailsProvider> "
    );
  }

  return context;
};

export const MovieDetailsProvider = ({ children }) => {
  const BASE_URL = "https://api.themoviedb.org/3";

  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

  const parameterId = useParams();
  const [movieIdData, setMovieIdData] = useState([]);
  const [creditsData, setCreditsData] = useState({});

  const durationHour = Math.floor(movieIdData.runtime / 60);
  const durationMinutes = movieIdData.runtime % 60;

  const numberFormatter = () => {
    if (movieIdData.vote_count < 1000) {
      return movieIdData.vote_count;
    } else if (movieIdData.vote_count < 1000000) {
      return Math.floor(movieIdData.vote_count / 1000) + "k";
    } else if (movieIdData.vote_count >= 1000000) {
      return Math.floor(movieIdData.vote_count / 1000000) + "M";
    }
  };

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

    setMovieIdData(movieIdData);
  };
  const getCreditsData = async () => {
    const creditsEndPoint = `${BASE_URL}/movie/${parameterId.movieId}/credits?language=en-US`;

    const responseCreditsData = await fetch(creditsEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const creditsData = await responseCreditsData.json();
    setCreditsData(creditsData);
    console.log(
      "Credits DataCredits DataCredits DataCredits Data",
      creditsData
    );
  };

  useEffect(() => {
    console.log(`page running once`);
    getMovieIdData(), getCreditsData();
  }, []);

  return (
    <MovieDetailsContext.Provider
      value={{
        getMovieIdData,
        getCreditsData,
        numberFormatter,
        // movieData,
        movieIdData,
        creditsData,
        durationHour,
        durationMinutes,
      }}
    >
      {children}
    </MovieDetailsContext.Provider>
  );
};
