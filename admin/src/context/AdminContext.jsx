import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "",
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log("AdminContextProvider rendered, backendUrl:", backendUrl);

  const value = {
    aToken,
    setAToken,
    backendUrl,
  };

  // const admin = {
  //   aToken,
  //   setAToken,
  //   backendUrl,
  // };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
