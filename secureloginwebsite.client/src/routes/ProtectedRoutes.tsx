// components/ProtectedRoutes.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/authSlice';
import { RootState } from '../redux/store';

export default function ProtectedRoutes() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/SecureLoginWebsite/xhtlekd', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(login(data.user.email));
          localStorage.setItem('user', data.user.email);
        } else {
          dispatch(logout());
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error in protected routes:', error);
        dispatch(logout());
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};
