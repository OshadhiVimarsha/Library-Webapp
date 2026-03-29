import React, { useEffect, useState } from 'react';
import { X, User, BookOpen, Calendar, Loader2 } from 'lucide-react';
import { createLending } from '../../api/lendingService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LendingModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userNIC: '',
    bookId: '',
    lendingDate: new Date().toISOString().split('T')[0],
    dueDate: ''
  });

  useEffect(() => {
    if (isOpen) {
      const date = new Date();
      date.setDate(date.getDate() + 14);
      setFormData(prev => ({ 
        ...prev, 
        dueDate: date.toISOString().split('T')[0],
        userNIC: '',
        bookId: '' 
      }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createLending({ ...formData, returned: false });
      onSuccess();
      onClose();
    } catch (error) {
      alert("Error creating lending record. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl animate-in fade-in zoom-in duration-200 border border-gray-100">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1A3C1A]">Issue New Book</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-400" /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Borrower NIC</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input required className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-green-500/20 outline-none transition-all" placeholder="Member NIC" value={formData.userNIC} onChange={e => setFormData({...formData, userNIC: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Book ID</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input required className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-green-500/20 outline-none transition-all" placeholder="Book Identifier" value={formData.bookId} onChange={e => setFormData({...formData, bookId: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Issue Date</label>
                <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none" value={formData.lendingDate} readOnly />
              </div>
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Due Date</label>
                <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none font-bold text-red-500" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
              </div>
            </div>

            <button disabled={submitting} type="submit" className="w-full bg-[#053D1C] text-white py-4 rounded-2xl font-bold text-sm shadow-lg hover:bg-black transition-all flex items-center justify-center mt-4">
              {submitting ? <Loader2 className="animate-spin mr-2" size={18} /> : 'Confirm Lending'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LendingModal;