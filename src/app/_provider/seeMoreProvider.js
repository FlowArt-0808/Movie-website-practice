"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { tmdbFetch } from "@/lib/tmdb";
const SeeMoreContext = createContext(null);

export const useSeeMoreContext = () => {
  const context = useContext(SeeMoreContext);

  if (!context) {
    throw new Error("useSeeMoreContext must be used inside <SeeMoreProvider>");
  }

  return context;
};

export const SeeMoreProvider = ({ children }) => {
  const parameter = useParams();
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async () => {
    setLoading(true);
    try {
      const data = await tmdbFetch(`/movie/${parameter.type}`, {
        language: "en-US",
        page,
      });
      setMovieData(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 500));
    } catch (error) {
      console.error("Error fetching see-more movies:", error);
      setMovieData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page, parameter.type]);

  useEffect(() => {
    setPage(1);
  }, [parameter.type]);

  return (
    <SeeMoreContext.Provider
      value={{
        movieData,
        parameter,
        loading,
        page,
        totalPages,
        setPage,
      }}
    >
      {children}
    </SeeMoreContext.Provider>
  );
};
