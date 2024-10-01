import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaChevronDown,
  FaUser,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMenu(false);
  };

  return (
    <nav className="font-sans">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <img
            src={assets?.logo}
            alt="Prescripto"
            className="w-36 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {isMobile ? (
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-primary focus:outline-none"
            >
              <FaBars className="h-6 w-6" />
            </button>
          ) : (
            <ul className="flex items-center space-x-6">
              <NavLink to="/" className="nav-link">
                <AiOutlineHome className="mr-1 inline-block" /> Home
              </NavLink>
              <NavLink to="/doctors" className="nav-link">
                <AiOutlineUser className="mr-1 inline-block" /> All Doctors
              </NavLink>
              <NavLink to="/about" className="nav-link">
                <AiOutlineInfoCircle className="mr-1 inline-block" /> About
              </NavLink>
              <NavLink to="/contact-us" className="nav-link">
                <AiOutlinePhone className="mr-1 inline-block" /> Contact
              </NavLink>
            </ul>
          )}

          {token ? (
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 rounded-full bg-gray-100 p-2 hover:bg-gray-200 focus:outline-none"
              >
                <img
                  src={assets.profile_pic}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                <FaChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                  <a
                    href="/my-profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaUser className="mr-2" /> My Profile
                  </a>
                  <a
                    href="/my-appointments"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaCalendarAlt className="mr-2" /> My Appointments
                  </a>
                  <button
                    onClick={() => setToken(false)}
                    className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => navigate("/login")}
            >
              Create Account
            </button>
          )}
        </div>

        {isMobile && showMenu && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <NavLink
              to="/"
              className="block py-2 text-sm hover:text-primary"
              onClick={toggleMenu}
            >
              <AiOutlineHome className="mr-2 inline-block" /> Home
            </NavLink>
            <NavLink
              to="/doctors"
              className="block py-2 text-sm hover:text-primary"
              onClick={toggleMenu}
            >
              <AiOutlineUser className="mr-2 inline-block" /> All Doctors
            </NavLink>
            <NavLink
              to="/about"
              className="block py-2 text-sm hover:text-primary"
              onClick={toggleMenu}
            >
              <AiOutlineInfoCircle className="mr-2 inline-block" /> About
            </NavLink>
            <NavLink
              to="/contact-us"
              className="block py-2 text-sm hover:text-primary"
              onClick={toggleMenu}
            >
              <AiOutlinePhone className="mr-2 inline-block" /> Contact
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
