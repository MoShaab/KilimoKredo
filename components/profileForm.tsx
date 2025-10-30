import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, TrendingUp, DollarSign, FileText, AlertCircle, CheckCircle, Clock, LogOut, Menu, X, Upload, MapPin, Leaf, CloudRain, Thermometer } from 'lucide-react';

export function ProfileForm({ profile, setProfile }) {
    const [formData, setFormData] = useState(profile || {
      name: '',
      phone: '',
      nationalId: '',
      location: '',
      farmSize: '',
      cropType: '',
      previousLoans: 0,
      defaultedLoans: 0
    });
    const [loading, setLoading] = useState(false);
    type Prediction = {
      creditScore: number;
      interestRate: number;
      loanLimit: number;
      loanDuration: number;
      confidence: string;
      riskLevel: 'Low' | 'Medium' | 'High';
    };
    
    const [prediction, setPrediction] = useState<Prediction | null>(null);
    
    const [weatherData, setWeatherData] = useState<{
      ndvi: number;
      rainfall: number;
      temperature: number;
    } | null>(null);
    
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
    
      try {
        // Step 1: Simulate weather (hardcoded or based on location)
        const weather = {
          ndvi: 0.78,           // vegetation index (0–1)
          rainfall: 120,        // mm per month
          temperature: 25.4,    // °C average
        };
    
        setWeatherData(weather);
    
        // Optional: simulate AI processing delay
        await new Promise((res) => setTimeout(res, 1000));
    
        // Step 2: Simulate model inference (replaces API call)
        const predictionData = simulateCreditDecision({
          location: formData.location,
          ndvi: weather.ndvi,
          avg_rainfall: weather.rainfall,
          avg_temp: weather.temperature,
          crop_type: formData.cropType,
          farm_size: formData.farmSize,
          previous_loans_count: formData.previousLoans,
          defaulted_loans_count: formData.defaultedLoans,
          crop_yield_per_sqm: formData.cropYield || 5,
        });
    
        // Step 3: Save to state
        setPrediction(predictionData);
    
        // Step 4: Update farmer profile
        const updatedProfile = {
          ...formData,
          creditScore: predictionData.creditScore,
          interestRate: predictionData.interestRate,
          loanLimit: predictionData.loanLimit,
          loanDuration: predictionData.loanDuration,
          riskLevel: predictionData.riskLevel,
          ndvi: weather.ndvi,
          rainfall: weather.rainfall,
          temperature: weather.temperature,
        };
    
        localStorage.setItem("farmerProfile", JSON.stringify(updatedProfile));
      } catch (error) {
        console.error("Error simulating prediction:", error);
      } finally {
        setLoading(false);
      }
    };
    function simulateCreditDecision(data) {
  const {
    ndvi,
    avg_rainfall,
    avg_temp,
    crop_type,
    farm_size,
    previous_loans_count,
    defaulted_loans_count,
    crop_yield_per_sqm,
  } = data;

  // --- Step 1: Compute a pseudo credit score ---
  let score = 600;
  score += ndvi * 120;
  score += (avg_rainfall - 60) * 0.3;
  score -= Math.abs(avg_temp - 25) * 1.5;
  score += crop_yield_per_sqm * 2;
  score += farm_size * 0.8;
  score -= previous_loans_count * 5;
  score -= defaulted_loans_count * 50;

  // clamp between 300–850
  score = Math.round(Math.min(850, Math.max(300, score)));

  // --- Step 2: Determine interest rate (in % per year) ---
  let interestRate;
  if (score >= 750) interestRate = 8;
  else if (score >= 650) interestRate = 12;
  else if (score >= 550) interestRate = 16;
  else interestRate = 20;

  let loanLimit = Number((farm_size * crop_yield_per_sqm * ndvi * 500).toFixed(0));
  loanLimit = Math.max(20000, Math.min(loanLimit, 500000)); // clamp
  
  

  // --- Step 4: Determine loan duration (months) ---
  let loanDuration;
  if (score >= 700) loanDuration = 12;
  else if (score >= 600) loanDuration = 9;
  else loanDuration = 6;

  // --- Step 5: Add confidence score (just for realism) ---
  const confidence = (Math.random() * 0.1 + 0.9).toFixed(2);
  const riskLevel =
  score >= 750 ? 'Low' :
  score >= 600 ? 'Medium' :
  'High';

  return {
    creditScore: score,
    interestRate,
    loanLimit: Number(loanLimit),
    loanDuration,
    confidence,
    riskLevel
  };
}

  
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Farm Profile
          </h2>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  National ID
                </label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (latitude,longitude)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., -1.2168, 36.9891"
                  required
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Farm Size (m²)
                </label>
                <input
                  type="number"
                  value={formData.farmSize}
                  onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Crop Type
                </label>
                <select
                  value={formData.cropType}
                  onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select crop</option>
                  <option value="Maize">Maize</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Tea">Tea</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Rice">Rice</option>
                  <option value="Beans">Beans</option>
                  <option value="Potatoes">Potatoes</option>
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Crop Yield (kg/m²)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.cropYield || ''}
                  onChange={(e) => setFormData({...formData, cropYield: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 5.5"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Loans Count
                </label>
                <input
                  type="number"
                  value={formData.previousLoans}
                  onChange={(e) => setFormData({...formData, previousLoans: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Defaulted Loans Count
                </label>
                <input
                  type="number"
                  value={formData.defaultedLoans}
                  onChange={(e) => setFormData({...formData, defaultedLoans: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
  
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Calculate Credit Score'}
            </button>
          </form>
  
          {weatherData && prediction && (
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Environmental & Credit Assessment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      NDVI Index
                    </span>
                    <span className="font-semibold">{weatherData.ndvi}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <CloudRain className="w-4 h-4" />
                      Avg Rainfall
                    </span>
                    <span className="font-semibold">{weatherData.rainfall} mm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      Avg Temperature
                    </span>
                    <span className="font-semibold">{weatherData.temperature}°C</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Credit Score</span>
                    <span className="font-bold text-xl text-green-600">
                      {prediction.creditScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-semibold">{prediction.interestRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Max Loan</span>
                    <span className="font-semibold">
                      KSh {prediction.loanLimit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Risk Level</span>
                    <span className={`font-semibold ${
                      prediction.riskLevel === 'Low' 
                        ? 'text-green-600' 
                        : prediction.riskLevel === 'Medium' 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                    }`}>
                      {prediction.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }