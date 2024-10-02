import { assets } from "../assets/assets.js";
import { FaEye, FaCheckCircle, FaUserCog } from "react-icons/fa";
import PropTypes from "prop-types";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">
          ABOUT <span className="text-primary">US</span>
        </h1>
      </div>

      <div className="mb-16 flex flex-col items-center md:flex-row">
        <div className="mb-8 md:mb-0 md:w-1/2">
          <img
            src={assets.about_image}
            alt="about-us"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <p className="mb-6 text-lg">
            At Prescripto, we&#39;re passionate about revolutionizing the way
            people interact with technology. Our team of dedicated professionals
            works tirelessly to create innovative solutions that simplify and
            enhance your daily life.
          </p>
          <h2 className="mb-4 font-heading text-2xl font-semibold">
            Our Vision
          </h2>
          <p className="text-lg">
            We envision a world where technology seamlessly integrates into
            every aspect of life, making it more efficient, enjoyable, and
            accessible for everyone. Our goal is to be at the forefront of this
            technological revolution, consistently delivering products and
            services that exceed expectations and push the boundaries of
            what&#39;s possible.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-12 text-center font-heading text-3xl font-semibold">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<FaCheckCircle className="mb-4 text-5xl text-primary" />}
            title="EFFICIENCY"
            description="Our solutions are designed to streamline your workflows and maximize productivity, saving you valuable time and resources."
          />
          <FeatureCard
            icon={<FaEye className="mb-4 text-5xl text-primary" />}
            title="CONVENIENCE"
            description="We prioritize user experience, ensuring that our products are intuitive, easy to use, and accessible from any device."
          />
          <FeatureCard
            icon={<FaUserCog className="mb-4 text-5xl text-primary" />}
            title="PERSONALIZATION"
            description="We understand that every user is unique. Our adaptive technology caters to individual needs and preferences for a truly personalized experience."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="rounded-lg bg-white p-6 text-center shadow-md transition-shadow duration-300 hover:shadow-xl">
    {icon}
    <h3 className="mb-3 font-heading text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default About;
