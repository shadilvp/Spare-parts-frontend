import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiSolidOffer } from "react-icons/bi";
import { FaChartBar, FaBell, FaBook } from "react-icons/fa";
import { GiScooter } from "react-icons/gi";
import { HiMiniHome } from "react-icons/hi2";
import { IoIosChatbubbles, IoIosSettings, IoIosWallet } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { fetchLogineduser } from "../serveces/userService";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showImagePopup, setShowImagePopup] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchLogineduser,
  });

  // console.log("data",data?.data)

  const userData = data?.data?.name

  // console.log("data",userData)

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDark = () => setDarkMode(!darkMode);

  if(isLoading){
    <h1>Page IS Loading</h1>
  }
    if(error){
    <h1>cant fetch data there is an error occured</h1>
  }

      const menu = [
        { name: "Dashboard", icon: <HiMiniHome />, path: "/dashboard" },
        { name: "Products", icon: <PiShoppingCartSimpleFill />, path: "/products" },
        { name: "Orders", icon: <FaChartBar />, path: "/orders" },
        { name: "Payments", icon: <IoIosWallet />, path: "/payments" },
        { name: "Offers", icon: <BiSolidOffer />, path: "/offers" },
        { name: "Users", icon: <IoPerson />, path: "/users" },
        { name: "Chat", icon: <IoIosChatbubbles />, path:"/chat"},
        { name: "Delivery", icon: <GiScooter />, path: "/delivery" },
        { name: "Reports", icon: <FaBook />, path: "/reports" },
        { name: "Notifications", icon: <FaBell />, path: "/notifications" },
        { name: "Settings", icon: <IoIosSettings />, path: "/settings" },
        { name: "AdminAccess", icon: <MdAdminPanelSettings />, path: "/admin-access" },
      ];

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex fixed">
        {/* Sidebar */}
        <div
          className={`fixed bg-white dark:bg-[#15192A] h-screen p-5 pt-8 overflow-y-auto overflow-x-hidden hide-scrollbar ${
            isOpen ? "w-64" : "w-20"
          } duration-300 relative`}
        >
          {/* Logo */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-4">
              <div className="bg-purple-600 text-white w-10 h-10 rounded-lg overflow-hidden">
                <img
                  className="rounded-lg cursor-pointer"
                  src="https://media-hosting.imagekit.io/abbfd095af3f4c23/Screenshot%202025-04-16%20004533.png?Expires=1839352706&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XenZyPPYbkVdVoN7XjkMmEXZz6kJnbHDg5V6VikutbTlQ8gk0VORx~hMbBZZmyKZRnrsWq9nIX1I2AjV0-Jp~Bqbo4xnmpuybh05TvA40CMrZNkSv-YwUQMoRQTkRGnOvDJFV~437vt2q80FfEdEqrR0p9etFoq1ohLQ9EYAnlg3FEmwuPzoaLtdGu-UPHF8fTrKPX1Y4ZfDiEn~T7mM-6t74GXMsOXePswsvMTWs6YFHMcUXWZV8l~tEbaq54uXWM222uZvWt6UGaDZZn~iZ61ky0LRjiiuyZERdlxJX-P0rniKMLLCq9Y377QLDXpHYh9e99ZLfmwYyMGf~Y7KyA__"
                  alt="BigCo Inc. logo"
                  onClick={() => setShowImagePopup(true)}
                />
              </div>
              {isOpen && (
                <div>
                  <h1 className="text-gray-900 dark:text-white font-bold text-xl">{userData}</h1>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">Admin panel</p>
                </div>
              )}
            </div>
            <span className="p-3 hover:bg-gray-800 rounded-full cursor-pointer transition-colors duration-200">
              <LuLogOut className="text-white text-xl" />
            </span>
          </div>

          {/* Menu Items */}
          <ul className="pt-6">
            {menu.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-x-2 text-sm py-2 px-4 rounded-md mt-2 transition-colors duration-200 
                  ${
                    isActive
                      ? "bg-purple-200 dark:bg-gray-800 text-purple-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Image Popup */}
        {showImagePopup && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center transition-opacity duration-300 ease-in-out">
            <div className="relative bg-white rounded-xl shadow-2xl transform scale-100 animate-fade-in">
              {/* Close Button */}
              <button
                className="absolute text-xl top-3 right-4 text-gray-600 hover:text-red-500 transition z-100"
                onClick={() => setShowImagePopup(false)}
              >
                ✖
              </button>
              {/* Popup Image */}
              <img
                src="https://media-hosting.imagekit.io/abbfd095af3f4c23/Screenshot%202025-04-16%20004533.png?Expires=1839352706&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XenZyPPYbkVdVoN7XjkMmEXZz6kJnbHDg5V6VikutbTlQ8gk0VORx~hMbBZZmyKZRnrsWq9nIX1I2AjV0-Jp~Bqbo4xnmpuybh05TvA40CMrZNkSv-YwUQMoRQTkRGnOvDJFV~437vt2q80FfEdEqrR0p9etFoq1ohLQ9EYAnlg3FEmwuPzoaLtdGu-UPHF8fTrKPX1Y4ZfDiEn~T7mM-6t74GXMsOXePswsvMTWs6YFHMcUXWZV8l~tEbaq54uXWM222uZvWt6UGaDZZn~iZ61ky0LRjiiuyZERdlxJX-P0rniKMLLCq9Y377QLDXpHYh9e99ZLfmwYyMGf~Y7KyA__"
                alt="Popup Logo"
                className="w-96 h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
