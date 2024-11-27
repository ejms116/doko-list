'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Player } from '../models/general/Player';

import useApiClient from "@/app/auth/useApiClient";
import { AuthContext } from "@/app/auth/AuthContext";
import { useContext } from "react";

import Link from "next/link";

import Spinner from "../ui/Spinner";

import GroupRow from '../groups/group-row';
import { GroupRowProps } from '../groups/group-row';

const apiBaseUrl =
    typeof window === "undefined"  // Check if running on the server
        ? process.env.INTERNAL_API_BASE_URL  // Use Docker internal URL for server components
        : process.env.NEXT_PUBLIC_API_BASE_URL;

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    const { authToken, player } = useContext(AuthContext);
    const apiClient = useApiClient();

    const router = useRouter();
    const [groupRowData, setGroupRowData] = useState<GroupRowProps[]>([]);

    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");

    const fetchData = async () => {
        if (!authToken) {
            return
        }
        setUserName(player.name);
        setUserEmail(player.email);
        try {
            setLoading(true);

            const groupsRequest = apiClient.get(`/groups/my/${player.id}`);

            Promise.all([groupsRequest])
                .then(([groupsResponse]) => {
                    console.log(groupsResponse.data)

                    setGroupRowData(groupsResponse.data.map((group: any) => {
                        return {
                            ...group,
                            founded: new Date(group.founded),
                            member: group.players.map((p: { name: any; }) => p.name).join(', '),
                        };
                    }));

                    
                })
                .catch((error) => {
                    //throw new Error('Failed to fetch data');
                })


        } catch (err: unknown) {
            if (err instanceof Error) {
                // setError(err);
            }
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [authToken]);

    const handleUpdate = () => {
        console.log("updating info")
    }
    // if (!isAuthenticated){
    //     //router.push('/api/auth/login')
    //     return <p>Nicht eingeloggt</p>
    // }

    if (loading) return <Spinner text="Lade Gruppen..." />
    if (!player) return <p>Error</p>

    return (
        <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">

            {/* User Info Section */}
            <div className="p-4 bg-gray-800 rounded-lg space-y-4">
                {/* <h3 className="text-xl font-semibold text-gray-300">Benutzerinformationen</h3> */}
                <h2 className="text-2xl font-semibold text-gray-300">Profil</h2>
                <div className="space-y-2">
                    {/* ID Field */}
                    <div className="flex items-center">
                        <label className="w-32 text-gray-400">ID:</label>
                        <span className="bg-[#2A2A3C] text-gray-300 px-4 py-2 rounded-lg flex-grow">
                            {player.id}
                        </span>
                    </div>

                    {/* Joined Field */}
                    <div className="flex items-center">
                        <label className="w-32 text-gray-400">Beigetreten:</label>
                        <span className="bg-[#2A2A3C] text-gray-300 px-4 py-2 rounded-lg flex-grow">
                            {new Date(player.joined).toLocaleString('de-DE')}
                        </span>
                    </div>

                    {/* Name Field */}
                    <div className="flex items-center">
                        <label className="w-32 text-gray-400">Name:</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="bg-[#2A2A3C] text-gray-300 px-4 py-2 rounded-lg flex-grow"
                        />
                    </div>



                    {/* Email Field */}
                    <div className="flex items-center">
                        <label className="w-32 text-gray-400">Email:</label>
                        <input
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="bg-[#2A2A3C] text-gray-300 px-4 py-2 rounded-lg flex-grow"
                        />
                    </div>
                </div>

                {/* Update Button */}
                {/* <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Info aktualisieren
                </button> */}
            </div>

            {/* Groups Section */}
            <div className="mt-6 flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">Meine Doppelkopf Gruppen</h2>
                <Link href={`/groups/detail/new`}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Neue Gruppe anlegen
                    </button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-[#2A2A3C] shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Mitglieder</th>
                            <th className="py-3 px-6 text-left">Gegründet</th>
                            <th className="py-3 px-6 text-left">Anzahl Sessions</th>
                            <th className="py-3 px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm">
                        {groupRowData.map((item: GroupRowProps) => (
                            <GroupRow key={item.id} data={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default Dashboard;
