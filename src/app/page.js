"use client";

import Header from "./_features/Header";
import { HeroSection } from "./_features/home/HeroSection";
import { MovieList } from "./_features/home/MovieList";
import Footer from "./_features/Footer";
import { useState, useEffect } from "react";
import React from "react";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex-col bg-white dark:bg-[#09090B] ">
      <Header />

      <HeroSection />
      <MovieList title={`Upcoming`} type="upcoming" />

      <MovieList title={`Popular`} type="popular" />

      <MovieList title={`Top Rated`} type="top_rated" />

      <Footer />
    </div>
  );
};

export default Home;
