"use client"
import React, { useContext } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import "@uiw/react-markdown-preview/markdown.css";
import { ThemeContext } from "@/context/ThemeContext";

const Articles = ({ desc }) => {
    const { theme } = useContext(ThemeContext)
    return (
        <MarkdownPreview source={desc} style={{ padding: 16 }} wrapperElement={{
            "data-color-mode": theme
        }} />
    )
}

export default Articles