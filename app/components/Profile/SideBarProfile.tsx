"use client";
import React, { FC } from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

interface SideBarProfileProps {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (value: number) => void;
  logOutHandler: () => void;
}

const SideBarProfile: FC<SideBarProfileProps> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const menuItems = [
    { id: 1, name: "Profile Info", icon: <AiOutlineUser size={22} /> },
    { id: 2, name: "Change Password", icon: <AiOutlineLock size={22} /> },
    { id: 3, name: "My Courses", icon: <MdOutlineLibraryBooks size={22} /> },
  ];

  return (
    <div className="flex flex-col justify-between h-full p-6 w-full bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      {/* User Info */}
      {user && (
        <div className="flex flex-col items-center mb-8">
          <img
            src={user.avatar || avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-purple-600 object-cover"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
            {user.name}
          </h2>
        </div>
      )}

      {/* Menu Items */}
      <ul className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-4 px-5 py-3 rounded-lg cursor-pointer transition-colors
              ${
                active === item.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-purple-700/30"
              }`}
            onClick={() => setActive(item.id)}
          >
            {item.icon}
            <span className="font-medium text-base">{item.name}</span>
          </li>
        ))}
      </ul>

      {/* Logout */}
      {user && (
        <button
          onClick={logOutHandler}
          className="mt-8 w-full flex items-center justify-center gap-3 px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition-all"
        >
          <FiLogOut size={22} />
          Logout
        </button>
      )}
    </div>
  );
};

export default SideBarProfile;
