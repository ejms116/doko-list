'use client'
import { useState, useEffect } from "react";
import GroupRow from "./group-row";
import { GroupRowProps } from "./group-row";
import Link from "next/link";
import Spinner from "../ui/Spinner";

const apiBaseUrl =
  typeof window === "undefined"  // Check if running on the server
    ? process.env.INTERNAL_API_BASE_URL  // Use Docker internal URL for server components
    : process.env.NEXT_PUBLIC_API_BASE_URL;

const GroupsPage = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [groupRowData, setGroupRowData] = useState<GroupRowProps[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${apiBaseUrl}/groups/all`, {
        cache: 'no-store',
      });

      const data = await res.json();

      setGroupRowData(data.map((group: any) => {
        return {
          ...group,
          founded: new Date(group.founded),
          member: group.players.map((p: { name: any; }) => p.name).join(', '),
          session_count: 5,
        };
      }));

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
    fetchData()
  }, [])


  




  if (loading) return <Spinner text="Lade Gruppen..." />
  if (error) return <p>Error</p>

  return (
    <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
				<div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
					<h2 className="text-2xl font-semibold text-gray-300">Alle Doppelkopf Gruppen</h2>
          <Link href={`/groups/new`}>
						<button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
							Neue Gruppe anlegen
						</button>
					</Link>
				</div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-[#2A2A3C] shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Mitglieder</th>
              <th className="py-3 px-6 text-left">Gegründet</th>
              <th className="py-3 px-6 text-left">Anzahl Sessions</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            {groupRowData.map((item: GroupRowProps) =>
              <GroupRow key={item.id} data={item} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroupsPage;