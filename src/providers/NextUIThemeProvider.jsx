"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from "@/context/ThemeContext";

const NextUIThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

  }, []);

  if (mounted) {
    return (
      // <div className=" {theme} vibrant-black text-foreground bg-background flex items-center justify-center">
      <div className={`${theme} vibrant-black text-foreground bg-background flex items-center justify-center `}>
        {children}
      </div>
    )
  } else {
    // You might want to add a loading indicator or return null when not mounted
    return null;
  }
}

export default NextUIThemeProvider