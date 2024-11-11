import Link from 'next/link';

const Navbar = () => {
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

        {/* Right Side: Login Button */}
        <div className="ml-auto">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
