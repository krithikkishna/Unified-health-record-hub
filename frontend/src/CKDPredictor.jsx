import React, { useState } from 'react';
import apiClient from '@/api/apiClient';

const CKDPredictor = () => {
  const [inputData, setInputData] = useState({
    age: '',
    bp: '',
    sg: '',
    al: '',
    su: '',
    // Add more fields like 'bgr', 'sc', etc. as needed
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setErrorMsg(null);

    try {
      const response = await apiClient.post('/predict-ckd', inputData);
      setResult(response.data);
    } catch (error) {
      setErrorMsg('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 shadow-xl rounded-2xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">CKD Prediction Tool</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(inputData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-gray-700 capitalize mb-1">{key.replace(/_/g, ' ')}</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Predicting...' : 'Predict CKD'}
        </button>
      </form>

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {errorMsg}
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-green-50 border-green-200">
          <h3 className="text-lg font-semibold text-green-700">Prediction Result:</h3>
          <p className="text-gray-700 mt-2">
            {result.prediction
              ? `Patient is likely ${result.prediction.toUpperCase()}`
              : JSON.stringify(result, null, 2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CKDPredictor;
