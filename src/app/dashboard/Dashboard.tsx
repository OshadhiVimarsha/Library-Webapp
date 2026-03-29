import React, { useEffect, useState } from 'react';
import { Users, Book, ArrowRightLeft, CheckCircle2, Clock, Calendar, TrendingUp, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getAllLendings } from '../../api/lendingService';
import { getAllUsers } from '../../api/userService'; 
import { getAllBooks } from '../../api/bookService';

const Dashboard: React.FC = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalLendings: 0,
    pendingLendings: 0,
    returnedLendings: 0,
    recentLendings: [] as any[]
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const processChartData = (lendings: any[]) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts: { [key: string]: number } = {
      'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0
    };

    lendings.forEach(lending => {
      if (lending.lendingDate) {
        const date = new Date(lending.lendingDate);
        const dayName = days[date.getDay()];
        if (counts[dayName] !== undefined) {
          counts[dayName] += 1;
        }
      }
    });

    return Object.keys(counts).map(day => ({ name: day, count: counts[day] }));
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersRes, booksRes, lendingsRes] = await Promise.all([
          getAllUsers(),
          getAllBooks(),
          getAllLendings()
        ]);

        const lendings = lendingsRes.data || [];
        
        setChartData(processChartData(lendings));

        setData({
          totalUsers: usersRes.data?.length || 0,
          totalBooks: booksRes.data?.length || 0,
          totalLendings: lendings.length,
          pendingLendings: lendings.filter((l: any) => !l.returned).length,
          returnedLendings: lendings.filter((l: any) => l.returned).length,
          recentLendings: lendings.slice(-6).reverse()
        });
      } catch (error) {
        console.error("Dashboard Load Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const pieData = [
    { name: 'Returned', value: data.returnedLendings, color: '#053D1C' },
    { name: 'Pending', value: data.pendingLendings, color: '#F97316' },
  ];

  const stats = [
    { title: "Total Users", count: data.totalUsers, icon: <Users size={18} />, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Total Books", count: data.totalBooks, icon: <Book size={18} />, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { title: "Lending Count", count: data.totalLendings, icon: <ArrowRightLeft size={18} />, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "Pending Books", count: data.pendingLendings, icon: <Clock size={18} />, color: "text-orange-600", bgColor: "bg-orange-50" },
    { title: "Return Books", count: data.returnedLendings, icon: <CheckCircle2 size={18} />, color: "text-green-600", bgColor: "bg-green-100/50" }
  ];

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="animate-spin mb-4 text-[#053D1C]" size={48} />
        <p className="font-bold tracking-widest text-xs uppercase">Loading Analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#1A3C1A]">Dashboard</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[4px]">Live System Statistics</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-white px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm text-[11px] font-black text-gray-500 uppercase">
          <Calendar size={14} className="text-green-600" />
          <span>{new Date().toDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className={`w-11 h-11 rounded-2xl ${stat.bgColor} ${stat.color} flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">{stat.title}</p>
            <h3 className="text-2xl font-black mt-2 text-[#1A3C1A]">{stat.count}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#1A3C1A] mb-8 flex items-center text-sm uppercase tracking-wider">
            <TrendingUp size={18} className="mr-3 text-green-600" /> Weekly Lending Activity
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#053D1C" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#053D1C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#64748B'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#64748B'}} />
                <Tooltip cursor={{stroke: '#053D1C', strokeWidth: 1}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="count" stroke="#053D1C" strokeWidth={4} fillOpacity={1} fill="url(#colorLend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm flex flex-col items-center">
          <h3 className="font-bold text-[#1A3C1A] self-start text-sm uppercase tracking-wider mb-8">Inventory Ratio</h3>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={70} outerRadius={90} paddingAngle={12} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={index} fill={entry.color} stroke="none" />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full mt-6 space-y-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between bg-gray-50/50 p-3 rounded-2xl">
                <div className="flex items-center text-[10px] font-black text-gray-500 uppercase">
                  <div className="w-2.5 h-2.5 rounded-full mr-3 shadow-sm" style={{backgroundColor: item.color}} />
                  {item.name}
                </div>
                <span className="text-sm font-black text-[#1A3C1A]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-[35px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-[#1A3C1A] text-sm uppercase tracking-wider">Recent Transactions</h3>
          <button className="text-[10px] font-black text-green-600 hover:text-green-800 transition-colors uppercase tracking-[2px]">View All History</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/30">
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction Info</th>
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Date</th>
                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.recentLendings.map((lending, i) => (
                <tr key={i} className="hover:bg-gray-50/20 transition-colors group">
                  <td className="px-10 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#1A3C1A] group-hover:text-green-700 transition-colors">{lending.userNIC}</span>
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter mt-0.5">Book: {lending.bookId}</span>
                    </div>
                  </td>
                  <td className="px-10 py-5 text-center text-[11px] font-bold text-gray-400">
                    {lending.lendingDate}
                  </td>
                  <td className="px-10 py-5 text-right">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black border tracking-wider ${
                      lending.returned 
                      ? 'bg-green-50 text-green-700 border-green-100' 
                      : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                      {lending.returned ? 'COMPLETED' : 'ON LOAN'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;