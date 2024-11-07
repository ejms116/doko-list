import Link from "next/link";

import GreenRedCell from "../../../../ui/green-red-cell";

import { SeatScore, SeatScores } from "../../../../models/general/Game";
import { PARTY, Party } from "../../../../models/general/Constants";
import { Game } from "../../../../models/general/Game";
import { GameType } from "../../../../models/general/Constants";

import PartyButton from "../../../../ui/PartyButton";

import { formatString } from "../../../../models/general/Util";

export interface GameRowProps {
    id: number;
    played: string;
    dealer: number;
    lead: number;
    soloPlayer: number;
    moreBock: boolean;
    bock: boolean;
    dokoGameType: GameType;
    winParty: Party;
    resultParty: Party;
    resultValue: number;
    ansageRe: string;
    ansageContra: string;
    sopoRe: string;
    sopoContra: string;
    reWin: boolean;
    seatScores: SeatScores;
}

export interface PlayerProps {
    score: number;
    party: Party;
    isLead: boolean;
    isSolo: boolean;
}



const GameRow: React.FC<{ game: GameRowProps, showGameDetail: any }> = ({ game, showGameDetail }) => {
    return (
        <tr key={game.id} className="border-b border-gray-600 hover:bg-[#3B3B4D]">
            <td className="py-3 px-6 text-center">{game.id}</td>
            <td className="py-3 px-6 text-center">
                <span className="bg-gray-500 text-white font-bold px-2 py-1 rounded-md">
                    {formatString(game.dokoGameType)}
                </span>
            </td>
            <td className="py-3 text-center">{game.moreBock ? String.fromCodePoint(0x1F416) : ''}</td>
            <td className="py-3 text-center">{game.bock ? String.fromCodePoint(0x1F356) : ''}</td>
            {Object.entries(game.seatScores).map(([seatNumber, seatScore]) => (
                <GreenRedCell key={seatNumber} score={seatScore.score} party={seatScore.party} isLead={seatNumber===game.lead.toString()} isSolo={seatNumber===game.soloPlayer.toString()} />
            ))}

            <td className="py-3 px-6 text-center">
                <PartyButton party={game.resultParty} win={game.winParty === game.resultParty} text={`${game.resultParty.slice(0, 2)} ${game.resultValue.toString()}`} />
            </td>
            <td className="py-3 px-6 text-center whitespace-nowrap">
                <PartyButton party={PARTY.Re} win={game.reWin} text={game.ansageRe} />
                <PartyButton party={PARTY.Contra} win={!game.reWin} text={game.ansageContra} />
            </td>
            <td className="py-3 px-6 text-center whitespace-nowrap">
                <PartyButton party={PARTY.Re} win={game.reWin} text={game.sopoRe} />
                <PartyButton party={PARTY.Contra} win={game.reWin} text={game.sopoContra} />
            </td>
            <td className="py-3 px-6 text-center">
                <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700" onClick={() => showGameDetail(game.id)}>
                    Edit Game
                </button>
            </td>
        </tr>
    );
};

export default GameRow;