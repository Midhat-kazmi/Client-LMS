"use client";
import React, { useState, FC } from "react";
import { useUpdatePasswordMutation } from "@/redux/features/auth/authApi";

const ChangePassword: FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      await updatePassword({ oldPassword, newPassword }).unwrap();
      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      alert(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700 ml-50"
    >
      <h2 className="text-xl font-semibold mb-5 dark:text-gray-100">
        Change Password
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Old Password"
          className="input-style"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="input-style"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="input-style"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          disabled={isLoading}
          className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
