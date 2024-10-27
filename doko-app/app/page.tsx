import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Doko Tracker v1</h1>
      <p className="text-xl mb-8">Track your Doppelkopf games with ease.</p>
      
      <div className="flex space-x-4">
        <Link href="/groups">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
            Go to Groups
          </button>
        </Link>
        
        <Link href="/players">
          <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300">
            Go to Players
          </button>
        </Link>
      </div>
    </div>
  );
}
