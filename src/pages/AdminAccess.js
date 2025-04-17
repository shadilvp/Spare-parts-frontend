import React, { useState } from "react";
import { MdAddModerator } from "react-icons/md";
import { TbTrashFilled } from "react-icons/tb";

const AdminAccess = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Muhsin",
      role: "CEO",
      image: "https://i.ibb.co/xqNYnzWW/Whats-App-Image-2025-04-16-at-12-54-37-AM.jpg",
    },
    {
      id: 2,
      name: "Hadil",
      role: "Managing Director",
      image: "https://i.ibb.co/vxtWgL54/sss.png",
    },
    {
      id: 3,
      name: "Rahil Hameed",
      role: "Finantial Director",
      image: "https://i.ibb.co/p65sw3qm/Screenshot-2025-04-16-004533.png",
    },
  ]);

  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");

  const handleDelete = (id) => {
  };

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
                <img
                  src={admin.image}
                  alt={admin.name}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => handleImageClick(admin.image)}
                />
              </td>
              <td className="py-2 px-4 text-center">{admin.name}</td>
              <td className="py-2 px-4 text-center">{admin.role}</td>
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
