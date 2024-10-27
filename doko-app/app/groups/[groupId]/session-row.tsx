'use client'

import Link from "next/link";
import { useParams } from "next/navigation";

import GreenRedCellSum from "../../ui/green-red-cell-sum";


export interface SessionRowProps {
  id: number;
  played: string;
  scores: number[];
  location: string;
}

interface Params {
  groupId: string;
  sessionId: string;
}

const SessionRow: React.FC<{ data: SessionRowProps }> = ({ data }) => {
  const params = useParams();  

  return (
    <tr key={data.id} className="border-b border-gray-600 hover:bg-[#3B3B4D]">
      <td className="py-3 px-6 text-left whitespace-nowrap">{data.played}</td>
      {data.scores.map((score, index) => {
        return <GreenRedCellSum key={index} score={score} />
      })}



      <td className="py-3 px-6 text-left">{data.location}</td>
      <td className="py-3 px-6 text-left">
        <Link href={`${params.groupId}/sessions/${data.id}`}>
          <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
            Spiele anzeigen
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default SessionRow;