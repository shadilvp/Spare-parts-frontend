import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Muhsin", mobile: "+91 9744971200", status: "Active" },
    { id: 2, name: "Hadil", mobile: "+91 8281529106", status: "Blocked" },
    { id: 3, name: "Rahil", mobile: "+91 7736449700", status: "Active" },
    { id: 4, name: "Ameen", mobile: "+91 9000000001", status: "Active" },
    { id: 5, name: "Fahad", mobile: "+91 9000000002", status: "Blocked" },
    { id: 6, name: "Nihal", mobile: "+91 9000000003", status: "Active" },
    { id: 7, name: "Shamil", mobile: "+91 9000000004", status: "Blocked" },
    { id: 8, name: "Jabir", mobile: "+91 9000000005", status: "Active" },
    { id: 9, name: "Sameer", mobile: "+91 9000000006", status: "Active" },
    { id: 10, name: "Ashraf", mobile: "+91 9000000007", status: "Blocked" },
    { id: 11, name: "Iqbal", mobile: "+91 9000000008", status: "Active" },
    { id: 12, name: "Haneefa", mobile: "+91 9000000009", status: "Blocked" },
    { id: 13, name: "Adil", mobile: "+91 9000000010", status: "Active" },
    { id: 14, name: "Suhail", mobile: "+91 9000000011", status: "Active" },
    { id: 15, name: "Thajudeen", mobile: "+91 9000000012", status: "Blocked" },
    { id: 16, name: "Nashid", mobile: "+91 9000000013", status: "Active" },
    { id: 17, name: "Azhar", mobile: "+91 9000000014", status: "Blocked" },
    { id: 18, name: "Ashique", mobile: "+91 9000000015", status: "Active" },
    { id: 19, name: "Junaid", mobile: "+91 9000000016", status: "Blocked" },
    { id: 20, name: "Farhan", mobile: "+91 9000000017", status: "Active" },
    { id: 21, name: "Imran", mobile: "+91 9000000018", status: "Blocked" },
    { id: 22, name: "Najeeb", mobile: "+91 9000000019", status: "Active" },
    { id: 23, name: "Zubair", mobile: "+91 9000000020", status: "Blocked" },
    { id: 24, name: "Rashid", mobile: "+91 9000000021", status: "Active" },
    { id: 25, name: "Muneer", mobile: "+91 9000000022", status: "Active" },
    { id: 26, name: "Fayiz", mobile: "+91 9000000023", status: "Blocked" },
    { id: 27, name: "Hisham", mobile: "+91 9000000024", status: "Active" },
    { id: 28, name: "Basith", mobile: "+91 9000000025", status: "Blocked" },
    { id: 29, name: "Shereef", mobile: "+91 9000000026", status: "Active" },
    { id: 30, name: "Niyas", mobile: "+91 9000000027", status: "Blocked" },
    { id: 31, name: "Rizwan", mobile: "+91 9000000028", status: "Active" },
    { id: 32, name: "Yusuf", mobile: "+91 9000000029", status: "Blocked" },
    { id: 33, name: "Shamir", mobile: "+91 9000000030", status: "Active" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 text-white ml-64">
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>

      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700">
            <th className="text-center px-4 py-4">User ID</th>
            <th className="text-center px-4 py-4">Name</th>
            <th className="text-center px-4 py-4">Mobile</th>
            <th className="text-center px-4 py-4">Status</th>
            <th className="text-center px-4 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-700">
                <td className="px-4 py-4 text-center">{user.id}</td>
                <td className="px-4 py-4 text-center">{user.name}</td>
                <td className="px-4 py-4 text-center">{user.mobile}</td>
                <td className="px-4 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium 
                      ${
                        user.status === "Active"
                          ? "bg-green-600 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <button className="text-blue-500 hover:underline mr-2">View</button>
                  <button className="text-yellow-500 hover:underline mr-2">Edit</button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(user.id)}
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

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-3 bg-gray-700 rounded-full hover:bg-gray-600 disabled:opacity-50"
        >
          <IoIosArrowBack />

        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={`px-4 py-2 rounded-full ${
              currentPage === index + 1
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-3 bg-gray-700 rounded-full hover:bg-gray-600 disabled:opacity-50"
        >
          <IoIosArrowForward />

        </button>
      </div>
    </div>
  );
};

export default Users;
