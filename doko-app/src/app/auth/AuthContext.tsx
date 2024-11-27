'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login, refreshAuthToken } from './authService';

// Define the shape of your context
interface AuthContextType {
  authToken: string | null;
  player: any | null; // Replace `any` with a specific type if you have a player type defined
  handleLogin: (email: string, password: string) => Promise<any>;
  handleRegister: (name: string, email: string, password: string) => Promise<any>;
  handleLogout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  authToken: null,
  player: null,
  handleLogin: async () => {
    throw new Error('handleLogin not implemented');
  },
  handleRegister: async () => {
    throw new Error('handleRegister not implemented');
  },
  handleLogout: () => {},
});

// Define props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const apiBaseUrl =
    typeof window === 'undefined'
      ? process.env.INTERNAL_API_BASE_URL
      : process.env.NEXT_PUBLIC_API_BASE_URL;

  const isClient = typeof window !== 'undefined';

  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loggedInPlayer, setLoggedInPlayer] = useState<any | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const handleRegister = async (name: string, email: string, password: string) => {
    const request = axios.post(`${apiBaseUrl}/auth/register`, { name, email, password });

    request
      .then((response) => {
        setLoggedInPlayer(response.data.dokoPlayer);
        setAuthToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);

        // Persist in localStorage
        localStorage.setItem('auth_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        localStorage.setItem('player', JSON.stringify(response.data.dokoPlayer));
      })
      .catch(() => {
        console.log('Register error');
      });

    return request;
  };

  const handleLogin = async (email: string, password: string) => {
    const request = axios.post(`${apiBaseUrl}/auth/authenticate`, { email, password });

    request
      .then((response) => {
        setLoggedInPlayer(response.data.dokoPlayer);
        setAuthToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);

        // Persist in localStorage
        localStorage.setItem('auth_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        localStorage.setItem('player', JSON.stringify(response.data.dokoPlayer));
      })
      .catch(() => {
        console.log('Login error');
      });

    return request;
  };

  const handleLogout = () => {
    setLoggedInPlayer(null);
    setAuthToken(null);
    setRefreshToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('player');
    router.push(`/`);
  };

  const refreshTokenIfNeeded = async () => {
    try {
      if (refreshToken) {
        const newAuthToken = await refreshAuthToken(refreshToken);
        setAuthToken(newAuthToken);
        localStorage.setItem('auth_token', newAuthToken);
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
      handleLogout(); // Log out if token refresh fails
    }
  };

  useEffect(() => {
    // Refresh token on app load
    if (!authToken) {
      refreshTokenIfNeeded();
    }

    setAuthToken(localStorage.getItem('auth_token'));
    setLoggedInPlayer(JSON.parse(localStorage.getItem('player') || 'null'));
    setRefreshToken(localStorage.getItem('refresh_token'));

  }, []); // Run only once on component mount

  return (
    <AuthContext.Provider value={{ authToken, player: loggedInPlayer, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
