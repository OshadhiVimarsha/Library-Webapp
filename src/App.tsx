import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookMarked, ArrowLeftRight, Bell } from 'lucide-react';
import UserPage from './app/user/UserPage'; 
import BookPage from './app/book/BookPage';
import Dashboard from './app/dashboard/Dashboard';
import LendingPage from './app/lending/LendingPage';   
import './App.css';

function App() {
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/users', name: 'Users', icon: <Users size={20} /> },
    { path: '/books', name: 'Books', icon: <BookMarked size={20} /> },
    { path: '/lendings', name: 'Lendings', icon: <ArrowLeftRight size={20} /> },
  ];

  return (
    <Router>
      <div className="flex min-h-screen bg-[#F8F9F8] font-sans">
        
        {/* --- Sidebar --- */}
        <aside className="w-64 bg-[#053D1C] text-white hidden md:flex flex-col fixed h-full shadow-2xl">
          <div className="p-8">
            <h1 className="text-2xl font-black tracking-tighter flex items-center">
              LIB<span className="text-green-400">SYS</span>
            </h1>
            <p className="text-[10px] text-green-200/50 font-bold uppercase tracking-[3px] mt-1">Management v2.0</p>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                    isActive 
                    ? 'bg-white text-[#053D1C] shadow-lg shadow-black/20' 
                    : 'text-green-100/60 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                <span className="font-bold text-sm tracking-wide">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-6">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-[10px] font-bold text-green-300 uppercase mb-1">Status</p>
              <div className="flex items-center text-xs font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                Server Online
              </div>
            </div>
          </div>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="flex-1 md:ml-64">
          
          {/* Top Navbar */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 px-8 flex items-center justify-between">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Welcome back, Admin
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2.5 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-10 w-10 bg-gradient-to-tr from-[#053D1C] to-green-700 rounded-xl shadow-inner flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/books" element={<BookPage />} />
              <Route path="/lendings" element={<LendingPage />} />
            </Routes>
          </div>

        </main>
      </div>
    </Router>
  );
}

export default App;