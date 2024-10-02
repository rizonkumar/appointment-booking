import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaUserMd, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlot([]);

    // Get Current Date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // Getting date with Index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0);

      // Setting Hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // Add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src={docInfo.image}
                alt={docInfo.name}
                className="h-48 w-full object-cover md:w-48"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-800">{docInfo.name}</h2>
                <FaCheckCircle className="ml-2 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                {docInfo.experience}
              </span>
              <div className="mt-4">
                <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                  <FaInfoCircle className="mr-2" /> About
                </h3>
                <p className="text-gray-600 text-sm">{docInfo.about}</p>
              </div>
              <div className="mt-4 flex items-center text-gray-700">
                <FaUserMd className="mr-2" />
                <p className="font-medium">
                  Appointment fee: <span className="text-blue-600 font-bold">{currencySymbol}{docInfo.fees}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Slots</h3>
          <div className="flex gap-2 items-center w-full overflow-x-auto pb-4 mb-4">
            {docSlot.map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotIdx(index)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px] ${
                  slotIdx === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <p className="text-xs font-bold">{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-lg font-bold">{item[0] && item[0].datetime.getDate()}</p>
              </button>
            ))}
          </div>
  
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {docSlot.length > 0 &&
              docSlot[slotIdx].map((item, index) => (
                <button
                  key={index}
                  className={`p-2 rounded text-xs font-medium ${
                    item.time === slotTime
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSlotTime(item.time)}
                >
                  {item.time}
                </button>
              ))}
          </div>
  
          <button 
            className="mt-6 w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={!slotTime}
          >
            Book an Appointment
          </button>
        </div>
      </div>
    )
  );
};

export default Appointment;