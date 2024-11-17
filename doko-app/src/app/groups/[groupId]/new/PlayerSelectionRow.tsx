'use client'

import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface PlayerSelectionRowProps {
    id: number;
    name: string;
    checked: boolean;
    onToggle: () => void;

}

const PlayerSelectionRow: React.FC<PlayerSelectionRowProps> = ({ id, name, checked, onToggle }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });
    
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
  

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex items-center bg-[#2A2A3C] text-gray-200 py-3 px-6 hover:bg-[#3B3B4D] transition-colors duration-200"
        >
            <input 
                id="checked"
                type="checkbox" 
                checked={checked}
                onChange={onToggle}
                className="form-checkbox h-6 w-6 text-blue-500 bg-gray-600 border-gray-500 rounded mr-2"
                onPointerDown={(e) => e.stopPropagation()}
            />
            <span>
                {`${name}`}
            </span>


        </div>
    );
};

export default PlayerSelectionRow;
