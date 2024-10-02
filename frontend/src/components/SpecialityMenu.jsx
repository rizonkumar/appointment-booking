import PropTypes from 'prop-types';
import { specialityData } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SpecialityMenu = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" id="speciality">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Explore Our Specialties
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
            Discover expert care across various medical fields. Find the right specialist for your needs.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {specialityData.map((item, index) => (
              <SpecialityCard key={index} item={item} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SpecialityCard = ({ item }) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <Link
      to={`/doctors/${item.speciality}`}
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      onClick={() => scrollTo(0, 0)}
    >
      <div className="w-20 h-20 mb-3 overflow-hidden rounded-full bg-blue-100 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.speciality}
          className="w-12 h-12 object-contain"
        />
      </div>
      <h3 className="text-sm font-semibold text-gray-800 text-center">{item.speciality}</h3>
    </Link>
  </motion.div>
);

SpecialityCard.propTypes = {
  item: PropTypes.shape({
    speciality: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default SpecialityMenu;