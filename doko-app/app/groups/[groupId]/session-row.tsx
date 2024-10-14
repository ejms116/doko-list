import GreenRedCell from "../../ui/green-red-cell";

export interface SessionRowProps {
    date: Date;
    scores: number[];
    location: string;
  }
  
  const SessionRow: React.FC<{ data: SessionRowProps }> = ({ data }) => {
    return (
      <tr className="border-b border-gray-600 hover:bg-[#3B3B4D]">
        <td className="py-3 px-6 text-left whitespace-nowrap">{data.date.toDateString()}</td>
				<GreenRedCell score={data.scores[0]} /> 
				<GreenRedCell score={data.scores[1]} /> 
				<GreenRedCell score={data.scores[2]} /> 
				<GreenRedCell score={data.scores[3]} /> 
				<GreenRedCell score={data.scores[4]} /> 

        <td className="py-3 px-6 text-left">{data.location}</td>
        <td className="py-3 px-6 text-left">
          <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
            Edit
          </button>
        </td>
      </tr>
    );
  };
  
  export default SessionRow;