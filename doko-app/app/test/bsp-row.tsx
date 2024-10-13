// components/TableRow.tsx

import React from 'react';

interface TableRowProps {
  name: string;
  age: number;
  email: string;
}

const TableRow: React.FC<TableRowProps> = ({ name, age, email }) => {
  return (
    <tr className="border-b border-gray-600 hover:bg-[#3B3B4D]">
      <td className="py-3 px-6 text-left whitespace-nowrap">{name}</td>
      <td className="py-3 px-6 text-left">{age}</td>
      <td className="py-3 px-6 text-left">{email}</td>
      <td className="py-3 px-6 text-left">
        <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
          Edit
        </button>
      </td>
    </tr>
  );
};

export default TableRow;