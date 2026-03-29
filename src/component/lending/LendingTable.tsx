import React from 'react';
import { Book as BookIcon, User, Calendar, Trash2, Loader2, RotateCcw, CheckCircle2 } from 'lucide-react';

interface LendingTableProps {
  lendings: any[];
  loading: boolean;
  onReturn: (id: any) => void;
  onDelete: (id: any) => void;
}

const LendingTable: React.FC<LendingTableProps> = ({ lendings, loading, onReturn, onDelete }) => {
  if (loading) return (
    <div className="py-24 text-center text-gray-400 bg-white rounded-[32px] border border-gray-100">
      <Loader2 className="animate-spin mx-auto mb-4 text-[#053D1C]" size={40} />
      <p className="text-sm font-medium animate-pulse">Synchronizing Server...</p>
    </div>
  );

  return (
    <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-100 font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Lending Info</th>
              <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Dates</th>
              <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {lendings.length > 0 ? (
              lendings.map((lending) => (
                <tr key={lending.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm font-bold text-[#1A3C1A]">
                        <BookIcon size={15} className="mr-2 text-green-600" /> {lending.bookId}
                      </div>
                      <div className="flex items-center text-xs text-gray-400 font-medium ml-[22px]">
                        <User size={12} className="mr-1.5" /> NIC: {lending.userNIC}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-[12px] font-bold text-gray-600">Issued: {lending.lendingDate}</div>
                    <div className={`text-[12px] font-bold mt-1 ${lending.returned ? 'text-gray-400' : 'text-red-500'}`}>Due: {lending.dueDate}</div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold border ${lending.returned ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
                      {lending.returned ? 'RETURNED' : 'PENDING'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end space-x-2">
                      {!lending.returned ? (
                        <button 
                          onClick={() => onReturn(lending.id)} 
                          className="flex items-center px-4 py-2 bg-[#053D1C]/5 text-[#053D1C] hover:bg-[#053D1C] hover:text-white rounded-xl transition-all font-bold text-[11px] border border-[#053D1C]/10"
                        >
                          <RotateCcw size={14} className="mr-2" strokeWidth={3}/> Return
                        </button>
                      ) : (
                        <div className="flex items-center text-gray-300 px-4 py-2 text-[11px] font-bold">
                          <CheckCircle2 size={14} className="mr-2" /> Completed
                        </div>
                      )}
                      
                      <button 
                        onClick={() => onDelete(lending.id)} 
                        className="p-2.5 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="py-20 text-center text-gray-300 font-medium">No lending records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LendingTable;