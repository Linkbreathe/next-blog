"use client"
import React, { useContext } from 'react'
import { NextUIProvider } from "@nextui-org/react";
import { ThemeContext } from "@/context/ThemeContext";

const NextUIThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    // <div className=" {theme} vibrant-black text-foreground bg-background flex items-center justify-center">
    <div className={`${theme} vibrant-black text-foreground bg-background flex items-center justify-center`}>
      {children}
    </div>
  )
}

export default NextUIThemeProvider