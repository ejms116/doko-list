import GroupRow from "./group-row";
import { GroupRowProps } from "./group-row";

// Example data
const rowData: GroupRowProps[] = [
  { name: 'Doko-Telgte', member: ['Yannick', 'Daniel', 'Hendrik', 'Matze', 'Erik'], founded: new Date('2009-10-01'), session_count: 126, leader: 'Erik' },
  { name: 'Test', member: ['Yannick', 'Daniel', 'Hendrik', 'Matze', 'Erik'], founded: new Date('2009-10-01'), session_count: 8, leader: 'New York' },
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
              <th className="py-3 px-6 text-left">Mitglieder</th>
              <th className="py-3 px-6 text-left">Gegründet</th>
              <th className="py-3 px-6 text-left">Anzahl Sessions</th>
              <th className="py-3 px-6 text-left">Bester Spieler</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            {rowData.map((item, index)=>
              <GroupRow key={index} data={item} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}