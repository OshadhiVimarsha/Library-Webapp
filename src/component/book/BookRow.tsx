import React from 'react';
import { Pencil, Trash2, Calendar } from 'lucide-react';
import { getBookCoverUrl } from '../../api/bookService';

interface BookRowProps {
  book: any;
  onEdit: (book: any) => void;
  onDelete: (id: string) => void;
}

const BookRow: React.FC<BookRowProps> = ({ book, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50/30 transition-colors group">
      <td className="px-8 py-4">
        <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden shadow-sm flex-shrink-0 mx-auto">
          <img 
            src={`${getBookCoverUrl(book.id)}?v=${new Date().getTime()}`} 
            alt={book.title}
            className="w-full h-full object-cover" 
            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150?text=No+Cover")}
          />
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-bold text-[#1A3C1A] leading-tight">{book.title}</p>
          <p className="text-xs text-gray-400 mt-1 font-medium italic">{book.id}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-sm font-semibold text-gray-600">{book.author}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-xs font-semibold text-gray-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100/50">
          {book.category}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center text-xs font-bold text-gray-500">
          <Calendar size={12} className="mr-1.5 text-gray-300" />
          {book.publishedYear || "N/A"}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-tighter border ${
          book.available 
          ? 'bg-green-100 text-green-700 border-green-200' 
          : 'bg-red-100 text-red-700 border-red-200'
        }`}>
          {book.available ? 'AVAILABLE' : 'BORROWED'}
        </span>
      </td>
      <td className="px-8 py-4 text-right">
        <div className="flex items-center justify-end space-x-1">
          <button 
            onClick={() => onEdit(book)} 
            className="p-2.5 text-[#053D1C] hover:bg-green-50 rounded-xl transition-colors"
          >
            <Pencil size={18} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => onDelete(book.id)} 
            className="p-2.5 text-[#C53030] hover:bg-red-50 rounded-xl transition-colors"
          >
            <Trash2 size={18} strokeWidth={2.5} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookRow;