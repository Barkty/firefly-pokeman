import { useState, useEffect } from "react";

export const useWidthResize = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const resizeWidth = () => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", resizeWidth);
      return () => window.removeEventListener("resize", resizeWidth);
    }
  }, []);

  return { width };
};
