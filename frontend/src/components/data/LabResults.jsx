import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import apiClient from "@/api/apiClient"; // Optional backend call

const LabResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Uncomment for real API call
        // const res = await apiClient.get("/patient/lab-results");
        // setResults(res.data);

        // Simulated fallback data
        setTimeout(() => {
          setResults([
            { name: "Glucose", value: "98", unit: "mg/dL", date: "2025-04-07" },
            { name: "Creatinine", value: "1.2", unit: "mg/dL", date: "2025-04-06" },
            { name: "Hemoglobin", value: "13.5", unit: "g/dL", date: "2025-04-06" },
          ]);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching lab results:", err);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const getAbnormality = (name, value) => {
    const num = parseFloat(value);
    const ranges = {
      Glucose: { low: 70, high: 110 },
      Creatinine: { low: 0.6, high: 1.3 },
      Hemoglobin: { low: 13.0, high: 17.5 },
    };

    if (!ranges[name]) return null;
    if (num < ranges[name].low) return "Low";
    if (num > ranges[name].high) return "High";
    return null;
  };

  const sortedResults = [...results].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filteredResults = sortedResults.filter((r) =>
    r.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card className="mt-4 p-4">
      <h3 className="text-lg font-semibold mb-3">Recent Lab Results</h3>

      <input
        type="text"
        placeholder="Filter by test name..."
        className="mb-3 p-2 border rounded w-full text-sm"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader className="animate-spin w-4 h-4" />
          Loading lab data...
        </div>
      ) : filteredResults.length === 0 ? (
        <p className="text-gray-600">No matching lab results found.</p>
      ) : (
        <CardContent>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2">Test</th>
                <th className="text-left p-2">Value</th>
                <th className="text-left p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, idx) => {
                const abnormal = getAbnormality(result.name, result.value);
                const valueClass =
                  abnormal === "High"
                    ? "text-red-600 font-semibold"
                    : abnormal === "Low"
                    ? "text-yellow-600 font-semibold"
                    : "";

                return (
                  <tr key={`${result.name}-${result.date}`} className="border-t">
                    <td className="p-2">{result.name}</td>
                    <td className={`p-2 ${valueClass}`}>
                      {result.value} {result.unit}
                      {abnormal && (
                        <span className="ml-1 text-xs">({abnormal})</span>
                      )}
                    </td>
                    <td className="p-2">
                      {new Date(result.date).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      )}
    </Card>
  );
};

export default LabResults;
