"use client";

import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";

const HomePageContext = createContext(null);
export const useHomePageContext = () => {
  const context = useContext(HomePageContext);

  if (!context) {
    throw new Error(
      "useCommonFeatures must be used inside <CommonFeaturesProvider>"
    );
  }

  return context;
};

export const HomePageProvider = ({ children }) => {
  const BASE_URL = "https://api.themoviedb.org/3";

  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState({
    upcoming: [],
    popular: [],
    top_rated: [],
    // AI
  });
  const [movieNowPlayingData, setNowPlayingMovieData] = useState([]);

  const getData = async (type) => {
    setLoading(true);

    const movieEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;

    const response = await fetch(movieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("MovieList Data", data);

    setMovieData((prev) => ({
      ...prev,
      [type]: data.results,
    })); // AI

    setLoading(false);
  };

  const getNowPlayingData = async () => {
    setLoading(true);
    const moviesOnTheatreEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;

    const responseNowPlaying = await fetch(moviesOnTheatreEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const nowPlayingData = await responseNowPlaying.json();

    console.log(`HeroSectionData`, nowPlayingData);

    setNowPlayingMovieData(nowPlayingData.results);

    setLoading(false);
  };

  const handleSeeMoreButton = (type) => {
    router.push(`/SeeMore/${type}`);
  };

  return (
    <HomePageContext.Provider
      value={{
        loading,
        movieData,
        movieNowPlayingData,
        getData,
        handleSeeMoreButton,
        getNowPlayingData,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
// How is it able to send those state withour requiring setState?
