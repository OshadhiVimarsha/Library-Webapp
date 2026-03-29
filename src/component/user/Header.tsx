import React from 'react';
import { Plus } from 'lucide-react';

interface HeaderProps {
  count: number;
  onAddClick: () => void;
}

// 1. මෙතන { count, onAddClick } කියලා දෙකම ගන්න (ඔයා කලින් තිබ්බේ count විතරයි)
const Header: React.FC<HeaderProps> = ({ count, onAddClick }) => (
  <div className="flex items-center justify-between mb-10">
    <div>
      <h1 className="text-[28px] font-bold text-[#1A3C1A]">User Management</h1>
      <div className="flex items-center mt-1">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          {count} Total Users Found
        </p>
      </div>
    </div>
    
    {/* 2. බටන් එකට onClick={onAddClick} ලබා දෙන්න */}
    <button 
      onClick={onAddClick}
      className="flex items-center px-5 py-2.5 bg-[#053D1C] text-white rounded-lg hover:bg-[#0a4d25] transition-colors shadow-sm text-sm font-medium cursor-pointer"
    >
      <Plus size={18} className="mr-2" /> Add New User
    </button>
  </div>
);

export default Header;