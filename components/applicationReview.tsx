
import React, { useState, useEffect } from 'react';


export default function ApplicationReview({ application, onBack, onDecision }) {
    const [decision, setDecision] = useState('');
    const [comments, setComments] = useState('');
    const [adjustedAmount, setAdjustedAmount] = useState(application.loanAmount);
    const [adjustedRate, setAdjustedRate] = useState(application.interest_rate);
  
    const handleSubmit = () => {
      if (!decision) {
        alert('Please select a decision');
        return;
      }
      if (!comments.trim()) {
        alert('Please provide comments');
        return;
      }
      onDecision(application.application_id, decision, comments);
    };
  
    const getRiskColor = (score) => {
      if (score >= 700) return 'text-green-600';
      if (score >= 600) return 'text-yellow-600';
      return 'text-red-600';
    };
  
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Applications
        </button>
  
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Application Review
              </h2>
              <p className="text-gray-600 font-mono">{application.application_id}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              application.status === 'pending' 
                ? 'bg-yellow-100 text-yellow-800'
                : application.status === 'approved'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {application.status}
            </span>
          </div>
  
          {/* AI Credit Assessment */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">AI Credit Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600">Credit Score</div>
                <div className={`text-2xl font-bold ${getRiskColor(application.credit_score)}`}>
                  {application.credit_score}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Recommended Rate</div>
                <div className="text-2xl font-bold text-gray-800">
                  {application.interest_rate}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Max Loan Limit</div>
                <div className="text-2xl font-bold text-gray-800">
                  KSh {application.recommended_limit?.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Risk Level</div>
                <div className={`text-2xl font-bold ${getRiskColor(application.credit_score)}`}>
                  {application.credit_score >= 700 ? 'Low' : application.credit_score >= 600 ? 'Medium' : 'High'}
                </div>
              </div>
            </div>
          </div>
  
          {/* Application Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Loan Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Requested Amount</span>
                  <span className="font-semibold">
                    KSh {parseFloat(application.loanAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purpose</span>
                  <span className="font-semibold">{application.loanPurpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{application.duration} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seasonal Expense</span>
                  <span className="font-semibold">
                    KSh {parseFloat(application.seasonalExpense).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Yield</span>
                  <span className="font-semibold">
                    KSh {parseFloat(application.expectedYield).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
  
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Farm Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold">{application.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Farm Size</span>
                  <span className="font-semibold">{application.farm_size} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Crop Type</span>
                  <span className="font-semibold">{application.crop_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NDVI Index</span>
                  <span className="font-semibold">{application.ndvi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Rainfall</span>
                  <span className="font-semibold">{application.rainfall} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Temperature</span>
                  <span className="font-semibold">{application.temperature}°C</span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Decision Section */}
          {application.status === 'pending' && (
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Make Decision</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approved Amount (KSh)
                  </label>
                  <input
                    type="number"
                    value={adjustedAmount}
                    onChange={(e) => setAdjustedAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={adjustedRate}
                    onChange={(e) => setAdjustedRate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
  
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments / Justification
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide reasoning for your decision..."
                />
              </div>
  
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setDecision('approved');
                    handleSubmit();
                  }}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Approve Application
                </button>
                <button
                  onClick={() => {
                    setDecision('rejected');
                    handleSubmit();
                  }}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Reject Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }