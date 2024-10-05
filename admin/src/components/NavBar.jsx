import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/adminContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };
  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-3 sm:px-10">
      <div className="flex items-center gap-2 text-xs">
        <img
          src={assets.admin_logo}
          alt="admin logo"
          className="w-36 cursor-pointer sm:w-40"
        />
        <p className="rounded-full border border-gray-500 px-2.5 py-0.5 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-primary-dark rounded-full px-10 py-2 text-sm text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
