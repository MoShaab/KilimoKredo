import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, TrendingUp, DollarSign, FileText, AlertCircle, CheckCircle, Clock, LogOut, Menu, X, Upload, MapPin, Leaf, CloudRain, Thermometer } from 'lucide-react';

export default function LoanApplicationForm({ profile, onSubmit }) {
    const [formData, setFormData] = useState({
      loanAmount: '',
      loanPurpose: '',
      duration: profile?.loanDuration || 12,
      seasonalExpense: '',
      expectedYield: ''
    });
    const [loading, setLoading] = useState(false);
  
    if (!profile) {
      return (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Profile Required
          </h2>
          <p className="text-gray-600">
            Please complete your profile first to apply for a loan
          </p>
        </div>
      );
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const application = await API.submitLoanApplication({
          ...formData,
          farmer_id: profile.nationalId,
          credit_score: profile.creditScore,
          interest_rate: profile.interestRate,
          recommended_limit: profile.loanLimit,
          location: profile.location,
          crop_type: profile.cropType,
          farm_size: profile.farmSize,
          ndvi: profile.ndvi,
          rainfall: profile.rainfall,
          temperature: profile.temperature
        });
  
        onSubmit(application);
        alert('Loan application submitted successfully!');
      } catch (error) {
        alert('Error submitting application: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Apply for Agricultural Loan
          </h2>
  
          {/* Credit Info Banner */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Your Credit Score</div>
                <div className="text-xl font-bold text-blue-600">
                  {profile.creditScore}
                </div>
              </div>
              <div>
                <div className="text-gray-600">Recommended Rate</div>
                <div className="text-xl font-bold text-blue-600">
                  {profile.interestRate}%
                </div>
              </div>
              <div>
                <div className="text-gray-600">Maximum Loan</div>
                <div className="text-xl font-bold text-blue-600">
                  KSh {profile.loanLimit?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount (KSh)
              </label>
              <input
                type="number"
                value={formData.loanAmount}
                onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                max={profile.loanLimit}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Maximum: KSh {profile.loanLimit?.toLocaleString()}
              </p>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Purpose
              </label>
              <select
                value={formData.loanPurpose}
                onChange={(e) => setFormData({...formData, loanPurpose: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select purpose</option>
                <option value="Seeds & Fertilizer">Seeds & Fertilizer</option>
                <option value="Equipment">Equipment</option>
                <option value="Irrigation">Irrigation System</option>
                <option value="Labor">Labor Costs</option>
                <option value="Land Preparation">Land Preparation</option>
                <option value="Other">Other</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Duration (Months)
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="18">18 Months</option>
                <option value="24">24 Months</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seasonal Expenses (KSh)
              </label>
              <input
                type="number"
                value={formData.seasonalExpense}
                onChange={(e) => setFormData({...formData, seasonalExpense: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Total Yield (KSh)
              </label>
              <input
                type="number"
                value={formData.expectedYield}
                onChange={(e) => setFormData({...formData, expectedYield: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
  
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    );
  }
  