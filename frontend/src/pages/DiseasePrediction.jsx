import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import PredictionResultsCard from '../components/PredictionResultsCard';
import { predictDiseases } from '../api/predictiveAPI';
import Select from '../components/ui/select';

const DiseasePrediction = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    // Parkinson's features
    MDVP_Fo: '',
    MDVP_Fhi: '',
    MDVP_Flo: '',
    MDVP_Jitter: '',
    MDVP_Jitter_Abs: '',
    MDVP_RAP: '',
    MDVP_PPQ: '',
    Jitter_DDP: '',
    MDVP_Shimmer: '',
    MDVP_Shimmer_dB: '',
    Shimmer_APQ3: '',
    Shimmer_APQ5: '',
    MDVP_APQ: '',
    Shimmer_DDA: '',
    NHR: '',
    HNR: '',
    RPDE: '',
    DFA: '',
    spread1: '',
    spread2: '',
    D2: '',
    PPE: ''
  });

  const [patientId, setPatientId] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predictionResults, setPredictionResults] = useState(null);
  const [error, setError] = useState(null);
  const [loadingPatients, setLoadingPatients] = useState(false);

  // Load patients for doctor
  useEffect(() => {
    const fetchPatients = async () => {
      if (user && user.role === 'doctor') {
        try {
          setLoadingPatients(true);
          // This would be replaced with your actual API call
          const response = await fetch('/api/patients');
          const data = await response.json();
          setPatients(data);
        } catch (err) {
          console.error('Error fetching patients:', err);
          toast.error('Failed to load patients');
        } finally {
          setLoadingPatients(false);
        }
      }
    };

    fetchPatients();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePatientChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Convert all form values to numbers
      const numericalData = {};
      for (const [key, value] of Object.entries(formData)) {
        numericalData[key] = parseFloat(value) || 0;
      }
      
      // Add patient ID to query params if selected
      const queryParams = patientId ? { patientId } : {};
      
      const results = await predictDiseases(numericalData, queryParams);
      setPredictionResults(results);
      
      toast.success('Prediction completed successfully');
    } catch (err) {
      console.error('Prediction error:', err);
      setError('An error occurred while making the prediction. Please try again.');
      toast.error('Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      MDVP_Fo: '',
      MDVP_Fhi: '',
      MDVP_Flo: '',
      MDVP_Jitter: '',
      MDVP_Jitter_Abs: '',
      MDVP_RAP: '',
      MDVP_PPQ: '',
      Jitter_DDP: '',
      MDVP_Shimmer: '',
      MDVP_Shimmer_dB: '',
      Shimmer_APQ3: '',
      Shimmer_APQ5: '',
      MDVP_APQ: '',
      Shimmer_DDA: '',
      NHR: '',
      HNR: '',
      RPDE: '',
      DFA: '',
      spread1: '',
      spread2: '',
      D2: '',
      PPE: ''
    });
    setPatientId('');
    setPredictionResults(null);
    setError(null);
  };

  // Sample values for demonstration
  const loadSampleValues = () => {
    setFormData({
      MDVP_Fo: '119.992',
      MDVP_Fhi: '157.302',
      MDVP_Flo: '74.997',
      MDVP_Jitter: '0.00784',
      MDVP_Jitter_Abs: '0.00007',
      MDVP_RAP: '0.00370',
      MDVP_PPQ: '0.00554',
      Jitter_DDP: '0.01109',
      MDVP_Shimmer: '0.04374',
      MDVP_Shimmer_dB: '0.426',
      Shimmer_APQ3: '0.02182',
      Shimmer_APQ5: '0.03130',
      MDVP_APQ: '0.02971',
      Shimmer_DDA: '0.06545',
      NHR: '0.02211',
      HNR: '21.033',
      RPDE: '0.414783',
      DFA: '0.815285',
      spread1: '-4.813031',
      spread2: '0.266482',
      D2: '2.301442',
      PPE: '0.284654'
    });
  };

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Multi-Disease Prediction</h1>
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={loadSampleValues}
            className="mr-2"
          >
            Load Sample Values
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
          >
            Reset Form
          </Button>
        </div>
      </div>
      
      <Card className="p-6 shadow-lg mb-6">
        <form onSubmit={handleSubmit}>
          {user && user.role === 'doctor' && (
            <div className="mb-6">
              <Label htmlFor="patientId" className="text-lg font-semibold block mb-2">
                Select Patient (Optional)
              </Label>
              <Select
                id="patientId"
                value={patientId}
                onChange={handlePatientChange}
                disabled={loadingPatients}
                className="w-full max-w-md"
              >
                <option value="">-- No Patient Selected --</option>
                {patients.map(patient => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name} ({patient.patientId})
                  </option>
                ))}
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                If selected, prediction results will be saved to the patient's record.
              </p>
            </div>
          )}
          
          <h2 className="text-xl font-semibold mb-4">Biomarker Parameters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="MDVP_Fo">MDVP:Fo(Hz)</Label>
              <Input 
                id="MDVP_Fo" 
                name="MDVP_Fo" 
                type="number" 
                step="any"
                value={formData.MDVP_Fo} 
                onChange={handleChange} 
                placeholder="e.g. 119.992" 
              />
            </div>
            
            <div>
              <Label htmlFor="MDVP_Fhi">MDVP:Fhi(Hz)</Label>
              <Input 
                id="MDVP_Fhi" 
                name="MDVP_Fhi" 
                type="number" 
                step="any"
                value={formData.MDVP_Fhi} 
                onChange={handleChange} 
                placeholder="e.g. 157.302" 
              />
            </div>
            
            <div>
              <Label htmlFor="MDVP_Flo">MDVP:Flo(Hz)</Label>
              <Input 
                id="MDVP_Flo" 
                name="MDVP_Flo" 
                type="number" 
                step="any"
                value={formData.MDVP_Flo} 
                onChange={handleChange} 
                placeholder="e.g. 74.997" 
              />
            </div>
            
            <div>
              <Label htmlFor="MDVP_Jitter">MDVP:Jitter(%)</Label>
              <Input 
                id="MDVP_Jitter" 
                name="MDVP_Jitter" 
                type="number" 
                step="any"
                value={formData.MDVP_Jitter} 
                onChange={handleChange} 
                placeholder="e.g. 0.00784" 
              />
            </div>
            
            <div>
              <Label htmlFor="MDVP_Jitter_Abs">MDVP:Jitter(Abs)</Label>
              <Input 
                id="MDVP_Jitter_Abs" 
                name="MDVP_Jitter_Abs" 
                type="number" 
                step="any"
                value={formData.MDVP_Jitter_Abs} 
                onChange={handleChange} 
                placeholder="e.g. 0.00007" 
              />
            </div>
            
            <div>
              <Label htmlFor="MDVP_RAP">MDVP:RAP</Label>
              <Input 
                id="MDVP_RAP" 
                name="MDVP_RAP" 
                type="number" 
                step="any"
                value={formData.MDVP_RAP} 
                onChange={handleChange} 
                placeholder="e.g. 0.00370" 
              />
            </div>
            
            <div>
              <Label htmlFor="MDVP_PPQ">MDVP:PPQ</Label>
              <Input 
                id="MDVP_PPQ" 
                name="MDVP_PPQ" 
                type="number" 
                step="any"
                value={formData.MDVP_PPQ} 
                onChange={handleChange} 
                placeholder="e.g. 0.00554" 
              />
            </div>
            
            <div>
              <Label htmlFor="Jitter_DDP">Jitter:DDP</Label>
              <Input 
                id="Jitter_DDP" 
                name="Jitter_DDP" 
                type="number" 
                step="any"
                value={formData.Jitter_DDP} 
                onChange={handleChange} 
                placeholder="e.g. 0.01109" 
              />
            </div>
            
            <div>
              <Label htmlFor="MDVP_Shimmer">MDVP:Shimmer</Label>
              <Input 
                id="MDVP_Shimmer" 
                name="MDVP_Shimmer" 
                type="number" 
                step="any"
                value={formData.MDVP_Shimmer} 
                onChange={handleChange} 
                placeholder="e.g. 0.04374" 
              />
            </div>
            
            <div>
              <Label htmlFor="MDVP_Shimmer_dB">MDVP:Shimmer(dB)</Label>
              <Input 
                id="MDVP_Shimmer_dB" 
                name="MDVP_Shimmer_dB" 
                type="number" 
                step="any"
                value={formData.MDVP_Shimmer_dB} 
                onChange={handleChange} 
                placeholder="e.g. 0.426" 
              />
            </div>
            
            <div>
              <Label htmlFor="Shimmer_APQ3">Shimmer:APQ3</Label>
              <Input 
                id="Shimmer_APQ3" 
                name="Shimmer_APQ3" 
                type="number" 
                step="any"
                value={formData.Shimmer_APQ3} 
                onChange={handleChange} 
                placeholder="e.g. 0.02182" 
              />
            </div>
            
            <div>
              <Label htmlFor="Shimmer_APQ5">Shimmer:APQ5</Label>
              <Input 
                id="Shimmer_APQ5" 
                name="Shimmer_APQ5" 
                type="number" 
                step="any"
                value={formData.Shimmer_APQ5} 
                onChange={handleChange} 
                placeholder="e.g. 0.03130" 
              />
            </div>
            
            <div>
              <Label htmlFor="MDVP_APQ">MDVP:APQ</Label>
              <Input 
                id="MDVP_APQ" 
                name="MDVP_APQ" 
                type="number" 
                step="any"
                value={formData.MDVP_APQ} 
                onChange={handleChange} 
                placeholder="e.g. 0.02971" 
              />
            </div>
            
            <div>
              <Label htmlFor="Shimmer_DDA">Shimmer:DDA</Label>
              <Input 
                id="Shimmer_DDA" 
                name="Shimmer_DDA" 
                type="number" 
                step="any"
                value={formData.Shimmer_DDA} 
                onChange={handleChange} 
                placeholder="e.g. 0.06545" 
              />
            </div>
            
            <div>
              <Label htmlFor="NHR">NHR</Label>
              <Input 
                id="NHR" 
                name="NHR" 
                type="number" 
                step="any"
                value={formData.NHR} 
                onChange={handleChange} 
                placeholder="e.g. 0.02211" 
              />
            </div>
            
            <div>
              <Label htmlFor="HNR">HNR</Label>
              <Input 
                id="HNR" 
                name="HNR" 
                type="number" 
                step="any"
                value={formData.HNR} 
                onChange={handleChange} 
                placeholder="e.g. 21.033" 
              />
            </div>
            
            <div>
              <Label htmlFor="RPDE">RPDE</Label>
              <Input 
                id="RPDE" 
                name="RPDE" 
                type="number" 
                step="any"
                value={formData.RPDE} 
                onChange={handleChange} 
                placeholder="e.g. 0.414783" 
              />
            </div>
            
            <div>
              <Label htmlFor="DFA">DFA</Label>
              <Input 
                id="DFA" 
                name="DFA" 
                type="number" 
                step="any"
                value={formData.DFA} 
                onChange={handleChange} 
                placeholder="e.g. 0.815285" 
              />
            </div>
            
            <div>
              <Label htmlFor="spread1">spread1</Label>
              <Input 
                id="spread1" 
                name="spread1" 
                type="number" 
                step="any"
                value={formData.spread1} 
                onChange={handleChange} 
                placeholder="e.g. -4.813031" 
              />
            </div>
            
            <div>
              <Label htmlFor="spread2">spread2</Label>
              <Input 
                id="spread2" 
                name="spread2" 
                type="number" 
                step="any"
                value={formData.spread2} 
                onChange={handleChange} 
                placeholder="e.g. 0.266482" 
              />
            </div>
            
            <div>
              <Label htmlFor="D2">D2</Label>
              <Input 
                id="D2" 
                name="D2" 
                type="number" 
                step="any"
                value={formData.D2} 
                onChange={handleChange} 
                placeholder="e.g. 2.301442" 
              />
            </div>
            
            <div>
              <Label htmlFor="PPE">PPE</Label>
              <Input 
                id="PPE" 
                name="PPE" 
                type="number" 
                step="any"
                value={formData.PPE} 
                onChange={handleChange} 
                placeholder="e.g. 0.284654" 
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Processing Prediction...
                </>
              ) : (
                'Predict Diseases'
              )}
            </Button>
          </div>
        </form>
      </Card>
      
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {predictionResults && (
        <div className="mt-6">
          <PredictionResultsCard results={predictionResults} />
          
          {patientId && predictionResults.savedPredictionId && (
            <div className="mt-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded flex items-center">
              <div className="mr-3">✓</div>
              <div>
                <p className="font-semibold">Prediction saved to patient record</p>
                <p className="text-sm">You can view this prediction in the patient's medical history.</p>
              </div>
              <Button 
                variant="outline" 
                className="ml-auto"
                onClick={() => navigate(`/medical-history/${patientId}`)}
              >
                View Patient Record
              </Button>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">About Disease Prediction</h2>
        <p className="text-blue-700 mb-3">
          This tool uses machine learning to predict the likelihood of three diseases:
        </p>
        <ul className="list-disc pl-5 text-blue-700 mb-4">
          <li><span className="font-medium">Parkinson's Disease</span> - A neurodegenerative disorder affecting movement</li>
          <li><span className="font-medium">Chronic Kidney Disease (CKD)</span> - Progressive loss of kidney function</li>
          <li><span className="font-medium">Alzheimer's Disease</span> - A progressive brain disorder affecting memory and thinking</li>
        </ul>
        <p className="text-sm text-blue-600">
          <strong>Important:</strong> These predictions are based on machine learning models and should be used only as a screening tool. 
          They are not a substitute for professional medical diagnosis. Please consult with a healthcare provider for proper evaluation and diagnosis.
        </p>
      </div>
    </div>
  );
};

export default DiseasePrediction;