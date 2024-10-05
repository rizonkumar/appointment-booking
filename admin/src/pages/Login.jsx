import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/adminContext";
import { data } from "autoprefixer";

const Login = () => {
  console.log("Login component rendered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("Admin");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success(data.message);
        } else {
          //TODO I am not fetting notificaion when the password is incorrect.
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={assets.admin_logo}
            alt="Forever Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Admin Panel Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
            {state === "Admin" ? (
              <p>
                Doctor Login{" "}
                <span
                  className="text-blue cursor-pointer underline"
                  onClick={() => setState("Doctor")}
                >
                  Click Here
                </span>
              </p>
            ) : (
              <p>
                Admin Login{" "}
                <span
                  className="text-blue cursor-pointer underline"
                  onClick={() => setState("Admin")}
                >
                  Click Here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
