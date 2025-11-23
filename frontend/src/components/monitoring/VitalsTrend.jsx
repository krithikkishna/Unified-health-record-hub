import React from "react";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button"; // Changed to default import
import { Download } from "lucide-react";

const VitalsTrend = ({ data = [], isLoading = false }) => {
  const downloadCSV = () => {
    try {
      if (!data?.length) {
        console.warn("No data available for download");
        return;
      }

      const headers = Object.keys(data[0]).join(",");
      const rows = data.map(row => 
        Object.values(row).map(value => 
          typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
        ).join(",")
      ).join("\n");
      
      const blob = new Blob([headers + "\n" + rows], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `vitals_trend_${new Date().toISOString().slice(0,10)}.csv`);
      link.style.visibility = "hidden";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  // Format data for better chart display
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(),
    bloodPressure: item.bloodPressure ? parseInt(item.bloodPressure.split('/')[0]) : null
  }));

  return (
    <Card className="p-4 shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Vitals Trend</h3>
        {data.length > 0 && (
          <Button
            onClick={downloadCSV}
            variant="primary"
            size="sm"
            className="flex items-center gap-1"
            aria-label="Export data as CSV"
          >
            <Download size={16} />
            Export CSV
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Loading vitals data...</p>
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500 text-sm py-4">No vitals data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="heartRate" 
              stroke="#8884d8" 
              name="Heart Rate (bpm)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="bloodPressure" 
              stroke="#82ca9d" 
              name="Blood Pressure (mmHg)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="spo2" 
              stroke="#ff7300" 
              name="SpO2 (%)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#e91e63" 
              name="Temperature (°F)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

VitalsTrend.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      heartRate: PropTypes.number,
      bloodPressure: PropTypes.string,
      spo2: PropTypes.number,
      temperature: PropTypes.number
    })
  ),
  isLoading: PropTypes.bool
};

export default VitalsTrend;