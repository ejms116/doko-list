import React from 'react';
import { Dispatch, SetStateAction } from 'react';

import { PlayerWithStatus } from './page';

type GroupPlayerProps = {
    name: string;
    showRemove: boolean;
    id: number;
    onClick: any;

};

const GroupPlayer: React.FC<GroupPlayerProps> = ({ name, showRemove, id, onClick }) => {
    return (
        <div className="flex items-center justify-between bg-[#2A2A3C] text-gray-200 py-3 px-6 hover:bg-[#3B3B4D] transition-colors duration-200">
            {/* Id displayed in a small circle on the left */}
            <span className="bg-[#3B3B4D] text-white text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center mr-4">
                {id}
            </span>

            {/* Player name */}
            <span className="flex-1">{name}</span> {/* Take available space */}

            {/* Remove button */}
            {showRemove && (
                <button
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1 px-3 rounded transition-colors duration-200"
                    title="Remove"
                    onClick={onClick}
                >
                    Entfernen
                </button>
            )}
        </div>
    );
};

export default GroupPlayer;
