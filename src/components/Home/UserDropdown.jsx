import React, { useState } from "react";
import { FaUser, FaDatabase, FaCog, FaBars, FaPowerOff, FaPlusSquare } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth/userSlice";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutButton = () => {
    dispatch(logout());
  }

  const subAdminBtn = () => {
    navigate("/addSubAdmin")

  }

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-white text-black px-4 py-2 rounded-full shadow-md border border-gray-300"
      >
        <img
          src="https://i.pravatar.cc/40" // Placeholder Avatar
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        <div className="ml-2 text-left">
          <p className="text-sm font-semibold">Superadmin</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
        <span className="ml-2 text-gray-600">&#9662;</span> {/* Dropdown Arrow */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute overflow-hidden right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="overflow-hidden">
            {/* <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
              <FaUser className="text-gray-600" /> <span className="text-gray-600">My Profile</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
              <FaDatabase className="text-gray-600" /> <span className="text-gray-600">Backup</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
              <FaCog className="text-gray-600" /> <span className="text-gray-600">Setting</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
              <FaBars className="text-gray-600" /> <span className="text-gray-600">Sidebar</span>
            </li> */}
            <li onClick={logoutButton} className="px-4 py-2 hover:bg-blue-100 flex items-center space-x-2 cursor-pointer text-blue-500">
              <FaPlusSquare className="text-blue-500" /> <span className="text-gray-600">Add Sub Admin</span>
            </li>
            <li onClick={subAdminBtn} className="px-4 py-2 hover:bg-red-100 flex items-center space-x-2 cursor-pointer text-red-500">
              <FaPowerOff className="text-red-500" /> <span className="text-gray-600">Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
