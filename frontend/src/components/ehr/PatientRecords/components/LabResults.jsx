import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Download, FlaskConical } from 'lucide-react';

const LabResults = ({ labData = [] }) => {
  const headers = useMemo(() => (labData.length > 0 ? Object.keys(labData[0]) : []), [labData]);

  const csvContent = useMemo(() => {
    const csvRows = [
      headers.join(','),
      ...labData.map(row =>
        headers.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}` ).join(',')
      )
    ];
    return csvRows.join('\n');
  }, [headers, labData]);

  const downloadCSV = () => {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lab_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-blue-600" />
          Lab Results
        </h2>
        <button
          onClick={downloadCSV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-sm flex items-center gap-1"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>
      {labData.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((key, index) => (
                <TableHead key={index}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {labData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((key, colIndex) => (
                  <TableCell key={colIndex}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-gray-500 text-sm text-center py-4">No lab results available.</p>
      )}
    </Card>
  );
};

export default LabResults;
