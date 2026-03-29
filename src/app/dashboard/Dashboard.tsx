import React from 'react';
import { Users, Book, ArrowRightLeft, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  // මේවා පසුව API එකකින් ලබාගත හැක (Mock Data)
  const stats = [
    { 
      title: "Total Users", 
      count: "1,248", 
      icon: <Users size={24} />, 
      color: "text-blue-600", 
      bgColor: "bg-blue-50" 
    },
    { 
      title: "Total Books", 
      count: "856", 
      icon: <Book size={24} />, 
      color: "text-green-600", 
      bgColor: "bg-green-50" 
    },
    { 
      title: "Active Lendings", 
      count: "42", 
      icon: <ArrowRightLeft size={24} />, 
      color: "text-orange-600", 
      bgColor: "bg-orange-50" 
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F8] p-6 md:p-12 font-sans text-[#1A3C1A]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[28px] font-bold">Overview</h1>
          <p className="text-sm text-gray-400 mt-1 font-medium uppercase tracking-widest">Library Management System</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center">
              <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.color} mr-5`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Welcome Section / Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#053D1C] text-white p-8 rounded-[32px] flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
              <p className="text-green-100/70 text-sm leading-relaxed max-w-sm">
                You have 12 pending book requests and 5 overdue lendings today. Check the status to keep the library updated.
              </p>
            </div>
            <button className="mt-6 flex items-center w-fit px-6 py-3 bg-white text-[#053D1C] rounded-xl font-bold text-sm hover:bg-green-50 transition-all">
              View Reports <TrendingUp size={18} className="ml-2" />
            </button>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Quick Shortcuts</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-100 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all text-left group">
                <p className="text-sm font-bold group-hover:text-green-700">+ Add Book</p>
              </button>
              <button className="p-4 border border-gray-100 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all text-left group">
                <p className="text-sm font-bold group-hover:text-green-700">+ Issue Book</p>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;