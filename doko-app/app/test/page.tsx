import React from 'react';
import TableRow from './bsp-row';


const DarkModeTablePage = () => {
  return (
    <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Styled Table in Dark Mode</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-[#2A2A3C] shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            <TableRow key="1" name="row.name" age="7" email="row.email" />
            <TableRow key="2" name="row.name" age="7" email="row.email" />
            <TableRow key="3" name="row.name" age="7" email="row.email" />
            <TableRow key="4" name="row.name" age="7" email="row.email" />
            <TableRow key="5" name="row.name" age="7" email="row.email" />
            <TableRow key="6" name="row.name" age="7" email="row.email" />
  
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DarkModeTablePage;
