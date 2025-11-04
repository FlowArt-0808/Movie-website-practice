"use client";

import Header from "./_features/Header";
import { HeroSection } from "./_features/home/HeroSection";
import { MovieList } from "./_features/home/MovieList";
import Footer from "./_features/Footer";
import { useState, useEffect } from "react";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton";

function Home() {
  return (
    <div className="w-[1440px] h-screen flex-col bg-white dark:bg-[#09090B] ">
      <Header />

      <HeroSection />
      <MovieList type="upcoming" />

      <MovieList type="popular" />

      <MovieList type="top_rated" />

      <Footer />
    </div>
  );
}

export default Home;
