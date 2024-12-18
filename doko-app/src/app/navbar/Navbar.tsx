'use client'

import Link from 'next/link';

import { useState, useEffect } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { useContext } from 'react';

import Spinner from '../ui/Spinner';

import Image from 'next/image';

const Navbar = () => {

  const isLoading = false;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { authToken, player, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    if (player != null) {
      setIsAuthenticated(true)
      console.log("useEffect: true")
    } else {
      setIsAuthenticated(false)
      console.log("useEffect: false")
    }
  }, [player])

  return (
    <div className="bg-gray-800 text-gray-200 shadow-lg p-4">
      <div className="w-full flex items-center">

        {/* Left Side: Link to Landing Page and Center Links */}
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
            <button className="text-lg font-semibold text-gray-100 hover:text-gray-300">
              Doppelkopf Tracker
            </button>
          </Link>
          <Link href="/groups" passHref>
            <button className="text-gray-200 hover:text-white">Gruppen</button>
          </Link>
          <Link href="/players" passHref>
            <button className="text-gray-200 hover:text-white">Spieler</button>
          </Link>
        </div>

        {/* <div className='mt-auto'> */}
        <div className="ml-auto flex items-center space-x-4">
          {!isAuthenticated && (
            <>
              <Link href="/login" passHref>
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                  Login
                </button>
              </Link>
              <Link href="/register" passHref>
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Registrieren
                </button>
              </Link>
            </>
          )}
          {isLoading && <div className='animate-spin rounded-full h-7 w-7 border-b-2 border-white/50 mx-auto my-2'></div>}

          {isAuthenticated && (

            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleLogout}>
              Logout
            </button>
          )}

          {player && (
            <Link href="/dashboard">
              <div className="ml-auto flex items-center space-x-4">
              <div className='h-8 w-8 rounded-full mx-auto  my-0 bg-green-500 text-base flex justify-center items-center'>
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
