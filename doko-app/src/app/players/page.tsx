'use client'



import PlayerRow from "./player-row";
import { PlayerRowProps } from "./player-row";

import { useState, useEffect } from "react";

import Link from "next/link";
import Spinner from "@/app/ui/Spinner";
import Message from "../ui/Message";
import useApiClient from "@/app/auth/useApiClient";
import { AuthContext } from "@/app/auth/AuthContext";
import { useContext } from "react";

const PlayerPage = () => {
  const [playerRowProps, setPlayerRowProps] = useState<PlayerRowProps[]>();

  const [loading, setLoading] = useState<boolean>(false);
  const { authToken } = useContext(AuthContext);
  const apiClient = useApiClient();

  const fetchData = async () => {
    if (!authToken) {
      return
    }
    try {
      setLoading(true);

      const playerRequest = apiClient.get(`/players/all`);

      Promise.all([playerRequest])
        .then(([playerResponse]) => {
          setPlayerRowProps(playerResponse.data.map((player) => {
            const joinDate = new Date(player.joined);
            return {
              id: player.id,
              name: player.name,
              joined: joinDate.toLocaleString('de-De', { timeZone: 'CET' }),
            }
          }))



        })
        .catch((error) => {
          //throw new Error('Failed to fetch data');
        })

    } catch (err: unknown) {
      if (err instanceof Error) {
        //setError(err);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [authToken]);

  if (!authToken) return <Message text="Bitte anmelden..." />
  if (loading || !playerRowProps) return <Spinner text="Lade Spieler..." />

  return (
    <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
      <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-300">Alle Spieler</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-[#2A2A3C] shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Id</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Beigetreten</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            {playerRowProps.map((item, index) =>
              <PlayerRow key={index} data={item} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayerPage;