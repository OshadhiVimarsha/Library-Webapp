import React, { useEffect, useState } from 'react';
import { getAllLendings, returnBook, deleteLending } from '../../api/lendingService';
import LendingHeader from './../../component/lending/LendingHeader';
import LendingTable from './../../component/lending/LendingTable';
import LendingModal from './../../component/lending/LendingModal';

const LendingPage: React.FC = () => {
  const [lendings, setLendings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLendings = async () => {
    try {
      setLoading(true);
      const response = await getAllLendings();
      setLendings(response.data || []);
    } catch (error) {
      console.error("Error fetching lendings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLendings(); }, []);

  // Return Function - Direct API Call
  const handleReturn = async (id: any) => {
    if (window.confirm("Mark this book as returned?")) {
      try {
        await returnBook(id);
        alert("Success: Book returned!");
        fetchLendings(); 
      } catch (error) {
        alert("Error: Could not process return.");
      }
    }
  };

  // Delete Function
  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteLending(id);
        alert("Record deleted!");
        fetchLendings();
      } catch (error) {
        alert("Delete failed!");
      }
    }
  };

  const filteredLendings = lendings
    .filter(l => 
      l.bookId?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      l.userNIC?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.id - b.id); 

  return (
    <div className="min-h-screen bg-[#F8F9F8] p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <LendingHeader 
          totalRecords={lendings.length} 
          onSearch={setSearchTerm} 
          onOpenModal={() => setIsModalOpen(true)} 
        />

        <LendingTable 
          lendings={filteredLendings} 
          loading={loading} 
          onReturn={handleReturn} 
          onDelete={handleDelete} 
        />

        <LendingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchLendings} 
        />

      </div>
    </div>
  );
};

export default LendingPage;