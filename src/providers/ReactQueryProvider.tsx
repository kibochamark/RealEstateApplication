"use client"

import React, { ReactNode } from 'react'

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
    return (

        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

    )
}

export default ReactQueryProvider