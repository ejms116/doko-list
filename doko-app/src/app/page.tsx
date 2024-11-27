import Link from 'next/link';

import { AuthProvider } from './auth/AuthContext';

export default function Home() {


  return (
    <AuthProvider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-6">Willkommen zum Doko Tracker</h1>

        {/* Styled quote */}
        <p className="text-2xl italic text-gray-500 mb-8 max-w-2xl text-center">
          <span className="text-xl font-semibold">“Spiel die, dann wissen alle was du bist.”</span>
          <br />
          {/* <span className="text-lg text-gray-400">unbekannt</span> */}
        </p>

        <div className="flex space-x-4">
          <Link href="/groups">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
              Zu den Gruppen
            </button>
          </Link>

          <Link href="/players">
            <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300">
              Zu den Spielern
            </button>
          </Link>
        </div>
      </div>
    </AuthProvider>
  );
}
