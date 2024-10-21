//import { useEffect, useState } from "react";

import GroupRow from "./group-row";
import { GroupRowProps } from "./group-row";

import Link from "next/link";
import { group } from "console";
import { Key } from "react";

// Example data
const rowData: GroupRowProps[] = [
  { name: 'Doko-Telgte', member: 'Yannick, Daniel, Hendrik, Matze, Erik', founded: new Date('2009-10-01'), session_count: 126 },
  { name: 'Test', member: 'Yannick, Daniel, Hendrik, Matze, Erik', founded: new Date('2009-10-01'), session_count: 8 },
];

const GroupsPage = async () => {

    const res = await fetch('http://localhost:8080/api/groups/all', {
      cache: 'no-store',
    });
  const data = await res.json();

  const groupRowData = data.map((group: any) => {
    return {
      ...group,
      member: group.players.map((p: { name: any; }) => p.name).join(', '),
      session_count: 5,
    };
  });

  return (
    <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">


   


      <h1 className="text-2xl font-bold mb-4 text-white">Alle Doko Gruppen</h1>
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