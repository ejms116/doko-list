import Link from "next/link";

import GreenRedCell from "../../../../ui/green-red-cell";

import { SeatScore, SeatScores } from "../../../../models/general/Game";
import { PARTY, Party } from "../../../../models/general/Constants";
import { Game } from "../../../../models/general/Game";
import { GameType } from "../../../../models/general/Constants";

import PartyButton from "../../../../ui/PartyButton";

export interface GameRowProps {
    id: number;
    played: string;
    dealer: number;
    lead: number;
    moreBock: boolean;
    bock: boolean;
    dokoGameType: GameType;
    winParty: Party;
    resultParty: Party;
    resultValue: number;
    ansageRe: boolean;
    ansageReVorab: boolean;
    ansageContra: boolean;
    anasgeContraVorab: boolean;
    weitereAnsagenParty: Party;
    ansage: number;
    ansageVorab: number;

    seatScores: SeatScores;
}

export interface PlayerProps {
    score: number;
    party: Party;
}

const GameRow: React.FC<{ game: GameRowProps, setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ game, setOpen }) => {
    return (
        <tr key={game.id} className="border-b border-gray-600 hover:bg-[#3B3B4D]">
            <td className="py-3 px-6 text-center">{game.id}</td>
            {Object.entries(game.seatScores).map(([seatNumber, seatScore]) => (
                <GreenRedCell key={seatNumber} score={seatScore.score} party={seatScore.party} />
            ))}

            <td className="py-3 px-6 text-center">
                <span className="bg-gray-500 text-white font-bold px-2 py-1 rounded-md">
                    {game.dokoGameType}
                </span>
            </td>
            <td className="py-3 px-6 text-center">
                <PartyButton party={game.winParty} />
            </td>
            <td className="py-3 px-6 text-center">
                <PartyButton party={game.resultParty} />
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