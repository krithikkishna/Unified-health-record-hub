import React, { useEffect, useState } from "react";
import styles from "@/styles/PatientManagement.module.scss";
import { GetAllPatients, deletePatient } from "@/api/fhirAPI";
import Button from "@/components/ui/Button"; 
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Loader2 } from "lucide-react";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data || []);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      setDeletingId(id);
      await deletePatient(id);
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader2 className="animate-spin" />
        <span>Loading Patients...</span>
      </div>
    );
  }

  if (!patients.length) {
    return <p className={styles.empty}>No patients found.</p>;
  }

  return (
    <div className={styles.patientManagement}>
      <h1>Patient Management</h1>
      <div className={styles.cards}>
        {patients.map((patient) => (
          <Card key={patient.id} className={styles.card}>
            <CardContent>
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>ID:</strong> {patient.id}</p>
              <Button
                variant="destructive"
                onClick={() => handleDelete(patient.id)}
                disabled={deletingId === patient.id}
              >
                {deletingId === patient.id ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientManagement;
