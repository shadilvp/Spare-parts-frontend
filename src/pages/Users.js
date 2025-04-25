import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllUsers } from "../serveces/userService";

const Users = () => {
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getAllUsers,
  });

  const users = Array.isArray(userData?.data)
    ? userData?.data
    : userData?.data
    ? [userData.data]
    : [];

  return (
    <div className="p-6 text-white ml-64">
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>

      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load users</p>
      ) : (
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700">
              <th className="text-center px-4 py-4">User ID</th>
              <th className="text-center px-4 py-4">Name</th>
              <th className="text-center px-4 py-4">Email</th>
              <th className="text-center px-4 py-4">Role</th>
              <th className="text-center px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-t border-gray-700">
                  <td className="px-4 py-4 text-center">{user._id}</td>
                  <td className="px-4 py-4 text-center">{user.name}</td>
                  <td className="px-4 py-4 text-center">{user.email}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-3 py-1 rounded-lg text-sm font-medium bg-purple-600 text-white">
                      {user.roll}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="text-blue-500 hover:underline mr-2">View</button>
                    <button className="text-yellow-500 hover:underline mr-2">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
