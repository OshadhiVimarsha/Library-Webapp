import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="flex gap-3 mb-8">
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input 
        type="text" 
        placeholder="Search by name, NIC or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white border-none rounded-xl text-sm shadow-sm focus:ring-1 focus:ring-green-500 outline-none placeholder:text-gray-400"
      />
    </div>
    <button className="flex items-center px-6 py-3 bg-white text-[#4A4A4A] border-none shadow-sm rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
      <SlidersHorizontal size={18} className="mr-2" /> Filters
    </button>
  </div>
);

export default SearchBar;