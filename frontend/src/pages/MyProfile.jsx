import { useState } from "react";
import { assets } from "../assets/assets.js";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaPencilAlt,
  FaSave,
} from "react-icons/fa";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Rizon Rahi",
    image: assets.profile_pic,
    email: "rizon.kumar.rahi@gmail.com",
    phone: "+91 9092704251",
    address: {
      line1: "123 Main St",
      line2: "Apt 4B",
    },
    gender: "Male",
    dob: "2000-05-13",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const ProfileField = ({
    icon,
    label,
    value,
    isEdit,
    onChange,
    type = "text",
    options,
  }) => (
    <div className="flex items-center">
      <div className="mr-4 w-8">{icon}</div>
      <div className="flex-grow">
        <p className="mb-1 text-sm text-gray-500">{label}</p>
        {isEdit ? (
          type === "select" ? (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )
        ) : (
          <p className="text-gray-800">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="mb-6 md:mb-0 md:w-1/3">
          <img
            src={userData.image}
            alt="Profile"
            className="mx-auto h-48 w-48 rounded-full border-4 border-blue-100 object-cover shadow-md"
          />
        </div>
        <div className="md:w-2/3 md:pl-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">
              {userData.name}
            </h2>
            <button
              onClick={handleEdit}
              className={`rounded-full px-6 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                isEdit
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isEdit ? "Save" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-700">
                Contact Information
              </h3>
              <div className="space-y-4">
                <ProfileField
                  icon={<FaEnvelope className="text-blue-500" />}
                  label="Email"
                  value={userData.email}
                  isEdit={isEdit}
                  onChange={(value) => handleChange("email", value)}
                />
                <ProfileField
                  icon={<FaPhone className="text-blue-500" />}
                  label="Phone"
                  value={userData.phone}
                  isEdit={isEdit}
                  onChange={(value) => handleChange("phone", value)}
                />
                <ProfileField
                  icon={<FaMapMarkerAlt className="text-blue-500" />}
                  label="Address"
                  value={`${userData.address.line1}, ${userData.address.line2}`}
                  isEdit={isEdit}
                  onChange={(value) => {
                    const [line1, line2] = value.split(",");
                    handleChange("address", {
                      line1: line1.trim(),
                      line2: line2.trim(),
                    });
                  }}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-700">
                Basic Information
              </h3>
              <div className="space-y-4">
                <ProfileField
                  icon={<FaVenusMars className="text-blue-500" />}
                  label="Gender"
                  value={userData.gender}
                  isEdit={isEdit}
                  onChange={(value) => handleChange("gender", value)}
                  options={["Male", "Female", "Other"]}
                />
                <ProfileField
                  icon={<FaBirthdayCake className="text-blue-500" />}
                  label="Date of Birth"
                  value={userData.dob}
                  isEdit={isEdit}
                  onChange={(value) => handleChange("dob", value)}
                  type="date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
