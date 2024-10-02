import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { FaCheckCircle, FaChevronRight, FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId,
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Expert Physicians at Your Service
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Connect with our network of highly qualified and experienced doctors
            for personalized care.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relDoc.slice(0, 5).map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} navigate={navigate} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              navigate("/doctors/");
              scrollTo(0, 0);
            }}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition duration-150 ease-in-out hover:bg-blue-700"
          >
            View All Doctors
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

RelatedDoctors.propTypes = {
  docId: PropTypes.string.isRequired,
  speciality: PropTypes.string.isRequired,
};

const DoctorCard = ({ doctor, navigate }) => (
  <div
    onClick={() => {
      navigate("/appointment/" + doctor._id);
      scrollTo(0, 0);
    }}
    className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:transform hover:shadow-xl"
  >
    <div className="relative">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-48 w-full object-cover"
      />
      <div className="absolute left-2 top-2 flex items-center rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">
        <FaCheckCircle className="mr-1" />
        Available
      </div>
    </div>
    <div className="p-4">
      <h3 className="mb-1 text-xl font-semibold text-gray-900">
        {doctor.name}
      </h3>
      <p className="mb-2 text-gray-600">{doctor.speciality}</p>
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
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    speciality: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default RelatedDoctors;
