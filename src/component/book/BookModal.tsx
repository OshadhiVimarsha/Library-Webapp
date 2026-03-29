import React, { useEffect, useState } from 'react';
import { createBook, updateBook } from '../../api/bookService';
import { X, Save, Upload } from 'lucide-react';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchBooks: () => void;
  selectedBook?: any;
}

const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose, fetchBooks, selectedBook }) => {
  const [formData, setFormData] = useState({
    id: '', title: '', author: '', category: '', publishedYear: '', available: true
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedBook) {
      setFormData({
        id: selectedBook.id,
        title: selectedBook.title,
        author: selectedBook.author,
        category: selectedBook.category,
        publishedYear: selectedBook.publishedYear || '',
        available: selectedBook.available ?? true
      });
    } else {
      setFormData({ id: '', title: '', author: '', category: '', publishedYear: '', available: true });
      setFile(null);
    }
  }, [selectedBook, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('id', formData.id);
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('category', formData.category);
    data.append('publishedYear', formData.publishedYear.toString());
    data.append('available', String(formData.available));
    
    if (file) data.append('coverImage', file);

    try {
      if (selectedBook) {
        await updateBook(selectedBook.id, data);
        alert("Book Updated!");
      } else {
        await createBook(data);
        alert("Book Saved!");
      }
      fetchBooks();
      onClose();
    } catch (error: any) {
      alert(error.response?.data?.message || "Action Failed!");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-8 py-5 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">{selectedBook ? 'Edit Book' : 'Add New Book'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <input 
            placeholder="Book ID (e.g. B001)" 
            disabled={!!selectedBook}
            className="w-full p-3 bg-gray-100 rounded-xl outline-none text-sm disabled:opacity-50"
            value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} required 
          />
          <input 
            placeholder="Book Title" 
            className="w-full p-3 bg-gray-100 rounded-xl outline-none text-sm"
            value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required 
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              placeholder="Author" 
              className="p-3 bg-gray-100 rounded-xl outline-none text-sm"
              value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} required 
            />
            <input 
              placeholder="Category" 
              className="p-3 bg-gray-100 rounded-xl outline-none text-sm"
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required 
            />
          </div>
          <input 
            type="number" placeholder="Published Year" 
            className="w-full p-3 bg-gray-100 rounded-xl outline-none text-sm"
            value={formData.publishedYear} onChange={e => setFormData({...formData, publishedYear: e.target.value})} 
          />
          
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-4 bg-white text-gray-400 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:bg-gray-50">
              <Upload size={20} />
              <span className="mt-2 text-xs">{file ? file.name : 'Upload Cover Image'}</span>
              <input type='file' className="hidden" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-500">Cancel</button>
            <button type="submit" className="flex-[2] py-3 bg-[#053D1C] text-white rounded-xl font-bold flex items-center justify-center hover:bg-black transition-all">
              <Save size={18} className="mr-2" /> Save Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;