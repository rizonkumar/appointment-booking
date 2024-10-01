import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="my-16 flex flex-col items-center gap-4 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm-w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors
      </p>
      <div className="grid-cols-auto grid w-full gap-4 gap-y-6 px-3 pt-5 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
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
              <p className="text-lg font-medium text-gray-900">{item?.name}</p>
              <p className="text-sm text-gray-600">{item?.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors/");
          scrollTo(0, 0);
        }}
        className="mt-10 rounded-full bg-blue-50 px-12 py-3 text-gray-600"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
