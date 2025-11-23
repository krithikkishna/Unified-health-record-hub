import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button"; // ✅ CORRECT
import { AlertTriangle, CheckCircle2, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { predictDiabetesRisk } from "@/api/predictiveAPI"; // <- lowercase import

const getRiskLabel = (score) => {
  if (score >= 0.8) return { label: "Very High", color: "bg-red-600" };
  if (score >= 0.6) return { label: "High", color: "bg-orange-500" };
  if (score >= 0.4) return { label: "Moderate", color: "bg-yellow-400" };
  return { label: "Low", color: "bg-green-500" };
};

const DiabetesRisk = () => {
  const [formData, setFormData] = useState({ glucose: "", bmi: "", age: "", insulin: "" });
  const [loading, setLoading] = useState(false);
  const [riskScore, setRiskScore] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRiskScore(null);
    setError(null);
    try {
      const result = await predictDiabetesRisk(formData); // expects { score: 0.72 }
      setRiskScore(result.score);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const { label, color } = getRiskLabel(riskScore || 0);

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Diabetes Risk Predictor</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        {["glucose", "bmi", "insulin", "age"].map((field) => (
          <input
            key={field}
            type="number"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required={field !== "insulin"}
            className="border p-2 rounded w-full"
          />
        ))}
        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin w-4 h-4" /> : "Predict Risk"}
        </Button>
      </form>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      {riskScore !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`rounded-xl p-4 flex flex-col gap-2 shadow-md ${color}/10`}
        >
          <div className="flex items-center gap-3">
            {riskScore >= 0.6 ? (
              <AlertTriangle className="text-red-600" />
            ) : (
              <CheckCircle2 className="text-green-600" />
            )}
            <div>
              <p className="font-semibold text-lg">Risk Level: {label}</p>
              <p className="text-sm text-gray-700">
                Score: {(riskScore * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${color}`}
              style={{ width: `${riskScore * 100}%` }}
            />
          </div>
          {riskScore >= 0.6 && (
            <p className="text-sm text-red-700">
              ⚠️ Patient may require follow-up testing and lifestyle intervention.
            </p>
          )}
        </motion.div>
      )}
    </Card>
  );
};

export default DiabetesRisk;
