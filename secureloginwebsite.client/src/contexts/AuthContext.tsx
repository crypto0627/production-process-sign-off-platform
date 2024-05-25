// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isLogged: boolean
  login: (user: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('user'))

  const login = (user: string) => {
    localStorage.setItem('user', user)
    setIsLogged(true)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setIsLogged(false)
  }

  return <AuthContext.Provider value={{ isLogged, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
