// components/ProtectedRoutes.tsx
import { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import apiService from '../services/LoginApiService'

export default function ProtectedRoutes() {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const userEmail = await apiService.checkUser()
        if (userEmail) {
          setLoading(false)
          console.log('User logged in:', userEmail)
        } else {
          console.log('User not logged in')
        }
      } catch (error) {
        console.error('Error checking user auth:', error)
      }
    }
    checkUserAuth()
  }, [])

  if (loading) {
    return <div>please Login!</div>
  }

  return isLogged ? <Outlet /> : <Navigate to="/login" />
}
