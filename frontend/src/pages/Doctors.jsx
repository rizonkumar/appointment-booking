import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import {
  FaUserMd,
  FaVenusMars,
  FaBrain,
  FaChild,
  FaAllergies,
  FaPrescription,
  FaCheckCircle,
  FaFilter,
} from "react-icons/fa";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialties = [
    { name: "General physician", icon: FaUserMd },
    { name: "Gynecologist", icon: FaVenusMars },
    { name: "Dermatologist", icon: FaAllergies },
    { name: "Pediatricians", icon: FaChild },
    { name: "Neurologist", icon: FaBrain },
    { name: "Gastroenterologist", icon: FaPrescription },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Browse through the doctor specialist
      </h1>
      <div className="mb-4 md:hidden">
        <button
          className="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter className="mr-2" /> Filters
        </button>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className={`md:w-1/4 ${showFilter ? "block" : "hidden md:block"}`}>
          <div className="flex flex-wrap gap-2 md:flex-col">
            {specialties.map((spec) => (
              <SpecialtyButton
                key={spec.name}
                specialty={spec.name}
                icon={spec.icon}
                isActive={speciality === spec.name}
                onClick={() => {
                  navigate(
                    spec.name === speciality
                      ? "/doctors"
                      : `/doctors/${spec.name}`,
                  );
                  setShowFilter(false);
                }}
              />
            ))}
          </div>
        </div>
        <div className="md:w-3/4">
          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filterDoc.map((doctor) => (
                <DoctorCard
                  key={doctor._id}
                  doctor={doctor}
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                />
              ))}
            </div>
          ) : (
            <div
              className="rounded border-l-4 border-yellow-400 bg-yellow-50 p-4 text-yellow-800"
              role="alert"
            >
              <p className="font-bold">No doctors available</p>
              <p>
                We couldn&apos;t find any doctors for the selected specialty.
                Please try another specialty or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SpecialtyButton = ({ specialty, icon: Icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center rounded-lg p-3 transition-all ${
      isActive
        ? "border-l-4 border-blue-700 bg-blue-100 text-blue-700"
        : "bg-white text-gray-700 hover:bg-gray-50"
    }`}
  >
    <Icon className="mr-3 text-xl" />
    <span className="text-left">{specialty}</span>
  </button>
);

SpecialtyButton.propTypes = {
  specialty: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const DoctorCard = ({ doctor, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-full w-full object-cover object-center"
      />
    </div>
    <div className="p-4">
      <div className="mb-2 flex items-center">
        <FaCheckCircle className="mr-2 text-green-500" />
        <span className="text-sm font-medium text-green-500">Available</span>
      </div>
      <h3 className="mb-1 text-lg font-semibold text-gray-900">
        {doctor.name}
      </h3>
      <p className="text-sm text-gray-600">{doctor.speciality}</p>
    </div>
  </div>
);

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    speciality: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Doctors;
