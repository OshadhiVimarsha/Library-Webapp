import React, { useEffect, useState } from 'react';
import { getAllBooks, deleteBook } from '../../api/bookService';
import { BookOpen } from 'lucide-react';
import BookModal from '../../component/book/BookModal';
import BookRow from '../../component/book/BookRow';
import BookHeader from '../../component/book/BookHeader';
import SearchBar from '../../component/book/SearchBar';

const BookManagement: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getAllBooks();
      setBooks([]); 
      setTimeout(() => {
          setBooks(response.data || []);
      }, 10);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        fetchBooks();
      } catch (error) { alert("Delete Failed!"); }
    }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9F8] p-6 md:p-12 font-sans text-[#1A3C1A]">
      <div className="max-w-7xl mx-auto">
        
        <BookHeader count={books.length} onAdd={() => { setSelectedBook(null); setIsModalOpen(true); }} />
        
        <SearchBar onSearch={setSearchTerm} />

        <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center w-20">Cover</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Book Info</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Author</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Year</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                  <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <BookRow 
                      key={book.id} 
                      book={book} 
                      onEdit={(b) => { setSelectedBook(b); setIsModalOpen(true); }} 
                      onDelete={handleDelete} 
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center opacity-20">
                        <BookOpen size={48} className="mb-4" />
                        <p className="text-lg font-bold uppercase tracking-widest">No Books Found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <BookModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          fetchBooks={fetchBooks} 
          selectedBook={selectedBook} 
        />
      </div>
    </div>
  );
};

export default BookManagement;