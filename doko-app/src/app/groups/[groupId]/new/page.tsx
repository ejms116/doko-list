'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

import { Group } from "../../../models/general/Group";

import PlayerSelection from "./PlayerSelection";
import { Player } from "../../../models/general/Player";

import useApiClient from '@/app/auth/useApiClient';

const apiBaseUrl =
    typeof window === "undefined"  // Check if running on the server
        ? process.env.INTERNAL_API_BASE_URL  // Use Docker internal URL for server components
        : process.env.NEXT_PUBLIC_API_BASE_URL;

export type PlayerSelectionProps = {
    id: number;
    player: Player;
    checked: boolean;
};

const NewSessionPage = ({ params }: { params: { groupId: string } }) => {
    const router = useRouter();
    const apiClient = useApiClient();
    const [groupData, setGroupData] = useState<Group | null>(null);
    const [allPlayers, setAllPlayers] = useState<PlayerSelectionProps[]>([]);
    const [selectedPlayers, setSelectedPlayers] = useState<PlayerSelectionProps[]>([]);
    const [location, setLocation] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const moveCheckedPlayers = (
        source: PlayerSelectionProps[],
        setSource: React.Dispatch<React.SetStateAction<PlayerSelectionProps[]>>,
        target: PlayerSelectionProps[],
        setTarget: React.Dispatch<React.SetStateAction<PlayerSelectionProps[]>>
    ) => {
        const playersToMove = source.filter(player => player.checked).map(player => ({ ...player, checked: false }));
        const remainingPlayers = source.filter(player => !player.checked);

        setSource(remainingPlayers);
        setTarget(prevTarget => [...prevTarget, ...playersToMove]);
    };

    const fetchData = async () => {
        try {

            const groupRequest = apiClient.get(`/groups/${params.groupId}`);

            Promise.all([groupRequest])
                .then(([groupResponse]) => {
                    setGroupData(groupResponse.data);

                    const initialAllPlayers: PlayerSelectionProps[] = groupResponse.data.players.map((player: Player) => ({
                        id: player.id,
                        player: player,
                        checked: false
                    }));

                    setAllPlayers(initialAllPlayers);

                })
                .catch((error) => {
                    //throw new Error('Failed to fetch data');
                })

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
            console.log(err);
        }
    };

    useEffect(() => {


        fetchData();
    }, [params.groupId]);

    const createSession = async () => {
        // Validate location and selected players
        if (!location.trim()) {
            setError("Bitte Ort angeben.");
            return;
        }

        if (selectedPlayers.length < 4) {
            setError("Bitte mindestens 4 Spieler auswählen.");
            return;
        }

        const playerIds = selectedPlayers.map(player => player.id);
        const requestBody = {
            groupId: groupData?.id, // Use the group ID from groupData
            location: location,
            playerIds: playerIds,
        };

        try {
            const sessionRequest = apiClient.post(`${apiBaseUrl}/groups/sessions/create`, requestBody);

            Promise.all([sessionRequest])
                .then(([sessionResponse]) => {
                    setError("");
                    setSuccessMessage("Abend wurde erfolgreich angelegt! Weiterleitung...");
                    const newSessionId = sessionResponse.data.id;
                    router.push(`/groups/${groupData?.id}/sessions/${newSessionId}`);
                })
                .catch((error) => {
                    setError("Abend konnte nicht angelegt werden. Möglicherweise hast du nicht die erforderlichen Berechtigungen.");
                    //setError(error.message);
                })

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    if (!groupData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-6">
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">Neuen Abend erstellen</h2>
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={createSession}>
                    Erstellen & Abend öffnen
                </button>
            </div>

            {/* Code for the location input field */}
            <div className="mt-4">
                <label htmlFor="location" className="block text-gray-400 mb-2">Ort</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                    placeholder="Ort angeben..."
                />
            </div>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}

            {/* Player Selection Section */}
            <div className="flex justify-between space-x-4 mt-6">
                <div className="flex-1 bg-gray-800 rounded-lg p-4 shadow-lg">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
                        onClick={() => moveCheckedPlayers(selectedPlayers, setSelectedPlayers, allPlayers, setAllPlayers)}>
                        Markierte Spieler entfernen
                    </button>
                    <PlayerSelection title="Aktive Spieler" players={selectedPlayers} setPlayers={setSelectedPlayers} />
                </div>

                <div className="flex-1 bg-gray-800 rounded-lg p-4 shadow-lg">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
                        onClick={() => moveCheckedPlayers(allPlayers, setAllPlayers, selectedPlayers, setSelectedPlayers)}>
                        Markierte Spieler hinzufügen
                    </button>
                    <PlayerSelection title="Alle Spieler der Gruppe" players={allPlayers} setPlayers={setAllPlayers} />
                </div>
            </div>
        </div>
    );
};

export default NewSessionPage;
