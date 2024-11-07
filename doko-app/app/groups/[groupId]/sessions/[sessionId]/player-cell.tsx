import { Fragment } from "react";

import { PlayerData } from "./player-column";
import GreenRedCellSpan from "../../../../ui/green-red-span";
import { Checkbox } from "../../../../ui/cards";

import { Party, PARTY, nextParty } from "../../../../models/general/Constants";

interface PlayerCellProps {
    data: PlayerData;
    soloCheckboxDisabled: boolean;
    setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>>;
    setSoloCheckbox: any;
}

const PlayerCell: React.FC<PlayerCellProps> = ({ data, soloCheckboxDisabled, setPlayers, setSoloCheckbox }) => {
    const dynamic_class_name = 
        data.party == PARTY.Re ? 'text-black' : 
        data.party == PARTY.Contra ? 'text-red-500' : 'text-white-500'


    const party_emoji = 
        data.party == PARTY.Re ? String.fromCodePoint(0x2663) : 
        data.party == PARTY.Contra ? String.fromCodePoint(0x2666) : ''

    const changePlayerParty = (id: number, newParty: Party) => {
        setPlayers((prevPlayers: PlayerData[]) =>
            prevPlayers.map((player) =>
            player.id === id ? { ...player, party: newParty } : player
            )
        );
    };



    const onClick = () => {
        changePlayerParty(data.id, nextParty(data.party));
    }
        

    return (
        
        <Fragment>
            <span className="justify-self-start text-left mr-4">{data.name}</span>
            <Checkbox isDisabled={soloCheckboxDisabled} isChecked={data.solo} updateCheckbox={setSoloCheckbox} />
            <button className={`bg-gray-500 text-white font-bold px-2 py-1 rounded-md text-center min-w-[100px]`} onClick={() => onClick()}>
                <span className={`${dynamic_class_name}`}>{party_emoji}{' '}{data.party}</span>
            </button>
            
            <GreenRedCellSpan score={data.score}/>
        </Fragment>

    )
}

export default PlayerCell;