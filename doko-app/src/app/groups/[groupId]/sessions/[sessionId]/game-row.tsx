import Link from "next/link";

import GreenRedCell from "../../../../ui/green-red-cell";

import { SeatScore, SeatScores, Sopo } from "../../../../models/general/Game";
import { PARTY, Party } from "../../../../models/general/Constants";
import { Game } from "../../../../models/general/Game";
import { GameType } from "../../../../models/general/Constants";

import PartyButton from "../../../../ui/PartyButton";

import { formatString } from "../../../../models/general/Util";


export interface GameRowProps {
    id: number;
    displayNumber: string;
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

    sonderpunkte: Sopo[];
}

export interface PlayerProps {
    score: number;
    party: Party;
    isLead: boolean;
    isSolo: boolean;
}



const GameRow: React.FC<{ game: GameRowProps, showGameDetail: any }> = ({ game, showGameDetail }) => {
    let sopoRe = 0;
    let sopoContra = 0;

    game.sonderpunkte.map((sopo: Sopo) => {
        if (sopo.dokoParty === PARTY.Re) {
            sopoRe++;
        } else if (sopo.dokoParty === PARTY.Contra) {
            sopoContra++;
        }
    })

    return (
        <tr key={game.id} className="border-b border-gray-600 hover:bg-[#3B3B4D] text-sm leading-none h-0">
            <td className="px-1 text-center">{game.displayNumber}</td>
            <td className="px-1 text-center whitespace-nowrap">
                <span className="bg-gray-500 text-white font-bold px-1 py-1 rounded-md">
                    {formatString(game.dokoGameType).slice(0,1)}
                </span>
            </td>
            <td className="text-center">{game.moreBock ? String.fromCodePoint(0x1F49E) : ''}</td>
            <td className="text-center">{game.bock ? String.fromCodePoint(0x1F410) : ''}</td>
            {Object.entries(game.seatScores).map(([seatNumber, seatScore]) => (
                <GreenRedCell
                    key={seatNumber}
                    score={seatScore.score}
                    party={seatScore.party}
                    isLead={seatNumber === game.lead.toString()}
                    isSolo={seatNumber === game.soloPlayer.toString()}
                />
            ))}
            <td className="px-1 text-center">
                <PartyButton
                    party={game.resultParty}
                    win={game.winParty === game.resultParty}
                    text={`${game.resultParty.slice(0, 2)} ${game.resultValue.toString()}`}
                />
            </td>
            <td className="px-1 text-center whitespace-nowrap">
                <PartyButton party={PARTY.Re} win={game.reWin} text={game.ansageRe} />
                <PartyButton party={PARTY.Contra} win={!game.reWin} text={game.ansageContra} />
            </td>
            <td className="px-1 text-center whitespace-nowrap">
                <PartyButton party={PARTY.Re} win={game.reWin} text={sopoRe.toString()} size={30} />
                <PartyButton party={PARTY.Contra} win={!game.reWin} text={sopoContra.toString()} size={30} />
            </td>
            <td className="px-1 text-center">
                <button
                    className="bg-blue-600 text-white px-1 py-1 rounded hover:bg-blue-700"
                    onClick={() => showGameDetail(game.id)}
                >
                    ändern
                </button>
            </td>
        </tr>

    );
};

export default GameRow;