"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/_features/Header";
import Footer from "@/app/_features/Footer";
import { MovieCard } from "@/app/_components/MovieCard";
import Skeleton from "react-loading-skeleton";
import { tmdbFetch, getPosterUrl } from "@/lib/tmdb";

const GenrePage = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamString = searchParams.toString();
  const pathGenreId = Number(params.genreId);

  const idsFromQuery = (searchParams.get("genres") || "")
    .split(",")
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id > 0);

  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState(
    Array.from(new Set([pathGenreId, ...idsFromQuery]))
  );
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const nextIds = Array.from(new Set([pathGenreId, ...idsFromQuery]));
    setSelectedGenreIds(nextIds);
    setPage(1);
  }, [pathGenreId, searchParamString]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await tmdbFetch("/genre/movie/list", { language: "en" });
        setAllGenres(data.genres || []);
      } catch (error) {
        console.error("Error loading genres:", error);
        setAllGenres([]);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    if (!selectedGenreIds.length) return;
    const [primaryId, ...restIds] = selectedGenreIds;
    const nextSearch = new URLSearchParams(searchParamString);
    if (restIds.length) {
      nextSearch.set("genres", restIds.join(","));
    } else {
      nextSearch.delete("genres");
    }
    const nextUrl = `/genre/${primaryId}${
      nextSearch.toString() ? `?${nextSearch.toString()}` : ""
    }`;
    const currentUrl = `${pathname}${
      searchParamString ? `?${searchParamString}` : ""
    }`;
    if (nextUrl === currentUrl) return;
    router.replace(nextUrl);
  }, [selectedGenreIds, router, pathname, searchParamString]);

  useEffect(() => {
    const loadMovies = async () => {
      if (!selectedGenreIds.length) {
        setMovies([]);
        setTotalPages(1);
        setTotalResults(0);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await tmdbFetch("/discover/movie", {
          with_genres: selectedGenreIds.join(","),
          language: "en-US",
          page,
          sort_by: "popularity.desc",
          include_adult: false,
        });
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
        setTotalResults(data.total_results || 0);
      } catch (error) {
        console.error("Error fetching genre movies:", error);
        setMovies([]);
        setTotalPages(1);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [selectedGenreIds, page]);

  const selectedGenreNames = useMemo(() => {
    const genreMap = new Map(allGenres.map((genre) => [genre.id, genre.name]));
    return selectedGenreIds
      .map((genreId) => genreMap.get(genreId))
      .filter(Boolean);
  }, [allGenres, selectedGenreIds]);

  const selectionTitle = selectedGenreNames.join(", ") || "Genre";

  const toggleGenre = (genreId) => {
    setPage(1);
    setSelectedGenreIds((prev) => {
      const active = prev.includes(genreId);
      if (active) {
        const next = prev.filter((id) => id !== genreId);
        return next.length ? next : prev;
      }
      return [...prev, genreId];
    });
  };

  const getPaginationNumbers = () => {
    if (totalPages <= 1) return [];
    const values = [1];
    if (page > 1 && page < totalPages) values.push(page);
    if (totalPages > 1) values.push(2);
    return [...new Set(values)]
      .filter((value) => value <= totalPages)
      .sort((a, b) => a - b);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090B]">
      <Header />
      <main className="flex-1 px-4 md:px-8 lg:px-20 pb-10">
        <div className="max-w-[1240px] mx-auto w-full">
          <h1 className="text-[30px] md:text-[36px] leading-[36px] md:leading-[40px] font-semibold text-[#09090B] dark:text-[#FAFAFA] mb-6 md:mb-8">
            Search filter
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-6 md:gap-7">
            <aside className="lg:pr-7 lg:border-r lg:border-[#E4E4E7] lg:dark:border-[#27272A] pb-5 lg:pb-0 border-b lg:border-b-0 border-[#E4E4E7] dark:border-[#27272A]">
              <h2 className="text-[26px] md:text-[30px] leading-[32px] md:leading-[36px] font-semibold text-[#09090B] dark:text-[#FAFAFA]">
                Genres
              </h2>
              <p className="text-[15px] leading-[22px] text-[#71717A] mt-1 mb-3">
                See lists of movies by genre
              </p>

              <div className="flex flex-wrap gap-2">
                {allGenres.map((genre) => {
                  const isActive = selectedGenreIds.includes(genre.id);
                  return (
                    <button
                      key={genre.id}
                      onClick={() => toggleGenre(genre.id)}
                      className="cursor-pointer"
                    >
                      <span
                        className={`inline-flex items-center gap-1.5 max-w-max border px-[10px] py-[3px] font-medium text-[12px] leading-[16px] rounded-full ${
                          isActive
                            ? "border-[#18181B] dark:border-[#FAFAFA] bg-[#18181B] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#18181B]"
                            : "border-[#D4D4D8] dark:border-[#3F3F46] bg-white dark:bg-[#09090B] text-[#09090B] dark:text-[#FAFAFA] hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]"
                        }`}
                      >
                        {genre.name}
                        {isActive && <span aria-hidden>x</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <section>
              <p className="text-[24px] md:text-[30px] leading-[30px] md:leading-[36px] font-semibold text-[#09090B] dark:text-[#FAFAFA] mb-5">
                {totalResults.toLocaleString()} titles in "{selectionTitle}"
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-x-6 md:gap-y-8">
                {loading
                  ? Array.from({ length: 12 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="w-full h-[320px] sm:h-[372px] md:h-[404px] lg:h-[439px] rounded-lg"
                      />
                    ))
                  : movies.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movieId={movie.id}
                        movieName={movie.title}
                        score={movie.vote_average?.toFixed(1)}
                        imageURL={getPosterUrl(movie.poster_path)}
                      />
                    ))}
              </div>

              {!loading && movies.length === 0 && (
                <div className="mt-8 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] p-6 text-center">
                  <p className="text-[#09090B] dark:text-[#FAFAFA] font-medium">
                    No movies found for selected genres.
                  </p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-8 flex justify-end items-center gap-2">
                  {getPaginationNumbers().map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      disabled={loading || pageNumber === page}
                      className={`h-8 min-w-8 px-2 rounded-md border text-sm cursor-pointer ${
                        pageNumber === page
                          ? "border-[#18181B] dark:border-[#FAFAFA] text-[#18181B] dark:text-[#FAFAFA] font-semibold"
                          : "border-[#D4D4D8] dark:border-[#3F3F46] text-[#71717A] hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]"
                      } disabled:opacity-100`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  {totalPages > 2 && <span className="px-1 text-[#71717A]">...</span>}
                  {totalPages > 2 && (
                    <button
                      onClick={() => setPage(totalPages)}
                      disabled={loading || page === totalPages}
                      className={`h-8 min-w-8 px-2 rounded-md border text-sm cursor-pointer ${
                        page === totalPages
                          ? "border-[#18181B] dark:border-[#FAFAFA] text-[#18181B] dark:text-[#FAFAFA] font-semibold"
                          : "border-[#D4D4D8] dark:border-[#3F3F46] text-[#71717A] hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]"
                      } disabled:opacity-100`}
                    >
                      {totalPages}
                    </button>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GenrePage;
