import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, TrendingUp, DollarSign, FileText, AlertCircle, CheckCircle, Clock, LogOut, Menu, X, Upload, MapPin, Leaf, CloudRain, Thermometer } from 'lucide-react';

export default function ApplicationsList({ applications }) {
    const getStatusBadge = (status) => {
      const styles = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        under_review: 'bg-blue-100 text-blue-800'
      };
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
        </span>
      );
    };
  
    if (applications.length === 0) {
      return (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No Applications Yet
          </h2>
          <p className="text-gray-600">
            Submit your first loan application to get started
          </p>
        </div>
      );
    }
  
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          My Loan Applications
        </h2>
        {applications.map((app) => (
          <div key={app.application_id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-600">Application ID</div>
                <div className="font-mono font-semibold text-gray-800">
                  {app.application_id}
                </div>
              </div>
              {getStatusBadge(app.status)}
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Loan Amount</div>
                <div className="font-semibold text-gray-800">
                  KSh {parseFloat(app.loanAmount).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Purpose</div>
                <div className="font-semibold text-gray-800">{app.loanPurpose}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Duration</div>
                <div className="font-semibold text-gray-800">{app.duration} months</div>
              </div>
            </div>
  
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Submitted on {new Date(app.submission_date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }