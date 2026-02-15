"use client";

import BlueMovieIcon from "../_components/_icons/BlueMovieIcon";
import DarkMode from "../_components/_icons/DarkMode";
import Search from "../_components/_icons/Search";
import { useTheme } from "next-themes";
import LightMode from "@/app/_components/_icons/LightMode";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Genres } from "../_components/Genres";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getPosterUrl, tmdbFetch } from "@/lib/tmdb";

const HeaderContent = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchBoxRef = useRef(null);

  const isSearchPage = useMemo(() => pathname.startsWith("/search"), [pathname]);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    const queryText = query.trim();
    if (queryText.length < 1) {
      setSuggestions([]);
      setSuggestionLoading(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setSuggestionLoading(true);
      try {
        const data = await tmdbFetch("/search/movie", {
          query: queryText,
          language: "en-US",
          page: 1,
          include_adult: false,
        });
        setSuggestions((data.results || []).slice(0, 5));
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
        setSuggestions([]);
      } finally {
        setSuggestionLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToMovieDetails = (movieId) => {
    setShowSuggestions(false);
    router.push(`/MovieDetails/${movieId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextQuery = query.trim();
    setShowSuggestions(false);
    if (!nextQuery) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(nextQuery)}`);
  };

  const handleViewAllResults = () => {
    const nextQuery = query.trim();
    setShowSuggestions(false);
    if (!nextQuery) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(nextQuery)}`);
  };

  return (
    <div aria-label="Navigation" className="px-4 md:px-8 lg:px-20 mb-6">
      <div
        aria-label="Navigation Items"
        className="max-w-[1240px] mx-auto flex flex-wrap md:flex-nowrap justify-between items-center gap-3 py-[11.5px]"
      >
        <div
          aria-label="Text and movie icon"
          className="gap-2 flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <BlueMovieIcon />
          <p className="italic text-[#4338CA] text-[16px] font-[700]">
            Movie{" "}
            <span className="italic text-[#4338CA] text-[16px] font-[700]">
              Z
            </span>
          </p>
        </div>

        <div
          aria-label="Search and Dropdown"
          className="order-3 md:order-2 w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
        >
          <Genres />

          <div ref={searchBoxRef} className="relative w-full md:w-[355px]">
            <form
              onSubmit={handleSubmit}
              className="flex gap-3 border border-[#E4E4E7] dark:border-[#27272A] items-center rounded-lg px-3 h-9 w-full bg-white dark:bg-[#09090B]"
            >
              <Search />
              <input
                type="search"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Search movies..."
                className="w-full bg-transparent outline-none text-[14px]"
              />
              {isSearchPage && (
                <button
                  type="submit"
                  className="cursor-pointer text-xs font-medium text-[#4338CA] whitespace-nowrap"
                >
                  Search
                </button>
              )}
            </form>

            {showSuggestions && query.trim().length > 0 && (
              <div className="absolute z-40 mt-2 left-0 md:-left-24 w-full md:w-[560px] max-w-[calc(100vw-2rem)] rounded-lg border border-[#E4E4E7] dark:border-[#27272A] bg-[#F4F4F5] dark:bg-[#18181B] shadow-lg overflow-hidden">
                {suggestionLoading ? (
                  <div className="px-4 py-4 text-sm text-[#71717A]">Searching...</div>
                ) : suggestions.length > 0 ? (
                  <>
                    <div className="max-h-[560px] overflow-auto">
                      {suggestions.map((movie) => {
                        const score = movie.vote_average?.toFixed(1) || "0.0";
                        const year = movie.release_date?.slice(0, 4) || "N/A";
                        return (
                          <button
                            key={movie.id}
                            onClick={() => goToMovieDetails(movie.id)}
                            className="cursor-pointer w-full px-3 sm:px-6 py-3 sm:py-4 border-b border-[#D4D4D8] dark:border-[#3F3F46] flex items-center justify-between gap-3 sm:gap-4 text-left hover:bg-[#ECECEF] dark:hover:bg-[#27272A]"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              {movie.poster_path ? (
                                <img
                                  src={getPosterUrl(movie.poster_path, "w154")}
                                  alt={movie.title}
                                  className="w-[54px] h-[80px] sm:w-[68px] sm:h-[102px] rounded-md object-cover bg-[#E4E4E7] dark:bg-[#27272A]"
                                />
                              ) : (
                                <div className="w-[54px] h-[80px] sm:w-[68px] sm:h-[102px] rounded-md bg-[#E4E4E7] dark:bg-[#27272A]" />
                              )}
                              <div className="min-w-0">
                                <p className="text-[16px] sm:text-[18px] leading-[1.2] font-semibold text-[#09090B] dark:text-[#FAFAFA] truncate">
                                  {movie.title}
                                </p>
                                <div className="mt-1 text-[13px] sm:text-[14px] text-[#09090B] dark:text-[#FAFAFA] flex items-center gap-1">
                                  <span className="text-[#FDE047]">&#9733;</span>
                                  <span>{score}</span>
                                  <span className="text-[#71717A]">/10</span>
                                </div>
                                <p className="mt-1 text-[13px] sm:text-[14px] text-[#09090B] dark:text-[#FAFAFA]">
                                  {year}
                                </p>
                              </div>
                            </div>
                            <div className="hidden sm:flex shrink-0 text-[14px] text-[#09090B] dark:text-[#FAFAFA] items-center gap-2">
                              <span>See more</span>
                              <span>&rarr;</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={handleViewAllResults}
                      className="cursor-pointer w-full px-6 py-4 text-left text-[14px] font-medium text-[#09090B] dark:text-[#FAFAFA] hover:bg-[#ECECEF] dark:hover:bg-[#27272A]"
                    >
                      See all results for "{query.trim()}"
                    </button>
                  </>
                ) : (
                  <div className="px-6 py-5 text-[14px] text-[#71717A]">No results found.</div>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          aria-label="Swith Mode"
          className="order-2 md:order-3 flex items-center justify-center h-9 w-9 border border-[#E4E4E7] dark:border-[#27272A] rounded-md cursor-pointer"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {mounted ? (
            <>
              {theme === "light" && <DarkMode />}
              {theme === "dark" && <LightMode />}
            </>
          ) : (
            <span className="h-[15px] w-[15px]" />
          )}
        </button>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <Suspense fallback={<div className="px-4 md:px-8 lg:px-20 mb-6 h-[62px]" />}>
      <HeaderContent />
    </Suspense>
  );
};

export default Header;
