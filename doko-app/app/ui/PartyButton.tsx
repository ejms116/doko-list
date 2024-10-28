import { PARTY, Party } from "../models/general/Constants"

interface PartyButtonProps {
    party: Party;
    win: boolean;
    text: string;
}

const PartyButton: React.FC<PartyButtonProps> = (props) => {
    const dynamic_class_name =
        props.party == PARTY.Re ? 'text-black' :
        props.party == PARTY.Contra ? 'text-red-500' : 'text-white-500'


    const party_emoji =
        props.party == PARTY.Re ? String.fromCodePoint(0x2663) :
        props.party == PARTY.Contra ? String.fromCodePoint(0x2666) : ''

    const border_color = props.win ? 'border-green-500' : 'border-red-500'


    return (
        <button className={`${border_color} border-2 bg-gray-500 text-white font-bold px-2 py-1 rounded-md text-center min-w-[100px]`}>
            <span className={`${dynamic_class_name}`}>{party_emoji}{' '}</span>
            <span className={`text-black`}>{props.text}</span>
            {/* <span className={`${dynamic_class_name}`}>{party_emoji}{' '}{props.party.slice(0, 2)}{' '}{props.text}</span> */}
        </button>
    )


}

export default PartyButton;