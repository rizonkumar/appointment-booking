import React, { useContext, useState } from "react";
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
import { AdminContext } from "../../context/adminContext";
import { toast } from "react-toastify";
import axios from "axios";
import validator from "validator";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const clearForm = () => {
    setDocImg(null);
    setName("");
    setEmail("");
    setPassword("");
    setExperience("1");
    setFees("");
    setSpeciality("General physician");
    setDegree("");
    setAddress1("");
    setAddress2("");
    setAbout("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!docImg) {
        toast.error("Please select a doctor picture");
        setIsLoading(false);
        return;
      }
      if (
        !name ||
        !email ||
        !password ||
        !fees ||
        !degree ||
        !address1 ||
        !about
      ) {
        toast.error("Please fill in all required fields");
        setIsLoading(false);
        return;
      }
      if (!validator.isEmail(email)) {
        toast.error("Please enter a valid email address");
        setIsLoading(false);
        return;
      }
      if (password.length < 8) {
        toast.error("Password should be at least 8 characters long");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );
      formData.append("about", about);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken } },
      );

      if (data.success) {
        toast.success(data.message);
        clearForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while adding the doctor. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-8 text-3xl font-bold text-gray-800">Add Doctor</h2>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            <div className="hover:border-primary flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition duration-300">
              <label htmlFor="doc-img" className="cursor-pointer">
                {docImg ? (
                  <img
                    src={URL.createObjectURL(docImg)}
                    alt="Doctor preview"
                    className="max-h-48 rounded-lg object-cover"
                  />
                ) : (
                  <>
                    <FaUpload className="mb-2 text-4xl text-gray-400" />
                    <p className="text-center text-sm text-gray-600">
                      Upload Doctor picture
                    </p>
                  </>
                )}
              </label>
              <input
                type="file"
                id="doc-img"
                className="hidden"
                onChange={(e) => setDocImg(e.target.files[0])}
                accept="image/*"
              />
            </div>

            <InputField
              icon={FaUser}
              label="Doctor Name"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <InputField
              icon={FaEnvelope}
              label="Doctor Email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <InputField
              icon={FaLock}
              label="Doctor Password"
              type="password"
              placeholder="Password (min 8 characters)"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <SelectField
              icon={FaBriefcase}
              label="Doctor Experience"
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => ({
                value: year.toString(),
                label: `${year} Year${year > 1 ? "s" : ""}`,
              }))}
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
            />
            <InputField
              icon={FaDollarSign}
              label="Fees"
              type="number"
              placeholder="Fees"
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              required
            />
          </div>

          {/* Right column */}
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
              ].map((spec) => ({ value: spec, label: spec }))}
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
            />
            <InputField
              icon={FaGraduationCap}
              label="Education"
              type="text"
              placeholder="Education"
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              required
            />
            <InputField
              icon={FaMapMarkerAlt}
              label="Address Line 1"
              type="text"
              placeholder="Address 1"
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              required
            />
            <InputField
              icon={FaMapMarkerAlt}
              label="Address Line 2"
              type="text"
              placeholder="Address 2"
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
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
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-dark focus:ring-primary-dark rounded-md px-6 py-3 text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : (
              "Add Doctor"
            )}
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

const SelectField = ({ icon: Icon, label, options, ...props }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      <Icon className="mr-2 inline-block" />
      {label}
    </label>
    <div className="relative">
      <select
        className="focus:border-primary w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-gray-700 focus:bg-white focus:outline-none"
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
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
