import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/adminContext";
import {
  FaEnvelope,
  FaLock,
  FaUserMd,
  FaUserShield,
  FaSpinner,
} from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("Admin");
  const [isLoading, setIsLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message || "Login failed. Please try again.");
        }
      } else {
        // Handle doctor login
        toast.info("Doctor login not implemented yet.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-8 text-center">
          <img
            className="mx-auto h-16 w-auto"
            src={assets.admin_logo}
            alt="Prescripto Logo"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {state === "Admin" ? "Admin Panel Login" : "Doctor Login"}
          </h2>
        </div>
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? <FaSpinner className="mr-2 animate-spin" /> : null}
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
            className="flex items-center text-sm text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500"
          >
            {state === "Admin" ? (
              <FaUserMd className="mr-2" />
            ) : (
              <FaUserShield className="mr-2" />
            )}
            {state === "Admin" ? "Doctor Login" : "Admin Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
