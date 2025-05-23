import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdAddModerator } from "react-icons/md";
import { TbTrashFilled } from "react-icons/tb";
import { deleteAdmin, getAllAdmins } from "../serveces/adminService";

const AdminAccess = () => {
  const {
    data: adminData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllAdmins,
  });

  const admins = adminData ?? [];

  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");

  const handleDelete = (adminId) => {
    mutation.mutate(adminId);
  };

    const mutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: (error) => {
      console.error("Admin is not deleted", error);
    },
  });

  const handleAddAdmin = () => {
    // Logic for adding new admin
  };

  const handleImageClick = (imageUrl) => {
    setPopupImageUrl(imageUrl);
    setShowImagePopup(true);
  };

  return (
    <div className="p-4 text-white ml-64">
      <div className="flex justify-between min-w-full items-center">
        <h1 className="text-2xl font-semibold mb-4">Admin Access & Roles</h1>
        <button
          onClick={handleAddAdmin}
          className="mb-4 px-3 py-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          <MdAddModerator />
        </button>
      </div>

      <table className="min-w-full rounded-table">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-4 px-4 text-center rounded-tl-xl">Profile</th>
            <th className="py-4 px-4 text-center">Name</th>
            <th className="py-4 px-4 text-center">Role</th>
            <th className="py-4 px-4 text-center rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="py-4 px-4 flex justify-center">
                {admin.profileImage ? (
                  <img
                    src={admin.profileImage}
                    alt={admin.name}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => handleImageClick(admin.profileImage)}
                  />
                ) : (
                  <div
                    onClick={() => handleImageClick(null)}
                    className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-semibold uppercase cursor-pointer"
                  >
                    {admin.name?.charAt(0) || "A"}
                  </div>
                )}
              </td>
              <td className="py-2 px-4 text-center">{admin.name}</td>
              <td className="py-2 px-4 text-center">{admin.adminRoll}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="text-red-600 hover:text-red-800 w-full flex justify-center"
                >
                  <TbTrashFilled />
                </button>
              </td>
            </tr>
          ))}

          {admins.length === 0 && (
            <tr>
              <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                No admins available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showImagePopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="relative bg-white rounded-xl shadow-2xl">
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-xl"
              onClick={() => setShowImagePopup(false)}
            >
              ✖
            </button>
            <img
              src={popupImageUrl}
              alt="Popup"
              className="w-96 h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccess;
