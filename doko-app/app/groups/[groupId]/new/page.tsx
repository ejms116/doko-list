'use client'

import { useState, useEffect, useMemo } from "react";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Group } from "../../../models/general/Group";

import DraggablePlayerList from "./DraggablePlayerList";

import PlayerSelection from "./PlayerSelection";
import { group } from "console";

import { Player } from "../../../models/general/Player";
import { all } from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export type PlayerSelectionProps = {
    id: number;
    player: Player;
    checked: boolean;
}


const NewSessionPage = ({ params }: {
    params: { groupId: string }

    

}) => {

    const [allPlayers, setAllPlayers] = useState<PlayerSelectionProps[]>([
        { id: 1, player: { id: 1, name: 'Yannick', email: 'yannick@mail.com'}, checked: true },
        { id: 2, player: { id: 2, name: 'Daniel', email: 'daniel@mail.com'}, checked: true },
        { id: 3, player: { id: 3, name: 'Hendrik', email: 'hendrik@mail.com' }, checked: false },
        { id: 4, player: { id: 4, name: 'Matze', email: 'matze@mail.com'}, checked: false },
        { id: 5, player: { id: 5, name: 'Erik', email: 'erik@mail.com'}, checked: false },
    ])

    const [selectedPlayers, setSelectedPlayers] = useState<PlayerSelectionProps[]>([
        { id: 1, player: { id: 1, name: 'Yannick', email: 'yannick@mail.com'}, checked: true },
        { id: 2, player: { id: 2, name: 'Daniel', email: 'daniel@mail.com'}, checked: true },
        { id: 3, player: { id: 3, name: 'Hendrik', email: 'hendrik@mail.com' }, checked: false },
        { id: 4, player: { id: 4, name: 'Matze', email: 'matze@mail.com'}, checked: false },
        { id: 5, player: { id: 5, name: 'Erik', email: 'erik@mail.com'}, checked: false },
    ])

    const [groupData, setGroupData] = useState<Group | null>(null);
    const [error, setError] = useState<unknown>();

    const movePlayers = () => {
        let a = allPlayers.find((player) => player.id === 1)
        let b = allPlayers.filter((player) => player.id !== 1)
  

        setSelectedPlayers((prevPlayers) => [...prevPlayers, a]);
        setAllPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== 1));
    }
    
    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const res = await fetch(`${apiBaseUrl}/groups/${params.groupId}`, {
                    cache: 'no-store',
                });
                
                if (!res.ok){
                    throw new Error('Failed to fetch data')
                }

                const data = await res.json();
                setGroupData(data)

                // TODO convert date?
                // const groupData: Group = {
                //     ...rawGroupData,
                //     founded: new Date(rawGroupData.founded)
            
                // };

            } catch (err: unknown){
                if (err instanceof Error){
					setError(err);
				}
				
				console.log(err);
            }
        }


        fetchGroupData()

    }, [params.groupId])


    if (!groupData){
        return <p>Loading...</p>
    }

    return (
        <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">Neuen Abend erstellen</h2>

                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Erstellen & Abend öffnen
                </button>

            </div>


            <div className="flex justify-start space-x-4 p-4">
                <div className="flex-1">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"  onClick={() => movePlayers()}>
                        Markierte Spieler entfernen
                    </button>
                    <PlayerSelection title="Aktive Spieler" players={selectedPlayers} setPlayers={setSelectedPlayers} />
                </div>
          
                <div className="flex-1">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Markierte Spieler hinzufügen
                    </button>
                    <PlayerSelection title="Alle Spieler der Gruppe" players={allPlayers} setPlayers={setAllPlayers} />
                </div>
            </div>






        </div>

    );
}

export default NewSessionPage;