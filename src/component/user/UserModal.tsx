import React, { useEffect, useState } from 'react';
import { createUser, updateUser } from '../../api/userService';
import { X, Save } from 'lucide-react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchUsers: () => void;
  selectedUser?: any;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, fetchUsers, selectedUser }) => {
  const [formData, setFormData] = useState({
    nic: '', name: '', email: '', address: '', mobile: ''
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData({ nic: '', name: '', email: '', address: '', mobile: '' });
    }
  }, [selectedUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('nic', formData.nic.trim());
      data.append('name', formData.name.trim());
      data.append('email', formData.email.trim());
      
      data.append('address', formData.address ? formData.address.trim() : "");
      data.append('mobile', formData.mobile ? formData.mobile.trim() : "");

      if (selectedUser) {
        await updateUser(selectedUser.nic, data);
        alert("User Updated Successfully!");
      } else {
        await createUser(data);
        alert("User Created Successfully!");
      }

      fetchUsers();
      onClose();
    } catch (error: any) {
      console.error("Backend Error Detail:", error.response?.data);
      const msg = error.response?.data?.detail || error.response?.data?.message || "Action Failed!";
      alert("Error: " + msg);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[28px] overflow-hidden shadow-2xl animate-in zoom-in duration-200">
        <div className="px-8 py-6 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#1A3C1A]">
            {selectedUser ? "Update User Details" : "Add New User"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <input 
            value={formData.name}
            placeholder="Full Name"
            className="w-full p-3 bg-[#F1F3F1] rounded-xl outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              value={formData.nic}
              disabled={!!selectedUser} 
              placeholder="NIC Number"
              className={`p-3 rounded-xl outline-none ${selectedUser ? 'bg-gray-200' : 'bg-[#F1F3F1]'}`}
              onChange={(e) => setFormData({...formData, nic: e.target.value})}
              required
            />
            <input 
              type="email"
              value={formData.email}
              placeholder="Email Address"
              className="p-3 bg-[#F1F3F1] rounded-xl outline-none"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <input 
            value={formData.mobile}
            placeholder="Mobile Number"
            className="w-full p-3 bg-[#F1F3F1] rounded-xl outline-none"
            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
          />
          <textarea 
            value={formData.address}
            placeholder="Home Address"
            className="w-full p-3 bg-[#F1F3F1] rounded-xl outline-none resize-none"
            rows={2}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-500">Cancel</button>
            <button type="submit" className="flex-[2] py-3 bg-[#053D1C] text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg">
               <Save size={18} className="inline mr-2" /> {selectedUser ? "Update User" : "Save User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;