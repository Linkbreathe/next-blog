"use client"
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import "@uiw/react-markdown-preview/markdown.css";

const Articles = ({ desc }) => {
    return (
        <MarkdownPreview source={desc} style={{ padding: 16 }} />
    )
}

export default Articles