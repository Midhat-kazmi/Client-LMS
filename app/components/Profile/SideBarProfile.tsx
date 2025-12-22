"use client";
import React, { FC } from "react";
import Link from "next/link";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { MdOutlineLibraryBooks, MdAdminPanelSettings } from "react-icons/md";
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
 setActive,
  logOutHandler,
}) => {
  const menuItems = [
    { id: 1, name: "Profile Info", icon: <AiOutlineUser size={22} />, path: null },
    { id: 2, name: "Change Password", icon: <AiOutlineLock size={22} />, path: null },
    {
      id: 3,
      name: user?.role === "admin" ? "Admin Dashboard" : "My Courses",
      icon: user?.role === "admin" ? <MdAdminPanelSettings size={22} /> : <MdOutlineLibraryBooks size={22} />,
      path: user?.role === "admin" ? "/admin" : null,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-4rem)] py-6 px-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      

      {/* Menu Items */}
      <ul className="flex-1 flex flex-col gap-3">
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.path ? (
              <Link
                href={item.path}
                className={`flex items-center gap-4 px-5 py-3 rounded-lg transition-colors
                  ${active === item.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-purple-700/30"
                  }`}
                onClick={() => setActive(item.id)}
              >
                {item.icon}
                <span className="font-medium text-base">{item.name}</span>
              </Link>
            ) : (
              <button
                className={`w-full text-left flex items-center gap-4 px-5 py-3 rounded-lg transition-colors
                  ${active === item.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-purple-700/30"
                  }`}
                onClick={() => setActive(item.id)}
              >
                {item.icon}
                <span className="font-medium text-base">{item.name}</span>
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Logout */}
      {user && (
        <div >
          <button
            onClick={logOutHandler}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition-all"
          >
            <FiLogOut size={22} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBarProfile;
