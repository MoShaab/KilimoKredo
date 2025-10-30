
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, TrendingUp, DollarSign, FileText, AlertCircle, CheckCircle, Clock, LogOut, Menu, X, Upload, MapPin, Leaf, CloudRain, Thermometer } from 'lucide-react';
import StatCard from './ui/statCard';
import InfoItem from './infoItem';

export default function DashboardContent({ profile, applications }) {
    if (!profile) {
      return (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 mb-6">
            Set up your profile to start applying for loans
          </p>
        </div>
      );
    }
  
    const creditScore = profile.creditScore || 0;
    const pendingApps = applications.filter(a => a.status === 'pending').length;
    const approvedApps = applications.filter(a => a.status === 'approved').length;
  
    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={TrendingUp}
            label="Credit Score"
            value={creditScore}
            color="blue"
           
          />
          <StatCard
            icon={DollarSign}
            label="Loan Limit"
            value={`KSh ${(profile.loanLimit || 0).toLocaleString()}`}
            color="green"
            
          />
          <StatCard
            icon={Clock}
            label="Pending Applications"
            value={pendingApps}
            color="yellow"
         
          />
          <StatCard
            icon={CheckCircle}
            label="Approved Loans"
            value={approvedApps}
            color="green"
           
          />
        </div>
  
        {/* Credit Score Gauge */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Credit Score Analysis
          </h3>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke={creditScore >= 700 ? '#10b981' : creditScore >= 600 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(creditScore / 900) * 502.4} 502.4`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute">
                  <div className="text-4xl font-bold text-gray-800">
                    {creditScore}
                  </div>
                  <div className="text-sm text-gray-600">out of 900</div>
                </div>
              </div>
              <div className="mt-4">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  creditScore >= 700 
                    ? 'bg-green-100 text-green-800'
                    : creditScore >= 600
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {profile.riskLevel || 'Not Assessed'} Risk
                </span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Farm Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Farm Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoItem icon={MapPin} label="Location" value={profile.location} />
            <InfoItem icon={Leaf} label="Farm Size" value={`${profile.farmSize} m²`} />
            <InfoItem icon={Leaf} label="Crop Type" value={profile.cropType} />
          </div>
        </div>
      </div>
    );
  }
  