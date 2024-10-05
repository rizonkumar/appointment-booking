import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUserMd, FaList } from "react-icons/fa";

const Sidebar = () => {
  const navItems = [
    { icon: FaHome, text: "Dashboard", path: "/admin-dashboard" },
    { icon: FaCalendarAlt, text: "Appointments", path: "/all-appointments" },
    { icon: FaUserMd, text: "Add Doctor", path: "/add-doctor" },
    { icon: FaList, text: "Doctor List", path: "/doctor-list" },
  ];

  return (
    <div className="hidden min-h-screen w-64 border-r border-gray-200 bg-white sm:block">
      <nav className="mt-5">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-gray-600 transition-colors duration-200 hover:bg-gray-100 ${
                isActive
                  ? "border-primary-dark text-primary-dark border-r-4 bg-[#F2F3FF] font-semibold"
                  : "hover:text-primary-dark"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`text-xl ${isActive ? "text-primary-dark" : ""}`}
                />
                <span>{item.text}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
