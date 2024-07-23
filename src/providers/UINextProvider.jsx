// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'

export function UINextProvider({ children }) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}