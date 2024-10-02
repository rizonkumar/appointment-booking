import PropTypes from 'prop-types';
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { FaUserMd, FaVenusMars, FaBrain, FaChild, FaAllergies, FaPrescription, FaCheckCircle } from "react-icons/fa";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
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
      <h1 className="text-3xl font-bold mb-8">Browse through the doctor specialist</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          {specialties.map((spec) => (
            <SpecialtyButton
              key={spec.name}
              specialty={spec.name}
              icon={spec.icon}
              isActive={speciality === spec.name}
              onClick={() => navigate(spec.name === speciality ? "/doctors" : `/doctors/${spec.name}`)}
            />
          ))}
        </div>
        <div className="lg:w-3/4">
          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} onClick={() => navigate(`/appointment/${doctor._id}`)} />
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded" role="alert">
              <p className="font-bold">No doctors available</p>
              <p>We couldn&apos;t find any doctors for the selected specialty. Please try another specialty or check back later.</p>
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
    className={`flex items-center w-full p-4 mb-2 rounded-lg transition-all ${
      isActive ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700" : "bg-white text-gray-700 hover:bg-gray-50"
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
    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
  >
    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-center" />
    </div>
    <div className="p-4">
      <div className="flex items-center mb-2">
        <FaCheckCircle className="text-green-500 mr-2" />
        <span className="text-sm text-green-500 font-medium">Available</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
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