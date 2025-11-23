import React, { useEffect, useState, useCallback } from "react";
import styles from "@/styles/SystemHealth.module.scss";
import { Card, CardContent } from "@/components/ui/card";
import { FaServer, FaHeartbeat, FaDatabase, FaNetworkWired } from "react-icons/fa";
import { getSystemHealth } from "@/api/systemAPI";

const SystemHealth = () => {
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState(null);

  const fetchHealthStatus = useCallback(async () => {
    try {
      const res = await getSystemHealth();
      setHealthData(res?.data || null);
      setError(null);
    } catch (err) {
      console.error("Error fetching system health:", err);
      setError("Unable to fetch system health data.");
      setHealthData(null);
    }
  }, []);

  useEffect(() => {
    fetchHealthStatus();
    const interval = setInterval(fetchHealthStatus, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, [fetchHealthStatus]);

  const formatMemory = (mb) => `${(mb / 1024).toFixed(2)} GB`;
  const formatLatency = (ms) => `${ms?.toFixed(1)} ms`;
  const formatCpu = (cpu) => `${cpu?.toFixed(1)}%`;

  return (
    <section className={styles.healthWrapper} aria-live="polite">
      <h1 className="text-xl font-bold mb-4">System Health Overview</h1>

      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : !healthData ? (
        <p className="text-gray-500 text-center">Loading system health...</p>
      ) : (
        <div className={`${styles.grid || ""} grid grid-cols-1 sm:grid-cols-2 gap-4`}>
          <Card className={styles.card}>
            <CardContent className="flex flex-col items-center text-center">
              <FaHeartbeat size={30} className="mb-1" />
              <h3 className="font-semibold">Status</h3>
              <p>{healthData.status || "N/A"}</p>
            </CardContent>
          </Card>

          <Card className={styles.card}>
            <CardContent className="flex flex-col items-center text-center">
              <FaServer size={30} className="mb-1" />
              <h3 className="font-semibold">CPU Load</h3>
              <p>{healthData.cpuLoad != null ? formatCpu(healthData.cpuLoad) : "N/A"}</p>
            </CardContent>
          </Card>

          <Card className={styles.card}>
            <CardContent className="flex flex-col items-center text-center">
              <FaDatabase size={30} className="mb-1" />
              <h3 className="font-semibold">Memory Usage</h3>
              <p>{healthData.memoryUsage != null ? formatMemory(healthData.memoryUsage) : "N/A"}</p>
            </CardContent>
          </Card>

          <Card className={styles.card}>
            <CardContent className="flex flex-col items-center text-center">
              <FaNetworkWired size={30} className="mb-1" />
              <h3 className="font-semibold">Network Latency</h3>
              <p>{healthData.latency != null ? formatLatency(healthData.latency) : "N/A"}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
};

export default SystemHealth;
