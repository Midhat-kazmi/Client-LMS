"use client";
import React, { FC } from "react";

interface ProfileInfoProps {
  user: any;
  avatar: any;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ user, avatar }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Profile Information
      </h2>

      <div className="flex flex-col md:flex-row gap-10">

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={user?.avatar?.url || avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-36 h-36 rounded-full border-4 border-purple-500 shadow-md object-cover"
          />
        </div>

        {/* Info Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h4 className="text-sm text-gray-500 dark:text-gray-400">Name</h4>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {user?.name || "-"}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h4 className="text-sm text-gray-500 dark:text-gray-400">Email</h4>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {user?.email || "-"}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <h4 className="text-sm text-gray-500 dark:text-gray-400">Joined</h4>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
