import React from 'react';
import { Plus } from 'lucide-react';

interface BookHeaderProps {
  count: number;
  onAdd: () => void;
}

const BookHeader: React.FC<BookHeaderProps> = ({ count, onAdd }) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-[#1A3C1A]">Book Inventory</h1>
        <p className="text-xs text-gray-400 font-medium uppercase mt-1 tracking-widest">
          {count} Total Books Available
        </p>
      </div>
      <button 
        onClick={onAdd} 
        className="flex items-center px-6 py-3 bg-[#053D1C] text-white rounded-xl hover:bg-black transition-all shadow-lg text-sm font-bold"
      >
        <Plus size={18} className="mr-2" /> Add New Book
      </button>
    </div>
  );
};

export default BookHeader;