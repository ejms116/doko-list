'use client'
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import DraggablePlayerRow from './DraggablePlayerRow';
import DroppableSeatRow from './DroppableSeatRow';

interface Player {
    id: number;
    name: string;
    email: string;
}

const initialPlayers: Player[] = [
    { id: 1, name: 'Yannick', email: 'yannick@mail.com' },
    { id: 2, name: 'Daniel', email: 'daniel@mail.com' },
    { id: 3, name: 'Hendrik', email: 'hendrik@mail.com' },
    { id: 4, name: 'Matze', email: 'matze@mail.com' },
    { id: 5, name: 'Erik', email: 'erik@mail.com' }
];


function DraggablePlayerList() {
    const containers = ['A', 'B', 'C'];
    const [parent, setParent] = useState(null);
    const draggableMarkup = (
        <Draggable id="draggable">Drag me</Draggable>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}

            {containers.map((id) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <Droppable key={id} id={id}>
                    {parent === id ? draggableMarkup : id}
                </Droppable>
            ))}
            <div className="flex  space-x-4">
                <div className="overflow-x-auto bg-[#2A2A3C] shadow-md rounded-lg w-1/2">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">All players</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialPlayers.map((player: Player, index: number) => {
                                return (
                                    <DroppableSeatRow key={index} id={index}>
                                        <tr className="bg-[#2A2A3C] text-gray-200 hover:bg-[#3B3B4D] transition-colors duration-200">
                                            <td className="py-3 px-6">Seat: {index + 1}</td>
                                        </tr>
                                    </DroppableSeatRow>
                                )

                            })}

                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-hidden bg-[#2A2A3C] shadow-md rounded-lg w-1/2">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">All players</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialPlayers.map((player: Player) => {
                                return (
                                    // <DraggablePlayerRow id={player.id} name={player.name} email={player.email}/>
                                    <div>
                                        <Draggable id={player.id}>
                                            <tr className="bg-[#2A2A3C] text-gray-200 hover:bg-[#3B3B4D] transition-colors duration-200" >
                                                <td className="py-3 px-6">
                                                    {player.name} ({player.email})
                                                </td>
                                            </tr>
                                        </Draggable>
                                    </div>
                                )

                            })}
                            {/* <Draggable id={2}>
                                <tr className="bg-[#2A2A3C] text-gray-200 hover:bg-[#3B3B4D] transition-colors duration-200" >
                                    <td className="py-3 px-6">
                                        test
                                    </td>
                                </tr>
                            </Draggable> */}
                            {/* <div>
                                <tr className="bg-[#2A2A3C] text-gray-200 hover:bg-[#3B3B4D] transition-colors duration-200" >
                                    <td className="py-3 px-6">
                                        test
                                    </td>
                                </tr>
                            </div>
                            {initialPlayers.map((player: Player) => {
                                return (
                                    <DraggablePlayerRow id={player.id} name={player.name} email={player.email}/>
                                )

                            })} */}

                        </tbody>
                    </table>
                </div>

            </div>

        </DndContext>
    );

    function handleDragEnd(event) {
        const { over } = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }
};

export default DraggablePlayerList;