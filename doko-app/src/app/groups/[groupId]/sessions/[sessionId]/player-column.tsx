import React from 'react';
import PlayerCell from './player-cell';
import { Party } from '../../../../models/general/Constants';

import { SessionPlayer } from '../../../../models/composite/SessionPlayer';

export interface PlayerData {
    id: number;
    name: string;
    seat: number;
    party: Party;
    score: number;
    solo: boolean;
    dealer: boolean;
    lead: boolean;

}

interface PlayerColumnProps {
    data: PlayerData[];
    setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>>;
    soloCheckboxDisabled: boolean;
    setSoloCheckbox: any;
}

const PlayerColumn: React.FC<PlayerColumnProps> = ({ data, setPlayers, soloCheckboxDisabled, setSoloCheckbox }) => {
    return (
        <div className="grid grid-cols-[auto_auto_auto_auto] place-items-center">

            {/* Header for Player */}
            <div className="justify-self-start col-span-1 text-base font-bold text-left">Players</div>
            <div className="col-span-1 text-base font-bold text-center">Solo</div>
            <div className="col-span-1 text-base font-bold text-center">Team</div>
            <div className="col-span-1 text-base font-bold text-center">Punkte</div>

            <div className="text-center">&nbsp;</div>
            <div className="text-center">&nbsp;</div>
            <div className="text-center">&nbsp;</div>
            <div className="text-center">&nbsp;</div>

            {/* Player names and "Re" */}
            {data.map((player) => (
                <PlayerCell key={player.id} data={player} setPlayers={setPlayers} soloCheckboxDisabled={soloCheckboxDisabled} setSoloCheckbox={() => setSoloCheckbox(player.id)} />
            ))}
        </div>

    );
};

export default PlayerColumn;
