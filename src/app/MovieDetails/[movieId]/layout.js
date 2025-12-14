"use client";
import React from "react";
import { MovieDetailsProvider } from "@/app/_provider/movieDetailsProvider";

const MovieDetailsLayout = ({ children }) => {
  return <MovieDetailsProvider>{children}</MovieDetailsProvider>;
};

export default MovieDetailsLayout;
