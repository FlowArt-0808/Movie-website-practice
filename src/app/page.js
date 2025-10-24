"use client";

import Header from "./_features/Header";
import HeroSection from "./_features/home/HeroSection";
import MovieList from "./_features/home/MovieList";
import Footer from "./_features/Footer";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

function Home() {
  const [movieData, setMovieData] = useState([]);
  const getData = async () => {
    const upcomingMovieEndpoint = `${BASE_URL}/movie/upcoming?language=en-US&page1`;

    const response = await fetch(upcomingMovieEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response, "responseresponse");

    const data = await response.json();

    console.log(data, "datadatadata");
    setMovieData(data.results);
  };

  useEffect(() => {
    console.log(`page running once`);
    getData();
  }, []);

  return (
    <div className="w-[1440px] h-screen flex-col bg-white dark:bg-[#09090B] ">
      <Header />

      <HeroSection />
      <MovieList />
      <MovieList />
      <MovieList />

      <Footer />
    </div>
  );
}

export default Home;
