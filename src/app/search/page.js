"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/_features/Header";
import Footer from "@/app/_features/Footer";
import { MovieCard } from "@/app/_components/MovieCard";
import SkeletonCard from "@/app/_components/SkeletonCard";
import { tmdbFetch, getPosterUrl } from "@/lib/tmdb";

const SearchPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

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
    const run = async () => {
      if (!query) {
        setMovies([]);
        return;
      }

      setLoading(true);
      try {
        const data = await tmdbFetch("/search/movie", {
          query,
          language: "en-US",
          page: 1,
          include_adult: false,
        });
        setMovies((data.results || []).slice(0, 5));
      } catch (error) {
        console.error("Error searching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [query]);

  const goGenre = (genre) => {
    router.push(`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090B]">
      <Header />
      <main className="flex-1 px-4 md:px-8 lg:px-20 pb-12">
        <div className="max-w-[1240px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
            <section>
              <h1 className="text-[30px] md:text-[36px] leading-[36px] md:leading-[42px] font-semibold text-[#09090B] dark:text-[#FAFAFA] capitalize mb-3 md:mb-4">
                Search results
              </h1>

              <p className="text-[20px] md:text-[22px] leading-[28px] md:leading-[30px] font-semibold text-[#09090B] dark:text-[#FAFAFA] mb-5 md:mb-6">
                {movies.length} results for "{query || ""}"
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <SkeletonCard key={index} />
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
            </section>

            <aside className="lg:border-l lg:border-[#E4E4E7] lg:dark:border-[#27272A] lg:pl-8">
              <h2 className="text-[30px] leading-[36px] font-semibold text-[#09090B] dark:text-[#FAFAFA]">
                Search by genre
              </h2>
              <p className="text-[15px] leading-[22px] text-[#71717A] mt-1 mb-4">
                See lists of movies by genre
              </p>

              <div className="flex flex-wrap gap-2">
                {allGenres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => goGenre(genre)}
                    className="cursor-pointer px-3 py-1 rounded-full border border-[#D4D4D8] dark:border-[#3F3F46] bg-white dark:bg-[#09090B] text-[12px] leading-[16px] text-[#09090B] dark:text-[#FAFAFA] inline-flex items-center gap-2"
                  >
                    <span>{genre.name}</span>
                    <span>&rarr;</span>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#09090B]" />}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
