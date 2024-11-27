'use client'

import { useRouter } from 'next/navigation';
import { group } from "console";
import { useState, useEffect, useRef } from "react";

import useApiClient from "@/app/auth/useApiClient";
import { AuthContext } from "@/app/auth/AuthContext";
import { useContext } from "react";

import Link from "next/link";

import { Player } from "@/app/models/general/Player";
import { Group } from "@/app/models/general/Group";

import Spinner from "@/app/ui/Spinner";

import GroupPlayer from "./group-player-row";

export type PlayerWithStatus = {
    player: Player;
    removeable: boolean;
};

const apiBaseUrl =
    typeof window === "undefined"  // Check if running on the server
        ? process.env.INTERNAL_API_BASE_URL  // Use Docker internal URL for server components
        : process.env.NEXT_PUBLIC_API_BASE_URL;

const GroupDetailPage = ({ params }: {
    params: { groupId: string }
}) => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [newGroup, setNewGroup] = useState<boolean>(false);

    const { authToken } = useContext(AuthContext);
    const apiClient = useApiClient();



    const [groupId, setGroupId] = useState<string>("wird generiert");
    const [groupName, setGroupName] = useState<string>("");

    const [players, setPlayers] = useState<PlayerWithStatus[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const fetchData = () => {

        if (!authToken) {
            return
        }
        try {
            setLoading(true);

            const groupRequest = apiClient.get(`/groups/${params.groupId}`);

            Promise.all([groupRequest])
                .then(([groupResponse]) => {

                    setGroupId(groupResponse.data.id);
                    setGroupName(groupResponse.data.name);

                    setPlayers(groupResponse.data.players.map((player: Player) => ({
                        player: player,
                        removeable: false,
                    })))
                })
                .catch((error) => {
                    //throw new Error('Failed to fetch data');
                })

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (params.groupId != 'new') {
            setNewGroup(false);
            fetchData();
        } else {
            setNewGroup(true);
            setLoading(false);

        }

    }, [params.groupId])

    const handleAddPlayer = () => {
        if (!authToken) {
            return
        }

        if (inputRef.current) {
            try {
                setLoading(true);
                const playerIdToCheck: number = Number(inputRef.current.value);

                const request = apiClient.get(`/players/${playerIdToCheck}`);

                Promise.all([request])
                    .then(([response]) => {
                        console.log(response)
                        console.log(response.data)

                        const containsPlayer = players.some((item) => {
                            if (inputRef.current) {
                                return item.player.id === playerIdToCheck;
                            }
                            return false; // Return false if inputRef.current is null
                        });

                        if (containsPlayer) {
                            console.log("err msg")
                        } else {
                            setPlayers(prevState => [...prevState, { player: response.data, removeable: true }]);

                        }
                    })
                    .catch((error) => {
                        //console.error("no data found")
                    })

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                console.log(err);
            } finally {
                setLoading(false);
            }

            inputRef.current.value = '';
        }
    }

    const removePlayerById = (id: number) => {
        setPlayers(prevState => prevState.filter(item => item.player.id !== id));
    };

    const getRemovablePlayerIds = (players: PlayerWithStatus[]): number[] => {
        return players
            .filter(item => item.removeable)
            .map(item => item.player.id);
    };

    const handleSaveGroup = () => {
        const requestBody = {
            name: groupName,
            playerIds: getRemovablePlayerIds(players)
        }
        if (newGroup) {

            // const gameRequest = apiClient.post(`${apiBaseUrl}/groups/${modalGameId}/create`, requestBody);
            const groupRequest = apiClient.post(`${apiBaseUrl}/groups/create`, requestBody);

            Promise.all([groupRequest])
                .then(([groupResponse]) => {
                    console.log(groupResponse)
                    console.log(groupResponse.data)

                    setGroupId(groupResponse.data.id);

                    setError("");
                    setSuccessMessage("Gruppe wurde angelegt! Weiterleitung...")
                    router.push(`/groups/detail/${groupResponse.data.id}`);


                })
                .catch((error) => {
                    setSuccessMessage("");
                    setError("Fehler beim Anlegen der Gruppe.")
                })

        } else {
            const groupRequest = apiClient.post(`${apiBaseUrl}/groups/${groupId}/change`, requestBody);

            Promise.all([groupRequest])
                .then(([groupResponse]) => {
                    console.log(groupResponse)
                    console.log(groupResponse.data)

                    setGroupId(groupResponse.data.id);

                    setError("");
                    setSuccessMessage("Gruppe wurde geändert!")


                    setGroupId(groupResponse.data.id);
                    setGroupName(groupResponse.data.name);

                    setPlayers(groupResponse.data.players.map((player: Player) => ({
                        player: player,
                        removeable: false,
                    })))


                    //router.push(`/groups/detail/${gameResponse.data.id}`);


                })
                .catch((error) => {
                    setSuccessMessage("");
                    setError("Fehler beim Anlegen der Gruppe.")
                })
        }

    }


    if (loading) return <Spinner text="Lade Daten zu Gruppe..." />

    return (
        <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
            {/* User Info Section */}
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">{newGroup ? "Neue Gruppe anlegen" : "Gruppe ändern"}</h2>
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleSaveGroup}>
                    {newGroup ? "Speichern" : 'Änderungen speichern'}
                </button>

                {!newGroup &&
                <Link href={`/groups/${params.groupId}`}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Abende anzeigen
                    </button>
                </Link>}

                {error && <p className="text-red-500 mt-4">{error}</p>}
                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}

            </div>


            <div className="flex justify-between space-x-4 mt-6">
                <div className="p-4 bg-gray-800 rounded-lg space-y-4">
                    {/* <h3 className="text-xl font-semibold text-gray-300">Benutzerinformationen</h3> */}
                    <h2 className="text-2xl font-semibold text-gray-300">Gruppendetails</h2>
                    <div className="space-y-2">
                        {/* ID Field */}
                        <div className="flex items-center">
                            <label className="w-32 text-gray-400">ID:</label>
                            <span className="bg-[#2A2A3C] text-gray-300 px-4 py-2 rounded-lg flex-grow">
                                {groupId}
                            </span>
                        </div>

                        {/* Name Field */}
                        <div className="flex items-center">
                            <label className="w-32 text-gray-400">Name:</label>
                            <input
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}

                                className="bg-[#2A2A3C] text-gray-300 px-4 py-2 rounded-lg flex-grow"
                            />
                        </div>
                    </div>
                </div>


                <div className="flex-1 bg-gray-800 rounded-lg p-4 shadow-lg">
                    <div className="flex flex-col space-y-4">
                        <div className='flex'>

                            <button
                                onClick={handleAddPlayer}
                                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Hinzufügen
                            </button>

                            <input
                                type="text"
                                id="playerId"
                                ref={inputRef}
                                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Spieler-Id angeben"
                            />

                        </div>


                        <div className="bg-[#2A2A3C] shadow-md rounded-lg overflow-hidden">
                            <div className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal py-3 px-6">
                                Spieler der Gruppe
                            </div>
                            <div className="divide-y divide-[#3B3B4D]">
                                {players.map((player: PlayerWithStatus) => {
                                    return (
                                        <GroupPlayer
                                            key={player.player.id}
                                            id={player.player.id}
                                            name={player.player.name}
                                            showRemove={player.removeable}
                                            onClick={() => removePlayerById(player.player.id)}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default GroupDetailPage;