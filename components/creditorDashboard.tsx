import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, TrendingUp, DollarSign, FileText, AlertCircle, CheckCircle, Clock, LogOut, Menu, X, Upload, MapPin, Leaf, CloudRain, Thermometer } from 'lucide-react';
import StatCard from './ui/statCard';
import ApplicationReview from './applicationReview';
import { AuthContext } from '@/contexts/AuthContext';

export default function CreditorDashboard() {
    const { user, logout } = React.useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
  
    useEffect(() => {
      const stored = localStorage.getItem('loanApplications');
      if (stored) {
        setApplications(JSON.parse(stored));
      }
    }, []);
  
    const updateApplicationStatus = (appId, status, comments) => {
      const updated = applications.map(app => 
        app.application_id === appId 
          ? { ...app, status, creditor_comments: comments, review_date: new Date().toISOString() }
          : app
      );
      setApplications(updated);
      localStorage.setItem('loanApplications', JSON.stringify(updated));
      setSelectedApp(null);
    };
  
    const filteredApps = filterStatus === 'all' 
      ? applications 
      : applications.filter(app => app.status === filterStatus);
  
    const stats = {
      total: applications.length,
      pending: applications.filter(a => a.status === 'pending').length,
      approved: applications.filter(a => a.status === 'approved').length,
      rejected: applications.filter(a => a.status === 'rejected').length
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">KilimoKredo</h1>
                  <p className="text-xs text-gray-600">Creditor Portal</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon={FileText} label="Total Applications" value={stats.total} color="blue" />
            <StatCard icon={Clock} label="Pending Review" value={stats.pending} color="yellow" />
            <StatCard icon={CheckCircle} label="Approved" value={stats.approved} color="green" />
            <StatCard icon={AlertCircle} label="Rejected" value={stats.rejected} color="red" />
          </div>
  
          {selectedApp ? (
            <ApplicationReview 
              application={selectedApp} 
              onBack={() => setSelectedApp(null)}
              onDecision={updateApplicationStatus}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    Loan Applications
                  </h2>
                  <div className="flex gap-2">
                    {['all', 'pending', 'approved', 'rejected'].map(status => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          filterStatus === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
  
              <div className="divide-y divide-gray-200">
                {filteredApps.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No applications found
                  </div>
                ) : (
                  filteredApps.map((app) => (
                    <div
                      key={app.application_id}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => setSelectedApp(app)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono font-semibold text-gray-800">
                              {app.application_id}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              app.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : app.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {app.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-600">Amount</div>
                              <div className="font-semibold">
                                KSh {parseFloat(app.loanAmount).toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-600">Credit Score</div>
                              <div className="font-semibold">{app.credit_score}</div>
                            </div>
                            <div>
                              <div className="text-gray-600">Location</div>
                              <div className="font-semibold">{app.location}</div>
                            </div>
                            <div>
                              <div className="text-gray-600">Submitted</div>
                              <div className="font-semibold">
                                {new Date(app.submission_date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                            Review →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
  