import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="mb-5 flex items-center justify-between border-b border-b-gray-400 py-4 text-sm">
      <img src={assets?.logo} alt="logo" className="w-44 cursor-pointer" />
      <ul className="hidden items-start gap-5 font-medium md:flex">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
        </NavLink>
        <NavLink to="/contact-us">
          <li className="py-1">Contact</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="group relative flex cursor-pointer items-center gap-2">
            <img
              src={assets.profile_pic}
              alt="profile"
              className="w-8 rounded-full"
            />
            <img src={assets.dropdown_icon} alt="drop-down" className="w-2.5" />
            <div className="absolute right-0 top-0 z-20 hidden pt-14 text-base font-medium text-gray-600 group-hover:block">
              <div className="flex min-w-48 flex-col gap-4 rounded bg-stone-100 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="cursor-pointer hover:text-black"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary hidden rounded-full px-8 py-3 font-light text-white md:block"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
