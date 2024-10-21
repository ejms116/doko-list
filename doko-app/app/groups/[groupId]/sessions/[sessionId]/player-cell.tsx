import { Fragment } from "react";

import { PlayerData } from "./player-column";
import { Team } from "./player-column";
import GreenRedCellSpan from "../../../../ui/green-red-span";
import { Checkbox } from "../../../../ui/cards";

const PlayerCell: React.FC<{data: PlayerData, setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>>}> = (data, setPlayers) => {
    const dynamic_class_name = 
        data.data.team == Team.Re ? 'text-black' : 
        data.data.team == Team.Contra ? 'text-red-500' : 'text-white-500'


    const party_emoji = 
        data.data.team == Team.Re ? String.fromCodePoint(0x2663) : 
        data.data.team == Team.Contra ? String.fromCodePoint(0x2666) : ''

    const changePlayerTeam = (id: number, newTeam: Team) => {
        data.setPlayers((prevPlayers: PlayerData[]) =>
            prevPlayers.map((player) =>
            player.id === id ? { ...player, team: newTeam } : player
            )
        );
    };

    const nextTeam = () => {
        switch(data.data.team) {
            case Team.Re:
                return Team.None;
            case Team.Contra:
                return Team.Re;
            default:
                return Team.Contra;
        }
    }

    const onClick = () => {
        changePlayerTeam(data.data.id, nextTeam());
    }
        

    return (
        
        <Fragment>
            <span className="text-center">{data.data.name}</span>
            <button className={`bg-gray-500 text-white font-bold px-2 py-1 rounded-md text-center min-w-[80px]`} onClick={() => onClick()}>
                <span className={`${dynamic_class_name}`}>{party_emoji}{' '}{Team[data.data.team]}</span>
            </button>
            <Checkbox isDisabled={true} />
            <GreenRedCellSpan score={1}/>
        </Fragment>

    )
}

export default PlayerCell;