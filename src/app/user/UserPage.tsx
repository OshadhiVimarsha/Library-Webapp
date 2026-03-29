import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../api/userService'; 
import Header from './../../component/user/Header';
import SearchBar from './../../component/user/SearchBar';
import UserRow from './../../component/user/UserRow';
import UserModal from './../../component/user/UserModal'; 

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null); // Edit සඳහා තෝරාගත් User

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data || []); 
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (nic: string) => {
    if (window.confirm(`Are you sure you want to delete user with NIC: ${nic}?`)) {
      try {
        await deleteUser(nic);
        alert("User deleted successfully!");
        fetchUsers();
      } catch (error: any) {
        alert("Delete failed: " + (error.response?.data?.message || "Server Error"));
      }
    }
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user); // Modal එකට දත්ත යවන්න කලින් user ව set කරන්න
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Modal එක වහද්දි දත්ත හිස් කරන්න
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.nic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F9F8]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#053D1C]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9F8] p-6 md:p-12 font-sans text-[#1A3C1A]">
      <div className="max-w-7xl mx-auto">
        
        <Header 
  count={users.length} 
  onAddClick={() => {
    setSelectedUser(null); // වැදගත්: කලින් Edit කරපු කෙනාගේ දත්ත අයින් කරන්න
    setIsModalOpen(true);
  }} 
/>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden border border-gray-50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/30">
                  <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">User Name</th>
                  <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">NIC</th>
                  <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email</th>
                  <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Address</th>
                  <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Mobile</th>
                  <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map((user) => (
                  <UserRow 
                    key={user.nic} 
                    user={user} 
                    onDelete={handleDelete} 
                    onEdit={() => handleEdit(user)} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <UserModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          fetchUsers={fetchUsers} 
          selectedUser={selectedUser} 
        />
        
      </div>
    </div>
  );
};

export default UserManagement;