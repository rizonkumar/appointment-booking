import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { FaUserMd, FaCheckCircle, FaChevronRight } from "react-icons/fa";
import PropTypes from 'prop-types';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Expert Physicians at Your Service
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with our network of highly qualified and experienced doctors for personalized care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.slice(0, 8).map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} navigate={navigate} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => {
              navigate("/doctors/");
              scrollTo(0, 0);
            }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            View All Doctors
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

const DoctorCard = ({ doctor, navigate }) => (
  <div
    onClick={() => navigate("/appointment/" + doctor._id)}
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <div className="relative">
      <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
        <FaCheckCircle className="mr-1" />
        Available
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
      <p className="text-gray-600 mb-2">{doctor.speciality}</p>
      <div className="flex items-center text-sm text-gray-500">
        <FaUserMd className="mr-2" />
        {doctor.experience} Experience
      </div>
    </div>
  </div>
);


DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    speciality: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default TopDoctors;