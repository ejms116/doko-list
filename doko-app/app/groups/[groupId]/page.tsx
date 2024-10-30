import Link from "next/link";

import SessionRow from "./session-row";
import { SessionRowProps } from "./session-row";
import GreenRedCellSum from "../../ui/green-red-cell-sum";

import { Group } from "../../models/general/Group";
import { Session } from "../../models/general/Session";
import { SessionPlayer } from "../../models/composite/SessionPlayer";

import Modal from "../../ui/modal";


const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const GroupPage = async ({ params }: {
    params: { groupId: string }
}) => {

    const groupRes = await fetch(`${apiBaseUrl}/groups/${params.groupId}`, {
        cache: 'no-store',
    });
    const rawGroupData = await groupRes.json();

    const groupData: Group = {
        ...rawGroupData,
        founded: new Date(rawGroupData.founded)

    };

    // console.log(groupData);

    const sessions_res = await fetch(`${apiBaseUrl}/groups/${params.groupId}/sessions`, {
        cache: 'no-store',
    });
    const sessions: Session[] = await sessions_res.json();
    // console.log(sessions);

    const sessionRowProps: SessionRowProps[] = sessions.map((session: Session) => {
        const playedDate = new Date(session.played);

        let scores = new Array(groupData.players.length).fill(0);

        session.sessionPlayers.map((sp: SessionPlayer) => {
            scores[groupData.players.findIndex(player => player.id === sp.id.playerId)] = sp.score;
        })

        return {
            id: session.id,
            played: playedDate.toLocaleString(),
            scores: scores,
            location: session.location,
        };
    });

    let summedScores = new Array(groupData.players.length).fill(0);

    sessionRowProps.forEach((sessionRow: SessionRowProps) => {
        sessionRow.scores.forEach((score, index) => {
            summedScores[index] += score;
        });
    });

    const formattedFounded = groupData.founded.toLocaleString();

    return (
        <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">{groupData.name}</h2>
                <Link href={`${params.groupId}/new`}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Neuen Abend erstellen
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-[#2A2A3C] shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left"></th>
                            {groupData.players.map((p) => {
                                return <th key={p.id} className="py-3 px-6 text-center">{p.name}</th>;
                            })}
                            <th className="py-3 px-6 text-left"></th>
                            <th className="py-3 px-6 text-left"></th>
                        </tr>

                        <tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Datum</th>

                            {summedScores.map((score, index) => {
                                return <GreenRedCellSum key={index} score={score} />
                            })}

                            <th className="py-3 px-6 text-left">Ort</th>
                            <th className="py-3 px-6 text-left">Action</th>
                        </tr>

                    </thead>

                    <tbody className="text-gray-300 text-sm">
                        {sessionRowProps.map((props) => {
                            return (
                                <SessionRow key={props.id} groupId={groupData.id} data={props} />
                            )
                        })}

                    </tbody>
                </table>
            </div>
            
            

        </div>
    );
}

export default GroupPage;