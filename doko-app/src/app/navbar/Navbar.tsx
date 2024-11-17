'use client'

import Link from 'next/link';

import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Spinner from '../ui/Spinner';

import Image from 'next/image';

const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

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


        {/* <div className="ml-auto flex items-center space-x-4">

          <LoginLink>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
              Login
            </button>
          </LoginLink>
          <RegisterLink>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Registrieren
            </button>
          </RegisterLink>

        </div> */}


        {/* <div className='mt-auto'> */}
        <div className="ml-auto flex items-center space-x-4">
          {!isAuthenticated && (
            <>
              <LoginLink>
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                  Login
                </button>
              </LoginLink>
              <RegisterLink>
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Registrieren
                </button>
              </RegisterLink>
            </>
          )}
          {isLoading && <div className='animate-spin rounded-full h-7 w-7 border-b-2 border-white/50 mx-auto my-2'></div>}





          {/* {user?.email && (
              <p className='text-center text-xs mb-3'>Eingeloggt als {user?.email}</p>
            )} */}

          {isAuthenticated && (
            <LogoutLink className='hover:bg-zinc-800 rounded-md w-[90%] transition inline-block'>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Logout
              </button>
            </LogoutLink>
          )}

          {user?.picture && (
            <Link href="/dashboard">
              <Image
                src={user?.picture}
                alt="Profile picture"
                width={40}
                height={40}
                className="rounded-full mx-auto my-auto"
              />
            </Link>
          )}

          {user && !user.picture && (
            <Link href="/dashboard">
              <div className='h-7 w-7 rounded-full mx-auto my-2 bg-zinc-800 text-xs flex justify-center items-center'>
                {user?.given_name?.[0]}
              </div>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
