import Link from "next/link";

import GreenRedCell from "../../../../ui/green-red-cell";

export interface GameRowProps {
    id: number;
    players: PlayerProps[];
    typ: string;
    winner: string;
    result: string;
    ansagen_re: string;
    ansagen_contra: string;
    sonderpunkte_re: string;
    sonderpunkte_contra: string;
    //setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

export interface PlayerProps {
    score: number;
    party: string;
}

const GameRow: React.FC<{ data: GameRowProps, setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ data, setOpen }) => {
    return (
        <tr key={data.id} className="border-b border-gray-600 hover:bg-[#3B3B4D]">
            <td className="py-3 px-6 text-center">{data.id}</td>
            {data.players.map((player, index) =>
                <GreenRedCell key={index} score={player.score} party={player.party} />
            )}

            <td className="py-3 px-6 text-center">
                <span className="bg-gray-500 text-white font-bold px-2 py-1 rounded-md">
                    {data.typ}
                </span>
            </td>
            <td className="py-3 px-6 text-center">
                <span className="bg-green-500 text-white font-bold px-2 py-1 rounded-md">
                    {data.winner}
                </span>
            </td>
            <td className="py-3 px-6 text-center">
                <span className="bg-green-500 text-white font-bold px-2 py-1 rounded-md">
                    {data.result}
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
                    {data.ansagen_contra}
                </span>
            </td>
            <td className="py-3 px-6 text-center">
                {data.sonderpunkte_re}
            </td>
            <td className="py-3 px-6 text-center">
                <span className="bg-green-500 text-white font-bold px-2 py-1 rounded-md">
                    {data.sonderpunkte_contra}
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