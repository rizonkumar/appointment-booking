import { assets } from "../assets/assets.js";

const Header = () => {
  return (
    <div className="flex flex-col flex-wrap rounded-lg bg-primary-dark px-6 md:flex-row md:px-10 lg:px-20">
      {/*  Left Side Section */}
      <div className="m-auto flex flex-col items-start justify-center gap-4 py-10 md:mb-[30px] md:w-1/2 md:py-[10vw]">
        <p className="text-3xl font-semibold leading-tight text-white md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col items-center gap-3 text-sm font-light text-white md:flex-row">
          <img
            src={assets.group_profiles}
            alt="group profiles"
            className="w-28"
          />
          <p>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="m-auto flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm text-gray-600 transition-all duration-300 hover:scale-105 md:m-0"
        >
          Book Appointment{" "}
          <img src={assets?.arrow_icon} alt="arrow_icon" className="w-3" />
        </a>
      </div>
      {/*  Right Side Selection */}
      <div className="relative md:w-1/2">
        <img
          src={assets?.header_img}
          className="bottom-0 h-auto w-full rounded-lg md:absolute"
          alt="header-image"
        />
      </div>
    </div>
  );
};

export default Header;
