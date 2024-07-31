"use client"
import React from 'react'
import { APIProvider } from '@vis.gl/react-google-maps';

export const MapProvider = ({ children }) => {
    return (
        <APIProvider apiKey={process.env.GOOGLE_MAP_API_KEY}>
            {children}
        </APIProvider>
    )
}

