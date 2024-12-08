'use client'

import { useState, useEffect } from "react";

import Link from "next/link";

import SessionRow from "./session-row";
import { SessionRowProps } from "./session-row";
import GreenRedCellSum from "../../ui/green-red-cell-sum";

import { Group } from "../../models/general/Group";
import { Session } from "../../models/general/Session";
import { SessionPlayer } from "../../models/composite/SessionPlayer";

import Modal from "../../ui/modal";
import Spinner from "@/app/ui/Spinner";

import useApiClient from "@/app/auth/useApiClient";
import { AuthContext } from "@/app/auth/AuthContext";
import { useContext } from "react";

const GroupPage = ({ params }: {
    params: { groupId: string }
}) => {

    const { authToken } = useContext(AuthContext);

    const apiClient = useApiClient();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>();

    const [groupData, setGroupData] = useState<Group>();
    const [sessionData, setSessionData] = useState<Session[]>();
    const [sessionRowProps, setSessionRowProps] = useState<SessionRowProps[]>();
    const [summedScores, setSummedScores] = useState<number[]>();

    const fetchData = async () => {
        if (!authToken) {
            return
        }
        try {
            setLoading(true);

            const groupRequest = apiClient.get(`/groups/${params.groupId}`);
            const sessionsRequest = apiClient.get(`/groups/${params.groupId}/sessions`);

            Promise.all([groupRequest, sessionsRequest])
                .then(([groupResponse, sessionsResponse]) => {
                    console.log(groupResponse);
                    console.log(sessionsResponse);
                    setGroupData(groupResponse.data);
                    setSessionData(sessionsResponse.data);
                })
                .catch((error) => {
                    //throw new Error('Failed to fetch data');
                })

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
    }, [params.groupId, authToken]);

    function makeSessionRowProps(sessionData: Session[], groupData: Group): SessionRowProps[] {
        return sessionData.map((session: Session) => {
            const playedDate = new Date(session.played);
    
            // Initialize scores array
            let scores = new Array(groupData.players.length).fill(0);
    
            // Map session players to their scores
            session.sessionPlayers.forEach((sp: SessionPlayer) => {
                const playerIndex = groupData.players.findIndex(player => player.id === sp.id.playerId);
                if (playerIndex !== -1) {
                    scores[playerIndex] = sp.score;
                }
            });
    
            return {
                id: session.id,
                played: playedDate.toLocaleString('de-DE', { timeZone: 'CET' }),
                scores: scores,
                location: session.location,
            };
        });
    }
    

    useEffect(() => {
        if (sessionData && groupData) {
            const sProps = makeSessionRowProps(sessionData, groupData);

            setSessionRowProps(sProps);

            let summedScores = new Array(groupData.players.length).fill(0);

            
            sProps.forEach((sessionRow: SessionRowProps) => {
                sessionRow.scores.forEach((score, index) => {
                    summedScores[index] += score;
                });
            })
                
            
            setSummedScores(summedScores);
        }

        
    }, [groupData, sessionData])




    if (loading || !groupData || !sessionRowProps || !summedScores) return <Spinner text="Lade Daten zu Gruppe..." />
    if (error || !groupData || !sessionRowProps || !summedScores) return <p>Error</p>

    return (
        <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">{groupData.name}</h2>
                {/* TODO: show button only if player is part of the group */}
                {true && (
                    <>
                        <Link href={`detail/${params.groupId}`}>
                            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                Gruppen Details anzeigen
                            </button>
                        </Link>
                        <Link href={`${params.groupId}/new`}>
                            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                Neuen Abend erstellen
                            </button>
                        </Link>

                    </>
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