import React from "react";

export const Table = ({ headers = [], children }) => {
  return (
    <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow">
      <thead>
        <tr className="bg-blue-600 text-white">
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-3 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export const TableRow = ({ children }) => <tr className="hover:bg-gray-100">{children}</tr>;
export const TableCell = ({ children }) => <td className="px-4 py-2 border-t border-gray-200">{children}</td>;