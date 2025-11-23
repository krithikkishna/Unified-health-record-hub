import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { predictDiabetesRisk } from "@/api/predictiveAPI";
import { toast } from "react-toastify"; // optional, but great for error feedback

const DiabetesRisk = () => {
  const [biomarkers, setBiomarkers] = useState({
    glucose: "",
    insulin: "",
    bmi: "",
    age: "",
    bloodPressure: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setBiomarkers({ ...biomarkers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const prediction = await predictDiabetesRisk(biomarkers, { patientId: "123" });
      setResult(prediction);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Diabetes Risk Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(biomarkers).map((key) => (
          <div key={key}>
            <label className="block mb-1 capitalize">{key}</label>
            <input
              type="number"
              name={key}
              value={biomarkers[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
        ))}
        <Button type="submit" loading={loading}>
          {loading ? "Predicting..." : "Predict Diabetes Risk"}
        </Button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-100 rounded shadow">
          <h4 className="font-semibold mb-2">Prediction Result:</h4>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DiabetesRisk;
