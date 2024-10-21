import Link from "next/link";

export interface GroupRowProps {
    id: number;
    name: string;
    member: string;
    founded: Date;
    session_count: number;
  }

  
  const GroupRow: React.FC<{ data: GroupRowProps }> = ({ data }) => {
  

    return (
      
      <tr className="border-b border-gray-600 hover:bg-[#3B3B4D]">
        
          <td className="py-3 px-6 text-left">
            
            {data.name}
            
          </td>
          <td className="py-3 px-6 text-left">{data.member}</td>
          <td className="py-3 px-6 text-left whitespace-nowrap">{data.founded}</td>
          <td className="py-3 px-6 text-left">{data.session_count}</td>
          <td className="py-3 px-6 text-left">
            <Link href={`groups/${data.id}`}>
            <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
              Go to Group
            </button>
            </ Link>
          </td>
        
      </tr>
      
      
    );
  };
  
  export default GroupRow;