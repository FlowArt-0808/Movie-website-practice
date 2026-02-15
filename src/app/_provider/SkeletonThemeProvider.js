"use client";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AppSkeletonThemeProvider = ({ children }) => {
  return <SkeletonTheme>{children}</SkeletonTheme>;
};
