import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input 
        type="text" 
        placeholder="Search by ID, title or author..." 
        className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl outline-none shadow-sm border border-gray-100 focus:ring-2 focus:ring-green-500/20 transition-all text-sm"
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;