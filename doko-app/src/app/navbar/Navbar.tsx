'use client';

import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const Navbar = () => {
  const isLoading = false;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { authToken, player, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    setIsAuthenticated(!!player);
  }, [player]);

  return (
    <div className="bg-gray-800 text-gray-200 shadow-lg px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left Side: Links */}
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
            <button className="text-base font-medium text-gray-100 hover:text-gray-300">
              Doppelkopf Tracker
            </button>
          </Link>
          <Link href="/groups" passHref>
            <button className="text-sm text-gray-200 hover:text-white">Gruppen</button>
          </Link>
          <Link href="/players" passHref>
            <button className="text-sm text-gray-200 hover:text-white">Spieler</button>
          </Link>
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center space-x-3">
          {!isAuthenticated && (
            <>
              <Link href="/login" passHref>
                <button className="bg-green-500 text-sm text-white py-1 px-3 rounded-md hover:bg-green-600">
                  Login
                </button>
              </Link>
              <Link href="/register" passHref>
                <button className="bg-blue-600 text-sm text-white py-1 px-3 rounded-md hover:bg-blue-700">
                  Registrieren
                </button>
              </Link>
            </>
          )}

          {isLoading && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white/50"></div>
          )}

          {isAuthenticated && (
            <button
              className="bg-blue-600 text-sm text-white py-1 px-3 rounded-md hover:bg-blue-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          {player && (
            <Link href="/dashboard">
              <div className="flex items-center">
                <div className="h-7 w-7 rounded-full bg-green-500 text-center text-sm text-white flex items-center justify-center">
                  {player?.name?.[0]}
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
