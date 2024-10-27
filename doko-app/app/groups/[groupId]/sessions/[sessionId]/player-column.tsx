import React from 'react';
import PlayerCell from './player-cell';
import { Party } from '../../../../models/general/Constants';

import { SessionPlayer } from '../../../../models/composite/SessionPlayer';

export interface PlayerData {
    id: number;
    name: string;
    party: Party;

}

const PlayerColumn: React.FC<{ data: PlayerData[], setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>> }> = ({ data, setPlayers }) => {
    return (
        <div className="grid grid-cols-[auto_auto_auto_auto] place-items-center">

            {/* Header for Player */}
            <div className="justify-self-start col-span-1 text-base font-bold text-left">Players</div>
            <div className="col-span-1 text-base font-bold text-center">Team</div>
            <div className="col-span-1 text-base font-bold text-center">
                <span className='p-1'>
                    Solo
                </span>
            </div>
            <div className="col-span-1 text-base font-bold text-center">Punkte</div>



            <div className="text-center">&nbsp;</div>
            <div className="text-center">&nbsp;</div>
            <div className="text-center">&nbsp;</div>
            <div className="text-center">&nbsp;</div>




            {/* Player names and "Re" */}
            {data.map((player) => (
                <PlayerCell data={player} setPlayers={setPlayers} />
            ))}
        </div>

    );
};

export default PlayerColumn;
