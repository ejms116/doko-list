import Link from "next/link";

export interface PlayerRowProps {
    id: number;
    name: string;
    joined: string;
  }

  
  const PlayerRow: React.FC<{ data: PlayerRowProps }> = ({ data }) => {

    return (
      
      <tr className="border-b border-gray-600 hover:bg-[#3B3B4D]">
        
          <td className="py-3 px-6 text-left">{data.id}</td>
          <td className="py-3 px-6 text-left">{data.name}</td>
          <td className="py-3 px-6 text-left whitespace-nowrap">{data.joined}</td>
      </tr>
      
      
    );
  };
  
  export default PlayerRow;