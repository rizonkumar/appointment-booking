import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="my-10 overflow-hidden rounded-2xl bg-primary-dark px-6 py-12 sm:my-20 sm:px-10 md:mx-10 lg:px-12">
      <div className="flex flex-col-reverse items-center md:flex-row md:justify-between">
        {/* Left Side Section  */}
        <div className="mt-8 flex flex-1 flex-col items-center text-center md:mt-0 md:items-start md:text-left">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Book Appointment
            <br className="hidden sm:inline" /> With 100+ Trusted Doctors
          </h1>
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="mt-8 flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary-dark transition-all hover:bg-opacity-90 hover:scale-105 sm:text-base"
          >
            Create Account
            <FaArrowRight className="ml-2" />
          </button>
        </div>
        {/* Right Side Section  */}
        <div className="relative w-full max-w-sm md:w-1/2 lg:w-[370px]">
          <img
            src={assets.appointment_img}
            alt="Trusted doctor"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;