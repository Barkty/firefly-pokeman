"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
    {children}
    <ToastContainer />
    </HeroUIProvider>
  );
}
