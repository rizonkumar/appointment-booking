import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  FaUserMd,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">My Appointments</h2>
      <div className="space-y-4">
        {doctors.slice(0, 2).map((doctor, index) => (
          <div
            key={index}
            className="transform overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="items-center md:flex">
              <div className="group relative overflow-hidden md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110 md:w-48"
                  src={doctor.image}
                  alt={doctor.name}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-20"></div>
              </div>
              <div className="p-6 md:flex-grow">
                <div className="items-center justify-between md:flex">
                  <div className="mb-4 md:mb-0">
                    <h3 className="group flex items-center text-xl font-semibold text-gray-800">
                      <FaUserMd className="mr-2 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
                      <span className="transition-colors duration-300 group-hover:text-blue-600">
                        {doctor.name}
                      </span>
                    </h3>
                    <p className="text-gray-600">{doctor.speciality}</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button className="flex items-center justify-center rounded bg-green-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-green-600 hover:shadow-md">
                      <span className="mr-1 transition-transform duration-300 hover:scale-110">
                        💳
                      </span>{" "}
                      Pay Online
                    </button>
                    <button className="flex items-center justify-center rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-red-600 hover:shadow-md">
                      <span className="mr-1 transition-transform duration-300 hover:scale-110">
                        ❌
                      </span>{" "}
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 text-sm text-gray-600 sm:grid-cols-3">
                  <p className="group flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-400 transition-colors duration-300 group-hover:text-blue-500" />
                    <span className="transition-colors duration-300 group-hover:text-blue-600">
                      {doctor.address.line1}
                    </span>
                  </p>
                  <p className="group flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-400 transition-colors duration-300 group-hover:text-blue-500" />
                    <span className="transition-colors duration-300 group-hover:text-blue-600">
                      25 July, 2024
                    </span>
                  </p>
                  <p className="group flex items-center">
                    <FaClock className="mr-2 text-gray-400 transition-colors duration-300 group-hover:text-blue-500" />
                    <span className="transition-colors duration-300 group-hover:text-blue-600">
                      10:00 PM
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
