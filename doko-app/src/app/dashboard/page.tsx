'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Player } from '../models/general/Player';
const apiBaseUrl =
  typeof window === "undefined"  // Check if running on the server
    ? process.env.INTERNAL_API_BASE_URL  // Use Docker internal URL for server components
    : process.env.NEXT_PUBLIC_API_BASE_URL;

const Dashboard = () => {
    const router = useRouter();
    const [player, setPlayer] = useState<Player>();
    //console.log(user)


    // const fetchData = async () => {
    //     if (user?.id !== undefined){
    //         const res = await fetch(`${apiBaseUrl}/players/kinde/${user?.id}`, {
    //             cache: 'no-store',
    //           });
              
    //           console.log(`res:`)
    //           console.log(res)
    //           const data = await res.json();
    //           console.log(`data:`)
    //           console.log(data)
    //           setPlayer(data);
    //     }
  
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [user?.id])

    
    // if (!isAuthenticated){
    //     //router.push('/api/auth/login')
    //     return <p>Nicht eingeloggt</p>
    // }

    return (
        <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">Dashboard</h2>
            </div>
            <div className="overflow-x-auto">
                <h1>Alle meine Gruppen</h1>
                
                {player && <p>{player.name}</p>}

            </div>
        </div>
    );
}

export default Dashboard;
