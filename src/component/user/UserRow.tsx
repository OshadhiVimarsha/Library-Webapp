import React from 'react';
import { User, Mail, MapPin, Phone, Pencil, Trash2 } from 'lucide-react';

interface UserRowProps {
  user: any;
  onDelete: (nic: string) => void;
  onEdit: () => void; 
}

const UserRow: React.FC<UserRowProps> = ({ user, onDelete, onEdit }) => (
  <tr className="hover:bg-gray-50/50 transition-colors group">
    <td className="px-8 py-5">
      <div className="flex items-center">
        <div className="w-9 h-9 bg-green-50 text-[#053D1C] rounded-full mr-3 flex items-center justify-center font-bold text-xs border border-green-100 group-hover:bg-white">
          {user.name ? user.name.charAt(0).toUpperCase() : <User size={14}/>}
        </div>
        <span className="text-sm font-bold text-[#1A3C1A]">{user.name}</span>
      </div>
    </td>
    <td className="px-8 py-5 text-sm text-gray-600 font-medium">{user.nic}</td>
    <td className="px-8 py-5">
      <div className="flex items-center text-sm text-gray-500 font-medium">
        <Mail size={14} className="mr-2 text-gray-300" />
        {user.email}
      </div>
    </td>
    <td className="px-8 py-5">
      <div className="flex items-center text-sm text-gray-500 font-medium">
        <MapPin size={14} className="mr-2 text-gray-300" />
        {user.address || "N/A"}
      </div>
    </td>
    <td className="px-8 py-5">
      <div className="flex items-center text-sm text-gray-500 font-medium">
        <Phone size={14} className="mr-2 text-gray-300" />
        {user.mobile || "N/A"}
      </div>
    </td>
    <td className="px-8 py-5 text-right">
      <div className="flex items-center justify-end space-x-2">
        <button 
          onClick={onEdit}
          className="p-2 text-[#053D1C] hover:bg-green-50 rounded-lg transition-colors"
          title="Edit User"
        >
          <Pencil size={16} strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onDelete(user.nic)}
          className="p-2 text-[#C53030] hover:bg-red-50 rounded-lg transition-colors"
          title="Delete User"
        >
          <Trash2 size={16} strokeWidth={2.5} />
        </button>
      </div>
    </td>
  </tr>
);

export default UserRow;