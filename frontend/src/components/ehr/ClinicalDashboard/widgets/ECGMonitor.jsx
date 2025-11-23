// src/components/records/ECGMonitor.jsx
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";
import styles from "./styles.module.scss";

const ECGMonitor = () => {
  const [data, setData] = useState([]);
  const [recording, setRecording] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("patient-001");
  const socketRef = useRef(null);

  const patients = ["patient-001", "patient-002", "patient-003"];

  useEffect(() => {
    if (recording) {
      socketRef.current = new WebSocket("ws://localhost:4000");

      socketRef.current.onopen = () => {
        console.log("WebSocket connected");
        socketRef.current.send(JSON.stringify({ type: "subscribe", patientId: selectedPatient }));
      };

      socketRef.current.onmessage = (event) => {
        const { time, value } = JSON.parse(event.data);
        setData((prev) => [...prev.slice(-19), { time, value }]);
      };

      socketRef.current.onerror = (err) => console.error("WebSocket error:", err);
      socketRef.current.onclose = () => console.log("WebSocket disconnected");
    }

    return () => {
      socketRef.current?.close();
    };
  }, [recording, selectedPatient]);

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Time,ECG Value", ...data.map((d) => `${d.time},${d.value}`)].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `ecg_data_${selectedPatient}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className={styles.card}>
      <CardContent>
        <div className={styles.header}>
          <h2 className={styles.title}>📉 ECG Monitor</h2>

          <div className="flex gap-4 items-center mb-4">
            <label className="text-sm font-medium">Select Patient:</label>
            <select
              className="border px-3 py-1 rounded"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              disabled={recording}
            >
              {patients.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.controls}>
            <Button variant="default" onClick={() => setRecording(!recording)}>
              {recording ? "Stop" : "Start"}
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={data.length === 0}>
              <Download className="mr-1 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis domain={[50, 120]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ECGMonitor;
