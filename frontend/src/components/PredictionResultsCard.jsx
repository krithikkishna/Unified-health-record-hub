import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { AlertCircle, CheckCircle, Info, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const DiseaseInfoTooltip = ({ disease }) => {
  const diseaseInfo = {
    parkinsons: {
      title: "Parkinson's Disease",
      description: "A neurodegenerative disorder that affects movement, often including tremors.",
      symptoms: ["Tremor", "Bradykinesia (slowness of movement)", "Limb rigidity", "Gait and balance problems"],
      riskFactors: ["Age", "Heredity", "Sex (men are more likely)", "Exposure to toxins"],
      resources: [
        { name: "Parkinson's Foundation", url: "https://www.parkinson.org/" },
        { name: "NIH: Parkinson's Disease", url: "https://www.ninds.nih.gov/health-information/disorders/parkinsons-disease" }
      ]
    },
    ckd: {
      title: "Chronic Kidney Disease",
      description: "A condition characterized by a gradual loss of kidney function over time.",
      symptoms: ["High blood pressure", "Blood in urine", "Frequent urination", "Swelling in feet and ankles"],
      riskFactors: ["Diabetes", "High blood pressure", "Heart disease", "Family history"],
      resources: [
        { name: "National Kidney Foundation", url: "https://www.kidney.org/" },
        { name: "NIH: Chronic Kidney Disease", url: "https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd" }
      ]
    },
    alzheimers: {
      title: "Alzheimer's Disease",
      description: "A progressive disorder that causes brain cells to degenerate and die.",
      symptoms: ["Memory loss", "Difficulty thinking and reasoning", "Making judgments and decisions", "Planning and performing familiar tasks"],
      riskFactors: ["Age", "Family history", "Down syndrome", "Mild cognitive impairment"],
      resources: [
        { name: "Alzheimer's Association", url: "https://www.alz.org/" },
        { name: "NIH: Alzheimer's Disease", url: "https://www.nia.nih.gov/health/alzheimers" }
      ]
    }
  };

  const info = diseaseInfo[disease] || { 
    title: disease, 
    description: "No additional information available.", 
    symptoms: [], 
    riskFactors: [],
    resources: []
  };

  return (
    <div className="p-4 bg-white rounded-lg border shadow-md">
      <h3 className="font-bold text-lg mb-2">{info.title}</h3>
      <p className="text-sm text-gray-700 mb-3">{info.description}</p>
      
      {info.symptoms.length > 0 && (
        <div className="mb-3">
          <h4 className="font-semibold text-sm mb-1">Common Symptoms:</h4>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            {info.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>
      )}
      
      {info.riskFactors.length > 0 && (
        <div className="mb-3">
          <h4 className="font-semibold text-sm mb-1">Risk Factors:</h4>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            {info.riskFactors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>
      )}
      
      {info.resources.length > 0 && (
        <div className="mb-3">
          <h4 className="font-semibold text-sm mb-1">Resources:</h4>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            {info.resources.map((resource, index) => (
              <li key={index}>
                <a 
                  href={resource.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center"
                >
                  {resource.name}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-500 flex items-center">
        <Info className="inline h-3 w-3 mr-1 flex-shrink-0" />
        <span>This information is for educational purposes only. Consult a healthcare professional for diagnosis.</span>
      </div>
    </div>
  );
};

const PredictionResultsCard = ({ results }) => {
  const [expandedDisease, setExpandedDisease] = useState(null);
  
  if (!results || !results.predictions) {
    return null;
  }

  const { predictions } = results;
  
  // Get risk levels based on prediction probabilities
  const getRiskLevel = (probability) => {
    if (probability >= 0.7) return { level: 'High', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-200' };
    if (probability >= 0.3) return { level: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-200' };
    return { level: 'Low', color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-200' };
  };
  
  // Format probability as percentage
  const formatProbability = (probability) => {
    return (probability * 100).toFixed(1) + '%';
  };

  // Toggle expanded disease info
  const toggleDiseaseInfo = (disease) => {
    if (expandedDisease === disease) {
      setExpandedDisease(null);
    } else {
      setExpandedDisease(disease);
    }
  };

  // Map disease keys to readable names
  const diseaseNames = {
    parkinsons: "Parkinson's Disease",
    ckd: "Chronic Kidney Disease",
    alzheimers: "Alzheimer's Disease"
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Prediction Results</h2>
        
        <div className="space-y-6">
          {Object.entries(predictions).map(([disease, probability]) => {
            const { level, color, bgColor, borderColor } = getRiskLevel(probability);
            const formattedProbability = formatProbability(probability);
            const isExpanded = expandedDisease === disease;
            
            return (
              <div key={disease} className={`border rounded-lg p-4 relative ${borderColor}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {diseaseNames[disease] || disease}
                  </h3>
                  <div className="flex items-center">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${color}`}>
                      {level} Risk
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Probability:</span>
                      <span className="text-sm font-bold text-gray-900">{formattedProbability}</span>
                    </div>
                    <Progress 
                      value={probability * 100} 
                      className="h-2"
                      indicatorClassName={
                        level === 'High' ? 'bg-red-500' : 
                        level === 'Moderate' ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }
                    />
                  </div>
                </div>
                
                <div className="flex items-start">
                  {level === 'High' ? (
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  ) : level === 'Moderate' ? (
                    <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  )}
                  <p className="text-sm text-gray-600">
                    {level === 'High' ? (
                      "High risk detected. Recommend further clinical evaluation and diagnostic tests."
                    ) : level === 'Moderate' ? (
                      "Moderate risk detected. Consider follow-up evaluation based on symptoms and risk factors."
                    ) : (
                      "Low risk detected. Continue with routine health monitoring."
                    )}
                  </p>
                </div>
                
                <div className="mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary flex items-center"
                    onClick={() => toggleDiseaseInfo(disease)}
                  >
                    {isExpanded ? "Hide information" : "More information"}
                    {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                  </Button>
                  
                  {isExpanded && (
                    <div className="mt-2">
                      <DiseaseInfoTooltip disease={disease} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Important Note</h3>
              <div className="text-sm text-blue-700">
                <p>These predictions are based on machine learning models and should be used only as a screening tool. 
                They are not a substitute for professional medical diagnosis. Please consult with a healthcare provider 
                for proper evaluation and diagnosis.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResultsCard;