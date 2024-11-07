'use client'

import { useState } from "react";

import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import PlayerSelectionRow from "./PlayerSelectionRow";
import { PlayerSelectionProps } from "./page";

type PlayerListProps = {
    title: string;
    players: PlayerSelectionProps[];
    setPlayers: React.Dispatch<React.SetStateAction<PlayerSelectionProps[]>>;
};

const PlayerSelection: React.FC<PlayerListProps> = ({ title, players, setPlayers }) => {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const getPlayerPosition = (id: number) => players.findIndex((player) => player.id === id);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over === null) {
            return;
        }

        setPlayers((players) => {
            const oldPos = getPlayerPosition(Number(active.id));
            const newPos = getPlayerPosition(Number(over.id));

            return arrayMove(players, oldPos, newPos);
        });
    };

    const togglePlayerChecked = (id: number) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === id
                    ? { ...player, checked: !player.checked }
                    : player
            )
        );
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="bg-[#2A2A3C] shadow-md rounded-lg overflow-hidden">
                <div className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal py-3 px-6">
                    {title}
                </div>
                <div className="divide-y divide-[#3B3B4D]">
                    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                        <SortableContext items={players} strategy={verticalListSortingStrategy}>
                            {players.map((player) => (
                                <PlayerSelectionRow 
                                    key={player.id} 
                                    id={player.id} 
                                    name={player.player.name} 
                                    email={player.player.email} 
                                    checked={player.checked}
                                    onToggle={() => togglePlayerChecked(player.id)}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </div>
    );
}

export default PlayerSelection;
