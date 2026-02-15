"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { tmdbFetch } from "@/lib/tmdb";

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
  const router = useRouter();
  const [nowPlayingLoading, setNowPlayingLoading] = useState(true);
  const [loadingByType, setLoadingByType] = useState({
    upcoming: true,
    popular: true,
    top_rated: true,
  });
  const [movieData, setMovieData] = useState({
    upcoming: [],
    popular: [],
    top_rated: [],
    // AI
  });
  const [movieNowPlayingData, setNowPlayingMovieData] = useState([]);

  const getData = async (type) => {
    setLoadingByType((prev) => ({
      ...prev,
      [type]: true,
    }));

    try {
      const data = await tmdbFetch(`/movie/${type}`, {
        language: "en-US",
        page: 1,
      });

      setMovieData((prev) => ({
        ...prev,
        [type]: data.results || [],
      }));
    } catch (error) {
      console.error(`Error fetching ${type} movies:`, error);
    } finally {
      setLoadingByType((prev) => ({
        ...prev,
        [type]: false,
      }));
    }
  };

  const getNowPlayingData = async () => {
    setNowPlayingLoading(true);

    try {
      const nowPlayingData = await tmdbFetch("/movie/now_playing", {
        language: "en-US",
        page: 1,
      });

      setNowPlayingMovieData(nowPlayingData.results || []);
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    } finally {
      setNowPlayingLoading(false);
    }
  };

  const handleSeeMoreButton = (type) => {
    router.push(`/SeeMore/${type}`);
  };

  return (
    <HomePageContext.Provider
      value={{
        loadingByType,
        nowPlayingLoading,
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
