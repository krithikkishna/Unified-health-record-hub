import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPredictionHistory } from '../api/predictiveAPI';
import PredictionResultsCard from './PredictionResultsCard';

const PredictionHistorySection = ({ patientId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [expandedPrediction, setExpandedPrediction] = useState(null);

  useEffect(() => {
    if (patientId) {
      loadPredictionHistory();
    }
  }, [patientId]);

  const loadPredictionHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const history = await getPredictionHistory(patientId);
      setPredictionHistory(history);
    } catch (err) {
      console.error('Error loading prediction history:', err);
      setError('Failed to load prediction history');
      toast.error('Could not load prediction history');
    } finally {
      setLoading(false);
    }
  };

  const handleViewPrediction = (prediction) => {
    setSelectedPrediction(prediction);
    setExpandedPrediction(null);
  };

  const toggleExpandPrediction = (id) => {
    if (expandedPrediction === id) {
      setExpandedPrediction(null);
    } else {
      setExpandedPrediction(id);
    }
  };

  const handleNewPrediction = () => {
    navigate(`/disease-prediction?patientId=${patientId}`);
  };

  if (loading) {
    return (
      <Card className="mt-6">
        <CardContent className="pt-6 flex justify-center items-center h-32">
          <Loader className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2">Loading prediction history...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Disease Prediction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500 mb-4">{error}</div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={loadPredictionHistory}>
              Retry
            </Button>
            <Button onClick={handleNewPrediction}>
              New Prediction
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getRiskLevelClass = (probability) => {
    if (probability >= 0.7) return 'text-red-600 bg-red-50 border-red-200';
    if (probability >= 0.3) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getRiskLevelLabel = (probability) => {
    if (probability >= 0.7) return 'High';
    if (probability >= 0.3) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="mt-6 space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Disease Prediction History</CardTitle>
          <Button onClick={handleNewPrediction}>
            New Prediction
          </Button>
        </CardHeader>
        <CardContent>
          {predictionHistory.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">No prediction history available for this patient.</p>
              <Button onClick={handleNewPrediction}>
                Make First Prediction
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Predicted By</th>
                      <th className="text-left p-2">Parkinson's</th>
                      <th className="text-left p-2">CKD</th>
                      <th className="text-left p-2">Alzheimer's</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictionHistory.map((prediction) => (
                      <React.Fragment key={prediction._id}>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-2">{format(new Date(prediction.timestamp), 'MMM d, yyyy')}</td>
                          <td className="p-2">{prediction.predictedBy?.name || 'Unknown'}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelClass(prediction.predictions.parkinsons)}`}>
                              {getRiskLevelLabel(prediction.predictions.parkinsons)} ({(prediction.predictions.parkinsons * 100).toFixed(1)}%)
                            </span>
                          </td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelClass(prediction.predictions.ckd)}`}>
                              {getRiskLevelLabel(prediction.predictions.ckd)} ({(prediction.predictions.ckd * 100).toFixed(1)}%)
                            </span>
                          </td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelClass(prediction.predictions.alzheimers)}`}>
                              {getRiskLevelLabel(prediction.predictions.alzheimers)} ({(prediction.predictions.alzheimers * 100).toFixed(1)}%)
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewPrediction(prediction)}
                              >
                                View
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => toggleExpandPrediction(prediction._id)}
                              >
                                {expandedPrediction === prediction._id ? 'Hide' : 'Details'}
                              </Button>
                            </div>
                          </td>
                        </tr>
                        {expandedPrediction === prediction._id && (
                          <tr>
                            <td colSpan="6" className="p-2 bg-gray-50">
                              <div className="p-3">
                                <h3 className="font-semibold mb-2">Biomarker Values</h3>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  {Object.entries(prediction.features).map(([key, value]) => (
                                    <div key={key} className="flex justify-between border-b border-gray-200 py-1">
                                      <span className="font-medium">{key}:</span>
                                      <span>{parseFloat(value).toFixed(6)}</span>
                                    </div>
                                  ))}
                                </div>
                                {prediction.notes && (
                                  <div className="mt-3">
                                    <h3 className="font-semibold mb-1">Notes</h3>
                                    <p className="text-gray-700 text-sm">{prediction.notes}</p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedPrediction && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                Detailed Prediction from {format(new Date(selectedPrediction.timestamp), 'MMMM d, yyyy')}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedPrediction(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Predicted by: <span className="font-medium text-gray-700">{selectedPrediction.predictedBy?.name || 'Unknown'}</span> • 
                {' '}{format(new Date(selectedPrediction.timestamp), 'MMMM d, yyyy h:mm a')}
              </p>
            </div>
            
            <PredictionResultsCard results={{ predictions: selectedPrediction.predictions }} />
            
            {selectedPrediction.notes && (
              <div className="mt-4 p-4 border rounded-md">
                <h3 className="font-bold mb-2">Clinical Notes</h3>
                <p className="text-gray-700">{selectedPrediction.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PredictionHistorySection;