import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/adminContext";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaUserMd,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";

const NavBar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  const navItems = [
    { icon: FaHome, text: "Dashboard", path: "/admin-dashboard" },
    { icon: FaCalendarAlt, text: "Appointments", path: "/all-appointments" },
    { icon: FaUserMd, text: "Add Doctor", path: "/add-doctor" },
    { icon: FaList, text: "Doctor List", path: "/doctor-list" },
  ];

  return (
    <>
      {/* Desktop NavBar */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
        <div className="flex items-center gap-2">
          <img
            src={assets.admin_logo}
            alt="Prescripto logo"
            className="w-36 cursor-pointer sm:w-40"
          />
          <p className="rounded-full border border-gray-500 px-2.5 py-0.5 text-xs text-gray-600">
            {aToken ? "Admin" : "Doctor"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-primary hover:bg-primary-dark hidden items-center gap-2 rounded-full px-4 py-2 text-white transition-colors duration-200 sm:flex"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 focus:outline-none sm:hidden"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden">
          <div className="fixed bottom-0 left-0 top-0 w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b p-4">
              <img
                src={assets.admin_logo}
                alt="Prescripto logo"
                className="w-32"
              />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-600 focus:outline-none"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="py-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-gray-600 transition-colors duration-200 hover:bg-gray-100"
                >
                  <item.icon />
                  <span>{item.text}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition-colors duration-200 hover:bg-red-100"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
