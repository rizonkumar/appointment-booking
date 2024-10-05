import React from "react";
import {
  FaUpload,
  FaUser,
  FaEnvelope,
  FaLock,
  FaBriefcase,
  FaDollarSign,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";

const AddDoctor = () => {
  return (
    <div className="mx-auto max-w-7xl rounded-lg bg-white p-4 shadow-md md:p-6">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Add Doctor</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Side */}
          <div className="space-y-6">
            <div className="hover:border-primary flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition duration-300">
              <label htmlFor="doc-img" className="cursor-pointer">
                <FaUpload className="mb-2 text-4xl text-gray-400" />
                <p className="text-center text-sm text-gray-600">
                  Upload Doctor picture
                </p>
              </label>
              <input type="file" id="doc-img" className="hidden" />
            </div>

            <InputField
              icon={FaUser}
              label="Doctor Name"
              type="text"
              placeholder="Name"
            />
            <InputField
              icon={FaEnvelope}
              label="Doctor Email"
              type="email"
              placeholder="Email"
            />
            <InputField
              icon={FaLock}
              label="Doctor Password"
              type="password"
              placeholder="Password"
            />
            <SelectField
              icon={FaBriefcase}
              label="Doctor Experience"
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                (year) => `${year} Year${year > 1 ? "s" : ""}`,
              )}
            />
            <InputField
              icon={FaDollarSign}
              label="Fees"
              type="number"
              placeholder="Fees"
            />
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <SelectField
              icon={FaGraduationCap}
              label="Speciality"
              options={[
                "General physician",
                "Gynecologist",
                "Dermatologist",
                "Pediatricians",
                "Neurologists",
                "Gastroenterologist",
              ]}
            />
            <InputField
              icon={FaGraduationCap}
              label="Education"
              type="text"
              placeholder="Education"
            />
            <InputField
              icon={FaMapMarkerAlt}
              label="Address Line 1"
              type="text"
              placeholder="Address 1"
            />
            <InputField
              icon={FaMapMarkerAlt}
              label="Address Line 2"
              type="text"
              placeholder="Address 2"
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                <FaInfoCircle className="mr-2 inline-block" />
                About Doctor
              </label>
              <textarea
                className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
                rows={5}
                placeholder="Write about doctor"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark rounded-md px-6 py-2 text-white transition duration-300"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      <Icon className="mr-2 inline-block" />
      {label}
    </label>
    <input
      className="focus:border-primary focus:ring-primary mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
      {...props}
    />
  </div>
);

const SelectField = ({ icon: Icon, label, options }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      <Icon className="mr-2 inline-block" />
      {label}
    </label>
    <div className="relative">
      <select className="focus:border-primary w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-gray-700 focus:bg-white focus:outline-none">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
);

export default AddDoctor;
