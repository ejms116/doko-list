'use client'

import { useState, useEffect } from "react";

import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SessionRow from "./session-row";
import { SessionRowProps } from "./session-row";
import GreenRedCellSum from "../../ui/green-red-cell-sum";

import { Group } from "../../models/general/Group";
import { Session } from "../../models/general/Session";
import { SessionPlayer } from "../../models/composite/SessionPlayer";

import Modal from "../../ui/modal";
import Spinner from "@/app/ui/Spinner";


const apiBaseUrl =
    typeof window === "undefined"  // Check if running on the server
        ? process.env.INTERNAL_API_BASE_URL  // Use Docker internal URL for server components
        : process.env.NEXT_PUBLIC_API_BASE_URL;

const GroupPage = ({ params }: {
    params: { groupId: string }
}) => {

    const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
    console.log(user)
    console.log(typeof(user?.id))

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    const [groupData, setGroupData] = useState<Group>();
    const [sessionData, setSessionData] = useState<Session[]>();
    const [sessionRowProps, setSessionRowProps] = useState<SessionRowProps[]>();
    const [summedScores, setSummedScores] = useState<number[]>();

    const fetchData = async () => {
        try {
            setLoading(true);

            const [groupRes, sessionRes] = await Promise.all([
                fetch(`${apiBaseUrl}/groups/${params.groupId}`, { cache: 'no-store' }),
                fetch(`${apiBaseUrl}/groups/${params.groupId}/sessions`, { cache: 'no-store' })
            ]);

            if (!groupRes.ok || !sessionRes.ok) {
                throw new Error('Failed to fetch data');
            }

            const [groupResJson, sessionResJson] = await Promise.all([
                groupRes.json(),
                sessionRes.json()
            ])

            setGroupData(groupResJson);
            setSessionData(sessionResJson);


        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err);
            }
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [params.groupId]);

    useEffect(() => {
        if (sessionData && groupData) {
            setSessionRowProps(sessionData.map((session: Session) => {
                const playedDate = new Date(session.played);

                let scores = new Array(groupData.players.length).fill(0);

                session.sessionPlayers.map((sp: SessionPlayer) => {
                    scores[groupData.players.findIndex(player => player.id === sp.id.playerId)] = sp.score;
                })

                return {
                    id: session.id,
                    played: playedDate.toLocaleString('de-De', { timeZone: 'CET' }),
                    scores: scores,
                    location: session.location,
                };
            }));

            let summedScores = new Array(groupData.players.length).fill(0);

            if (sessionRowProps) {
                sessionRowProps.forEach((sessionRow: SessionRowProps) => {
                    sessionRow.scores.forEach((score, index) => {
                        summedScores[index] += score;
                    });
                })

            }
            setSummedScores(summedScores);
        }


    }, [groupData, sessionData])


    // const groupRes = await fetch(`${apiBaseUrl}/groups/${params.groupId}`, {
    //     cache: 'no-store',
    // });

    // const rawGroupData = await groupRes.json();

    // const groupData: Group = {
    //     ...rawGroupData,
    //     founded: new Date(rawGroupData.founded)

    // };


    // const sessions_res = await fetch(`${apiBaseUrl}/groups/${params.groupId}/sessions`, {
    //     cache: 'no-store',
    // });
    // const sessions: Session[] = await sessions_res.json();


    // const sessionRowProps: SessionRowProps[] = sessions.map((session: Session) => {
    //     const playedDate = new Date(session.played);

    //     let scores = new Array(groupData.players.length).fill(0);

    //     session.sessionPlayers.map((sp: SessionPlayer) => {
    //         scores[groupData.players.findIndex(player => player.id === sp.id.playerId)] = sp.score;
    //     })

    //     return {
    //         id: session.id,
    //         played: playedDate.toLocaleString('de-De', { timeZone: 'CET' }),
    //         scores: scores,
    //         location: session.location,
    //     };
    // });

    // let summedScores = new Array(groupData.players.length).fill(0);

    // sessionRowProps.forEach((sessionRow: SessionRowProps) => {
    //     sessionRow.scores.forEach((score, index) => {
    //         summedScores[index] += score;
    //     });
    // });

    // const formattedFounded = groupData.founded.toLocaleString();


    if (loading) return <Spinner text="Lade Daten zu Gruppe..." />
    if (error || !groupData || !sessionRowProps || !summedScores) return <p>Error</p>

    return (
        <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">{groupData.name}</h2>
                {isAuthenticated && (
                    <Link href={`${params.groupId}/new`}>
                        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Neuen Abend erstellen
                        </button>
                    </Link>
                )}
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