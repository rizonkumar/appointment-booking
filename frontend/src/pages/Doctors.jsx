import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

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

  return (
    <div className="">
      <p className="text-gray-600">Browse through the doctor specialist</p>
      <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row">
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-600 py-1.5 pl-3 pr-16 transition-all sm:w-auto ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-600 py-1.5 pl-3 pr-16 transition-all sm:w-auto ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-600 py-1.5 pl-3 pr-16 transition-all sm:w-auto ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-600 py-1.5 pl-3 pr-16 transition-all sm:w-auto ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-600 py-1.5 pl-3 pr-16 transition-all sm:w-auto ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-600 py-1.5 pl-3 pr-16 transition-all sm:w-auto ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="grid-cols-auto grid w-full gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate("/appointment/" + item._id)}
              className="cursor-pointer overflow-hidden rounded-xl border border-blue-200 transition-all duration-500 hover:translate-y-[-10px]"
              key={index}
            >
              <img src={item?.image} alt="image" className="bg-blue-50" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-center text-sm text-green-500">
                  <p className="h-2 w-2 rounded-full bg-green-500"></p>
                  <p>Available</p>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  {item?.name}
                </p>
                <p className="text-sm text-gray-600">{item?.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
