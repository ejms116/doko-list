import Link from "next/link";

export interface GroupRowProps {
    name: string;
    member: string[];
    founded: Date;
    session_count: number;
    leader: string;
  }

  
  const GroupRow: React.FC<{ data: GroupRowProps }> = ({ data }) => {

    const memberData = data.member.reduce(
        (totals, row) => ({
            result_string: totals.result_string + row + ', ' 
        }),
        { result_string: '' }
    )

    return (
      
      <tr className="border-b border-gray-600 hover:bg-[#3B3B4D]">
        
          <td className="py-3 px-6 text-left">
            
            {data.name}
            
          </td>
          <td className="py-3 px-6 text-left">{memberData.result_string}</td>
          <td className="py-3 px-6 text-left whitespace-nowrap">{data.founded.toDateString()}</td>
          <td className="py-3 px-6 text-left">{data.session_count}</td>
          <td className="py-3 px-6 text-left">{data.leader}</td>
          <td className="py-3 px-6 text-left">
            <Link href={'groups/1'}>
            <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
              Go to Group
            </button>
            </ Link>
          </td>
        
      </tr>
      
      
    );
  };
  
  export default GroupRow;