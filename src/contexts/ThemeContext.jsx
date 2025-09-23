import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored theme preference on app load
    const storedTheme = localStorage.getItem('Track My BusTheme')
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark')
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDark)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Update document class and save preference
    if (!loading) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('Track My BusTheme', isDarkMode ? 'dark' : 'light')
    }
  }, [isDarkMode, loading])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const value = {
    isDarkMode,
    toggleTheme,
    loading
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
