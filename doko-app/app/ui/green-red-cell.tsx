import { PlayerProps } from "../groups/[groupId]/sessions/[sessionId]/game-row";

// interface GreenRedCellProps {
//     score: number; // The score prop to be passed in
// }

const GreenRedCell: React.FC<PlayerProps> = ({ score, party }) => {
    const dynamic_class_name = 
        score > 0 ? 'text-green-500' : 
        score < 0 ? 'text-red-500' : ''

    const party_emoji = 
        party == 'Re' ? String.fromCodePoint(0x2663) : 
        party == 'Contra' ? String.fromCodePoint(0x2666) : ''

    const party_emoji2 =
        party == 'Re' ? <span className="text-black">{party_emoji}</span> : 
        party == 'Contra' ? <span className="text-red-500">{party_emoji}</span> : ''

    const dynamic_text = party == '-' ? '-' : score

    return (
        <th className={`py-3 px-6 text-left`}>
            <span className={`${dynamic_class_name}`}>{dynamic_text}{' '}</span>
            {party_emoji2}
        </th>
    )
}

export default GreenRedCell;