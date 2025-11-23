import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Pill, Download, Trash2, Edit2 } from 'lucide-react';
import predictiveAPI from '@/api/predictiveAPI';
import { Button } from '@/components/ui/button';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await predictiveAPI.getPrescriptions();
      setPrescriptions(res.data);
    } catch (err) {
      console.error('Failed to fetch prescriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await predictiveAPI.deletePrescription(id);
      setPrescriptions(prescriptions.filter(p => p.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const downloadCSV = () => {
    if (!prescriptions.length) return;
    const headers = Object.keys(prescriptions[0]).join(',');
    const rows = prescriptions.map(item => Object.values(item).join(',')).join('\n');
    const blob = new Blob([headers + '\n' + rows], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'prescriptions.csv';
    link.click();
  };

  return (
    <Card className="p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Pill className="text-purple-600" size={20} />
          Prescriptions
        </h2>
        {prescriptions.length > 0 && (
          <Button onClick={downloadCSV} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Download size={16} className="mr-1" /> Export CSV
          </Button>
        )}
      </div>
      {loading ? (
        <p className="text-center text-gray-500 py-4">Loading...</p>
      ) : prescriptions.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.date}</TableCell>
                <TableCell>{p.medication}</TableCell>
                <TableCell>{p.dosage}</TableCell>
                <TableCell>{p.frequency}</TableCell>
                <TableCell>{p.notes}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}>
                    <Trash2 className="text-red-500" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="text-blue-500" size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500 py-4">No prescriptions available.</p>
      )}
    </Card>
  );
};

export default Prescriptions;
