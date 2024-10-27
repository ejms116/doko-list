import { Fragment } from "react";

import { PlayerData } from "./player-column";
import GreenRedCellSpan from "../../../../ui/green-red-span";
import { Checkbox } from "../../../../ui/cards";

import { Party, PARTY } from "../../../../models/general/Constants";

const PlayerCell: React.FC<{data: PlayerData, setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>>}> = (data, setPlayers) => {
    const dynamic_class_name = 
        data.data.party == PARTY.RE ? 'text-black' : 
        data.data.party == PARTY.CONTRA ? 'text-red-500' : 'text-white-500'


    const party_emoji = 
        data.data.party == PARTY.RE ? String.fromCodePoint(0x2663) : 
        data.data.party == PARTY.CONTRA ? String.fromCodePoint(0x2666) : ''

    const changePlayerParty = (id: number, newParty: Party) => {
        data.setPlayers((prevPlayers: PlayerData[]) =>
            prevPlayers.map((player) =>
            player.id === id ? { ...player, party: newParty } : player
            )
        );
    };

    const nextParty = () => {
        switch(data.data.party) {
            case PARTY.RE:
                return PARTY.INAKTIV;
            case PARTY.CONTRA:
                return PARTY.RE;
            default:
                return PARTY.CONTRA;
        }
    }

    const onClick = () => {
        changePlayerParty(data.data.id, nextParty());
    }
        

    return (
        
        <Fragment>
            <span className="text-center">{data.data.name}</span>
            <button className={`bg-gray-500 text-white font-bold px-2 py-1 rounded-md text-center min-w-[80px]`} onClick={() => onClick()}>
                <span className={`${dynamic_class_name}`}>{party_emoji}{' '}{data.data.party}</span>
            </button>
            <Checkbox isDisabled={true} />
            <GreenRedCellSpan score={1}/>
        </Fragment>

    )
}

export default PlayerCell;