import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { blockUser, deleteUser, getAllUsers } from "../serveces/userService";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const {
    data: userData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  console.log("users in page", userData)

  const users = userData ?? [];

  // console.log("object",users)

  const handleViewUser = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleDeleteUser = (userId) => {
    mutation.mutate(userId);
  };

  const handleBlock = (userId) => {
    mutationBlock.mutate(userId)
  }
    const mutationBlock = useMutation({
    mutationFn: blockUser,
    onSuccess: (data) => {
      console.log(data.message);
      refetch();
    },
    onError: (error) => {
      console.error("User is not Blocked", error);
    },
  });

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      console.log(data.message);
      refetch();
    },
    onError: (error) => {
      console.error("User is not deleted", error);
    },
  });

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
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => handleViewUser(user._id)}
                    >
                      View
                    </button>
                    <button
                      className={`${
                        user.isBlock ? "text-green-500" : "text-orange-500"
                      } hover:underline mr-2`}
                      onClick={() => handleBlock(user._id)}
                    >
                      {user.isBlock ? "Unblock" : "Block"}
                    </button>

                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
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
