import { PlayerProps } from "../groups/[groupId]/sessions/[sessionId]/game-row";

import { Party, PARTY } from "../models/general/Constants";


const GreenRedCell: React.FC<PlayerProps> = ({ score, party, isLead, isSolo }) => {
    let dynamic_class_name =
        score > 0 ? 'text-green-500' :
        score < 0 ? 'text-red-500' : ''
    
    if (party === PARTY.Inaktiv){
        dynamic_class_name = ''
    }

    const party_emoji =
        party === PARTY.Re ? String.fromCodePoint(0x2663) :
            party === PARTY.Contra ? String.fromCodePoint(0x2666) : String.fromCodePoint(0x2666)
    
    const solo_border =
        // isSolo ? 'border rounded-lg border-black' : ''
        isSolo ? 'border-2 border-purple-600 rounded-lg p-1' : ''
    
    const lead_emoji = 
        isLead ? <span>{String.fromCodePoint(0x1F91A)}</span> : ''

    const party_emoji2 =
        // party === PARTY.Re ? <span className={`text-black ${solo_border}`} >{party_emoji}</span> :
        party === PARTY.Re ? <span className={`text-black`} >{party_emoji}</span> :
            party === PARTY.Contra ? <span className="text-red-500">{party_emoji}</span> : ''

    const dynamic_text = party === PARTY.Inaktiv ? '-' : score

    return (
        // <th className="py-3 px-6 text-lg text-center">
        <th className={`text-lg text-center whitespace-nowrap`}>
                <span className={`${solo_border}`}>
                    {lead_emoji}
                    {' '}
                    <span className={`${dynamic_class_name}`}>{dynamic_text}</span>
                    {' '}
                    {party_emoji2}
                </span>
        </th>
    )
}

export default GreenRedCell;