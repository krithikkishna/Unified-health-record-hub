import React, { useEffect, useState } from "react";
import styles from "@/styles/MedicalHistory.module.scss";
import { getMedicalHistory } from "@/api/fhirAPI"; // ✅ Corrected casing
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { format } from "date-fns"; // ✅ Date formatting

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Optional filtering

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getMedicalHistory();
        setHistory(data || []);
      } catch (error) {
        console.error("Error fetching medical history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter((entry) =>
    entry.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={styles.loader} role="status" aria-label="Loading medical history">
        <Loader2 className="animate-spin" />
        <span>Loading Medical History...</span>
      </div>
    );
  }

  if (!filteredHistory.length) {
    return <p className={styles.empty}>No medical history found.</p>;
  }

  return (
    <div className={styles.medicalHistory}>
      <h1 tabIndex={0}>Medical History</h1>

      <input
        type="text"
        placeholder="Search by condition..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search medical history"
      />

      <div className={styles.cards}>
        {filteredHistory.map((entry, index) => (
          <Card key={index} className={styles.card}>
            <CardContent>
              <p><strong>Condition:</strong> {entry.condition}</p>
              <p><strong>Diagnosis Date:</strong> {format(new Date(entry.date), "PPP")}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`${styles.statusTag} ${styles[entry.status.toLowerCase()]}`}>
                  {entry.status}
                </span>
              </p>
              {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory;
