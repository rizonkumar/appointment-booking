import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="my-20 flex rounded-lg bg-primary-dark px-6 sm:px-10 md:mx-10 md:px-14 lg:px-12">
      {/* Left Side Section  */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl font-semibold text-white sm:text-2xl md:text-3xl lg:text-5xl">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="mt-6 rounded-full bg-white px-8 py-3 text-sm text-gray-600 transition-all hover:scale-105 sm:text-base"
        >
          Create Account
        </button>
      </div>
      {/* Right Side Section  */}
      <div className="relative hidden md:block md:w-1/2 lg:w-[370px]">
        <img
          src={assets.appointment_img}
          alt="appointment"
          className="absolute bottom-0 right-0 w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default Banner;
