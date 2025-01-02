'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext, useContext } from 'react'

const GlobalContext = createContext()
const queryClient = new QueryClient()

export const useGlobalContext = () => useContext(GlobalContext)

export default function GlobalProvider({ children }) {
  const [progress, setProgress] = React.useState(13)

  const triggerProgress = () => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }


  return (
    <GlobalContext.Provider
      value={{ progress, triggerProgress }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </GlobalContext.Provider>
  );
}
