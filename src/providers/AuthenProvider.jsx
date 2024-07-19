"use client"
import { SessionProvider } from "next-auth/react"
import React from 'react'

export function AuthenProvider({ children }) {
    return (<SessionProvider>
        {children}
    </SessionProvider>)
}