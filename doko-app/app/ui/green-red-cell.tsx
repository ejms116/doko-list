import { PlayerProps } from "../groups/[groupId]/sessions/[sessionId]/game-row";

import { Party, PARTY } from "../models/general/Constants";


const GreenRedCell: React.FC<PlayerProps> = ({ score, party }) => {
    const dynamic_class_name = 
        score > 0 ? 'text-green-500' : 
        score < 0 ? 'text-red-500' : ''

    const party_emoji = 
        party === PARTY.RE ? String.fromCodePoint(0x2663) : 
        party === PARTY.CONTRA ? String.fromCodePoint(0x2666) : String.fromCodePoint(0x2666)

    const party_emoji2 =
        party === PARTY.RE ? <span className="text-black">{party_emoji}</span> : 
        party === PARTY.CONTRA ? <span className="text-red-500">{party_emoji}</span> : ''

    const dynamic_text = party === PARTY.INAKTIV ? '-' : score

    return (
        <th className={`py-3 px-6 text-center`}>
            <span className={`${dynamic_class_name}`}>{dynamic_text}{' '}</span>
            {party_emoji2}
        </th>
    )
}

export default GreenRedCell;