import Link from "next/link";

import GreenRedCellSum from "../../ui/green-red-cell-sum";


export interface SessionRowProps {
    date: Date;
    scores: number[];
    location: string;
  }
  
  const SessionRow: React.FC<{ data: SessionRowProps }> = ({ data }) => {
    return (
      <tr className="border-b border-gray-600 hover:bg-[#3B3B4D]">
        <td className="py-3 px-6 text-left whitespace-nowrap">{data.date.toDateString()}</td>
				<GreenRedCellSum score={data.scores[0]} /> 
				<GreenRedCellSum score={data.scores[1]} /> 
				<GreenRedCellSum score={data.scores[2]} /> 
				<GreenRedCellSum score={data.scores[3]} /> 
				<GreenRedCellSum score={data.scores[4]} /> 

        <td className="py-3 px-6 text-left">{data.location}</td>
        <td className="py-3 px-6 text-left">
          <Link href={'1/sessions/1'}>
            <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
              Show Games
            </button>
          </Link>
        </td>
      </tr>
    );
  };
  
  export default SessionRow;