import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaChevronDown,
  FaUser,
  FaCalendarAlt,
  FaSignOutAlt,
  FaTimes,
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

  const NavLinks = ({ mobile, onClick }) => {
    const linkBaseClass = mobile
      ? "block py-2 text-sm hover:text-primary transition-colors duration-200"
      : "nav-link";

    const linkClass = ({ isActive }) =>
      `${linkBaseClass} ${isActive ? "text-primary font-semibold" : "text-gray-600"}`;

    return (
      <>
        <NavLink to="/" className={linkClass} onClick={onClick}>
          <AiOutlineHome className="mr-1 inline-block" /> Home
        </NavLink>
        <NavLink to="/doctors" className={linkClass} onClick={onClick}>
          <AiOutlineUser className="mr-1 inline-block" /> All Doctors
        </NavLink>
        <NavLink to="/about" className={linkClass} onClick={onClick}>
          <AiOutlineInfoCircle className="mr-1 inline-block" /> About
        </NavLink>
        <NavLink to="/contact" className={linkClass} onClick={onClick}>
          <AiOutlinePhone className="mr-1 inline-block" /> Contact
        </NavLink>
      </>
    );
  };

  const ProfileButton = ({ token, setToken }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return token ? (
      <div className="relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center space-x-2 rounded-full bg-gray-100 p-2 transition-colors duration-200 hover:bg-gray-200 focus:outline-none"
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
            <SidebarLink to="/my-profile" icon={FaUser} text="My Profile" />
            <SidebarLink
              to="/my-appointments"
              icon={FaCalendarAlt}
              text="My Appointments"
            />
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
        className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={() => navigate("/login")}
      >
        Create Account
      </button>
    );
  };

  const SidebarLink = ({ to, icon: Icon, text, onClick }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center rounded px-4 py-2 text-sm transition-colors duration-200 ${isActive ? "bg-blue-50 font-semibold text-primary" : "text-gray-700 hover:bg-gray-100"}`
      }
      onClick={onClick}
    >
      <Icon className="mr-2" /> {text}
    </NavLink>
  );

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
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              <FaBars className="h-6 w-6" />
            </button>
          ) : (
            <div className="flex items-center space-x-6">
              <NavLinks />
              <ProfileButton token={token} setToken={setToken} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Side Drawer */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={toggleMenu}
          ></div>
          <div className="absolute right-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4">
              <div className="flex justify-end">
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 hover:text-primary focus:outline-none"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-8 flex flex-col space-y-4">
                <NavLinks mobile onClick={toggleMenu} />
                <hr className="my-2" />
                {token ? (
                  <>
                    <SidebarLink
                      to="/my-profile"
                      icon={FaUser}
                      text="My Profile"
                      onClick={toggleMenu}
                    />
                    <SidebarLink
                      to="/my-appointments"
                      icon={FaCalendarAlt}
                      text="My Appointments"
                      onClick={toggleMenu}
                    />
                    <button
                      onClick={() => {
                        setToken(false);
                        toggleMenu();
                      }}
                      className="flex items-center rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="w-full rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => {
                      navigate("/login");
                      toggleMenu();
                    }}
                  >
                    Create Account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
