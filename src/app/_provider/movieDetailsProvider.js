"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { tmdbFetch } from "@/lib/tmdb";

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
  const router = useRouter();
  const parameterId = useParams();
  const [loading, setLoading] = useState(true);
  const [movieIdData, setMovieIdData] = useState({});
  const [creditsData, setCreditsData] = useState({ cast: [], crew: [] });
  const [recommendationData, setRecommendationData] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");

  const runtime = movieIdData.runtime || 0;
  const durationHour = Math.floor(runtime / 60);
  const durationMinutes = runtime % 60;

  const numberFormatter = () => {
    if (!movieIdData.vote_count) {
      return 0;
    }
    if (movieIdData.vote_count < 1000) {
      return movieIdData.vote_count;
    } else if (movieIdData.vote_count < 1000000) {
      return Math.floor(movieIdData.vote_count / 1000) + "k";
    } else if (movieIdData.vote_count >= 1000000) {
      return Math.floor(movieIdData.vote_count / 1000000) + "M";
    }
  };

  const handleSeeMoreButton = (type) => {
    router.push(`/SeeMore/${type}`);
  };

  const getMovieDetailsData = async () => {
    setLoading(true);
    try {
      const movieId = parameterId.movieId;
      const [movieData, credits, recommendations, similar, videos] =
        await Promise.all([
        tmdbFetch(`/movie/${movieId}`, { language: "en-US" }),
        tmdbFetch(`/movie/${movieId}/credits`, { language: "en-US" }),
        tmdbFetch(`/movie/${movieId}/recommendations`, { language: "en-US" }),
        tmdbFetch(`/movie/${movieId}/similar`, { language: "en-US" }),
        tmdbFetch(`/movie/${movieId}/videos`, { language: "en-US" }),
        ]);

      setMovieIdData(movieData || {});
      setCreditsData(credits || { cast: [], crew: [] });
      const recommendationsList = recommendations.results || [];
      const similarList = similar.results || [];

      let combined = [...recommendationsList, ...similarList];
      combined = combined.filter(
        (movie, index, arr) =>
          movie?.id &&
          movie.id !== movieId &&
          arr.findIndex((item) => item.id === movie.id) === index
      );

      if (combined.length < 5) {
        try {
          const popular = await tmdbFetch("/movie/popular", {
            language: "en-US",
            page: 1,
          });
          const popularList = popular.results || [];
          combined = [...combined, ...popularList]
            .filter(
              (movie, index, arr) =>
                movie?.id &&
                movie.id !== movieId &&
                arr.findIndex((item) => item.id === movie.id) === index
            )
            .slice(0, 20);
        } catch (error) {
          console.error("Error fetching popular fallback movies:", error);
        }
      }

      setRecommendationData(combined);

      const trailer =
        videos.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        ) || videos.results?.find((video) => video.site === "YouTube");
      setTrailerKey(trailer?.key || "");
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setMovieIdData({});
      setCreditsData({ cast: [], crew: [] });
      setRecommendationData([]);
      setTrailerKey("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetailsData();
  }, [parameterId.movieId]);

  return (
    <MovieDetailsContext.Provider
      value={{
        loading,
        numberFormatter,
        movieIdData,
        creditsData,
        recommendationData,
        trailerKey,
        durationHour,
        durationMinutes,
        handleSeeMoreButton,
      }}
    >
      {children}
    </MovieDetailsContext.Provider>
  );
};
