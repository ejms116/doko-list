import Link from "next/link";

import GreenRedCell from "../../../../ui/green-red-cell";

import { SeatScore, SeatScores } from "../../../../models/general/Game";
import { Party } from "../../../../models/general/Constants";

export interface GameRowProps {
    id: number;
    dealer: number;
    lead: number;
    played: string;
    seatScores: SeatScores;
}

export interface PlayerProps {
    score: number;
    party: Party;
}

const GameRow: React.FC<{ data: GameRowProps, setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ data, setOpen }) => {
    return (
        <tr key={data.id} className="border-b border-gray-600 hover:bg-[#3B3B4D]">
            <td className="py-3 px-6 text-center">{data.id}</td>
            {Object.entries(data.seatScores).map(([seatNumber, seatScore]) => (
                <GreenRedCell key={seatNumber} score={seatScore.score} party={seatScore.party} />
            ))}

            <td className="py-3 px-6 text-center">
                <span className="bg-gray-500 text-white font-bold px-2 py-1 rounded-md">
                    typ
                </span>
            </td>
            <td className="py-3 px-6 text-center">
                <span className="bg-green-500 text-white font-bold px-2 py-1 rounded-md">
                    winner
                </span>
            </td>
            <td className="py-3 px-6 text-center">
                <span className="bg-green-500 text-white font-bold px-2 py-1 rounded-md">
                    result
                </span>
                </td>
            <td className="py-3 px-6 text-center">
                <span className="bg-green-500 text-white font-bold px-2 py-1 ml-2 rounded-md">
                    90V
                </span>
                <span className="bg-green-500 text-white font-bold px-2 py-1 ml-2 rounded-md">
                   60
                </span>
            </td>
            <td className="py-3 px-6 text-center">
                <span className="bg-red-500 text-white font-bold px-2 py-1 rounded-md">
                    Ans Contra
                    
                </span>
            </td>
            <td className="py-3 px-6 text-center">
                Sopo Re
            </td>
            <td className="py-3 px-6 text-center">
                <span className="bg-green-500 text-white font-bold px-2 py-1 rounded-md">
                    Sopo Contra
                </span>
            </td>
            <td className="py-3 px-6 text-center">
                    <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700" onClick={() => setOpen(true)}>

                        Edit Game
                    </button> 
            </td>
        </tr>
    );
};

export default GameRow;