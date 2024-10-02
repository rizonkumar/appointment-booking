import { assets } from "../assets/assets.js";
import { FaSearch, FaCalendarAlt, FaUserMd } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-12 md:px-10 lg:px-20">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        {/* Left Side Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:text-left"
        >
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Your Health, Our Priority
          </h1>
          <p className="mt-4 max-w-md text-xl text-indigo-100">
            Connect with top-rated specialists and book appointments with ease.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <FeatureItem icon={FaSearch} text="Find Specialists" />
            <FeatureItem icon={FaCalendarAlt} text="Easy Scheduling" />
            <FeatureItem icon={FaUserMd} text="Expert Care" />
          </div>
          <a
            href="#speciality"
            className="mt-8 flex items-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-indigo-600 transition-all duration-300 hover:bg-indigo-100 hover:scale-105"
          >
            Book Appointment
            <FaCalendarAlt className="ml-2" />
          </a>
        </motion.div>
        {/* Right Side Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full md:w-1/2"
        >
          <img
            src={assets?.header_img}
            className="h-auto w-full rounded-lg shadow-2xl"
            alt="Trusted medical professionals"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-white bg-opacity-90 p-2 pr-4 shadow-lg">
            <img
              src={assets.group_profiles}
              alt="Satisfied patients"
              className="w-12 rounded-full"
            />
            <p className="text-sm font-medium text-gray-800">
              Join 10,000+ satisfied patients
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const FeatureItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 rounded-full bg-indigo-500 bg-opacity-50 px-4 py-2 text-white">
    <Icon />
    <span>{text}</span>
  </div>
);

export default Header;