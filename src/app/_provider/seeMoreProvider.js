"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "next/navigation";
const SeeMoreContext = createContext(null);

export const useSeeMoreContext = () => {
  const context = useContext(SeeMoreContext);

  if (!context) {
    throw new Error("useSeeMoreContext must be used inside <SeeMoreProvider>");
  }

  return context;
};

export const SeeMoreProvider = ({ children }) => {
  const BASE_URL = "https://api.themoviedb.org/3";

  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
  const parameter = useParams();
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
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
  };

  useEffect(() => {
    console.log(`1234`);
    getData();
  }, [page]);

  return (
    <SeeMoreContext.Provider
      value={{
        movieData,
        parameter,
        page,
      }}
    >
      {children}
    </SeeMoreContext.Provider>
  );
};
