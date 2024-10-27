import { PARTY, Party } from "../models/general/Constants"

interface PartyButtonProps {
    party: Party;
}

const PartyButton: React.FC<PartyButtonProps> = (props) => {
    const dynamic_class_name =
        props.party == PARTY.RE ? 'text-black' :
        props.party == PARTY.CONTRA ? 'text-red-500' : 'text-white-500'


    const party_emoji =
        props.party == PARTY.RE ? String.fromCodePoint(0x2663) :
        props.party == PARTY.CONTRA ? String.fromCodePoint(0x2666) : ''

    return (
        <button className={`bg-gray-500 text-white font-bold px-2 py-1 rounded-md text-center min-w-[100px]`}>
            <span className={`${dynamic_class_name}`}>{party_emoji}{' '}{props.party}</span>
        </button>
    )


}

export default PartyButton;