import Link from "next/link";

export interface PlayerRowProps {
    name: string;
    groups: string;
    joined: Date;
    total_solos: number;
    total_games: number;
  }

  
  const PlayerRow: React.FC<{ data: PlayerRowProps }> = ({ data }) => {

    return (
      
      <tr className="border-b border-gray-600 hover:bg-[#3B3B4D]">
        
          <td className="py-3 px-6 text-left">{data.name}</td>
          <td className="py-3 px-6 text-left">{data.groups}</td>
          <td className="py-3 px-6 text-left whitespace-nowrap">{data.joined.toDateString()}</td>
          <td className="py-3 px-6 text-left">{data.total_solos}</td>
          <td className="py-3 px-6 text-left">{data.total_games}</td>
          <td className="py-3 px-6 text-left">
            <Link href={'groups/1'}>
            <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
              Edit Player
            </button>
            </ Link>
          </td>
        
      </tr>
      
      
    );
  };
  
  export default PlayerRow;