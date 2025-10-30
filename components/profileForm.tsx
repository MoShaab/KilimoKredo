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
    const [weatherData, setWeatherData] = useState(null);
    const [prediction, setPrediction] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        // Get weather data
        const weather = await API.getWeatherData(formData.location);
        setWeatherData(weather);
  
        // Get credit score prediction
        const predictionData = await API.predictCreditScore({
          location: formData.location,
          ndvi: weather.ndvi,
          avg_rainfall: weather.rainfall,
          avg_temp: weather.temperature,
          crop_type: formData.cropType,
          farm_size: formData.farmSize,
          previous_loans_count: formData.previousLoans,
          defaulted_loans_count: formData.defaultedLoans,
          crop_yield_per_sqm: formData.cropYield || 5
        });
  
        setPrediction(predictionData);
  
        const updatedProfile = {
          ...formData,
          creditScore: predictionData.credit_score,
          interestRate: predictionData.interest_rate,
          loanLimit: predictionData.loan_limit,
          loanDuration: predictionData.loan_duration,
          riskLevel: predictionData.risk_level,
          ndvi: weather.ndvi,
          rainfall: weather.rainfall,
          temperature: weather.temperature
        };
  
        setProfile(updatedProfile);
        localStorage.setItem('farmerProfile', JSON.stringify(updatedProfile));
      } catch (error) {
        alert('Error processing profile: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
  
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
                      {prediction.credit_score}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-semibold">{prediction.interest_rate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Max Loan</span>
                    <span className="font-semibold">
                      KSh {prediction.loan_limit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Risk Level</span>
                    <span className={`font-semibold ${
                      prediction.risk_level === 'Low' 
                        ? 'text-green-600' 
                        : prediction.risk_level === 'Medium' 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                    }`}>
                      {prediction.risk_level}
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