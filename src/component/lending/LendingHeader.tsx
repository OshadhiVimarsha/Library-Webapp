import React from 'react';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  totalRecords: number;
  onSearch: (term: string) => void;
  onOpenModal: () => void;
}

const LendingHeader: React.FC<HeaderProps> = ({ totalRecords, onSearch, onOpenModal }) => {
  return (
    <div className="space-y-8 mb-10">
      {/* Title & Add Button Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#1A3C1A]">Lending Management</h1>
          <div className="flex items-center mt-1">
            <span className={`w-2 h-2 ${totalRecords > 0 ? 'bg-green-500' : 'bg-gray-300'} rounded-full animate-pulse mr-2`}></span>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              {totalRecords} Total Records Found
            </p>
          </div>
        </div>
        
        <button 
          onClick={onOpenModal}
          className="flex items-center px-6 py-3 bg-[#053D1C] text-white rounded-xl hover:bg-black transition-all shadow-lg text-sm font-bold active:scale-95"
        >
          <Plus size={18} className="mr-2" /> Issue New Book
        </button>
      </div>

      {/* Search & Filter Section */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Book ID, User NIC or ID..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-green-500/20 outline-none shadow-sm transition-all placeholder:text-gray-300"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center px-6 py-4 bg-white border border-gray-100 text-[#4A4A4A] rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm active:bg-gray-100">
          <SlidersHorizontal size={18} className="mr-2 text-gray-400" /> Filters
        </button>
      </div>
    </div>
  );
};

export default LendingHeader;