import React from 'react';
import PlayerCell from './player-cell';

export enum Team {
    Re,
    Contra,
    None
}

export interface PlayerData {
    id: number;
    name: string;
    team: Team;

}

// export interface PlayerColumnProps {
//     player: PlayerData[];
// }

//const PlayerColumn: React.FC<{data: PlayerColumnProps}> = ({data}) => {
const PlayerColumn: React.FC<{ data: PlayerData[], setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>> }> = ({ data, setPlayers }) => {
    const dynamic_class_name = 'text-black'

    const party_emoji = String.fromCodePoint(0x2663)

    const dynamic_emoji = <span className="text-black">{party_emoji}</span>

    return (
        <div className="grid grid-cols-2 grid-flow-row">



            {/* Header for Player */}
            <div className="col-span-2 text-lg font-bold">Players</div>

            <div className="col-span-2 bg-[#2A2A3C] p-4 shadow-md rounded-lg">
                    <select
                        id="options"
                        className="block w-full bg-[#1E1E2C] border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    >
                        <option value="normal">Normal</option>
                        <option value="solo">Solo</option>
                        <option value="hochzeit">Hochzeit</option>
                    </select>
                </div>


          


            {/* Player names and "Re" */}
            {data.map((player) => (
                <PlayerCell data={player} setPlayers={setPlayers} />
                // <React.Fragment key={player.id}>
                //     <div className="text-left">{player.name}</div>
                //     <div className={`bg-gray-500 text-white font-bold px-2 py-1 rounded-md text-centerh`}>
                //         <span className={`${dynamic_class_name}`}>{dynamic_emoji}{' '}</span>
                //         {Team[player.team]}
                //     </div>
                // </React.Fragment>
            ))}
        </div>

    );
};

export default PlayerColumn;
