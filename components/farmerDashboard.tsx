
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, TrendingUp, DollarSign, FileText, AlertCircle, CheckCircle, Clock, LogOut, Leaf, CloudRain, Thermometer, MapPin } from 'lucide-react';
import {  useAuth } from '@/contexts/AuthContext';
import AuthProvider from '@/contexts/AuthContext';
import { AuthContext } from '@/contexts/AuthContext';
import DashboardContent from '@/components/dashboardContent';
import {ProfileForm} from '@/components/profileForm';
import LoanApplicationForm from '@/components/loanApplicationForm';
import ApplicationsList from './applicationsList';
import { Button } from './ui/button';


export default function FarmerDashboard() {
    const { user, logout } = React.useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
  
    useEffect(() => {
      const stored = localStorage.getItem('farmerProfile');
      if (stored) {
        setProfile(JSON.parse(stored));
      }
      const storedApps = localStorage.getItem('loanApplications');
      if (storedApps) {
        setApplications(JSON.parse(storedApps));
      }
    }, []);
  
    const creditScore = profile?.creditScore || 0;
    const getScoreColor = (score) => {
      if (score >= 700) return 'text-green-600';
      if (score >= 600) return 'text-yellow-600';
      return 'text-red-600';
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">KilimoKredo</h1>
                  <p className="text-xs text-gray-600">Farmer Portal</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <Button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </header>
  
        {/* Navigation */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'apply', label: 'Apply for Loan', icon: FileText },
                { id: 'applications', label: 'My Applications', icon: Clock }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-yellow-600 hover:text-gray-800'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </nav>
  
        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && (
            <DashboardContent profile={profile} applications={applications} />
          )}
          {activeTab === 'profile' && (
            <ProfileForm profile={profile} setProfile={setProfile} />
          )}
          {activeTab === 'apply' && (
            <LoanApplicationForm 
              profile={profile} 
              onSubmit={(app) => {
                const updated = [...applications, app];
                setApplications(updated);
                localStorage.setItem('loanApplications', JSON.stringify(updated));
                setActiveTab('applications');
              }}
            />
          )}
          {activeTab === 'applications' && (
            <ApplicationsList applications={applications} />
          )}
        </main>
      </div>
    );
  }