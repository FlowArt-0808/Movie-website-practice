"use client";
import React from "react";
import { SeeMoreProvider } from "@/app/_provider/seeMoreProvider";

const SeeMoreLayout = ({ children }) => {
  return <SeeMoreProvider>{children}</SeeMoreProvider>;
};

export default SeeMoreLayout;
