import PlayerRow from "./player-row";
import { PlayerRowProps } from "./player-row";

import Link from "next/link";

// Example data
const rowData: PlayerRowProps[] = [
  { name: 'Yannick', groups: 'Doko-Telgte', joined: new Date('2009-10-01'), total_solos: 126, total_games: 126 },
  { name: 'Daniel', groups: 'Doko-Telgte', joined: new Date('2009-10-01'), total_solos: 126, total_games: 126 },
  { name: 'Hendrik', groups: 'Doko-Telgte', joined: new Date('2009-10-01'), total_solos: 126, total_games: 126 },
  { name: 'Matze', groups: 'Doko-Telgte', joined: new Date('2009-10-01'), total_solos: 126, total_games: 126 },
  { name: 'Erik', groups: 'Doko-Telgte', joined: new Date('2009-10-01'), total_solos: 126, total_games: 126 },
];

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Alle Doko Gruppen</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-[#2A2A3C] shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Groups</th>
              <th className="py-3 px-6 text-left">Joined</th>
              <th className="py-3 px-6 text-left">Total Solos</th>              
              <th className="py-3 px-6 text-left">Total Games</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            {rowData.map((item, index)=>
              <PlayerRow key={index} data={item} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}