import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import md5 from "md5"; // Ensure md5 is installed to hash passwords
import api from "../api/axiosApi";
import { login } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State to manage form input and error message
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const logindata = Object.fromEntries(formdata);

    // Hash the password (twice as per the backend logic)
    const hashedPassword = md5(md5(logindata.password) + "loginToken");
    const payload = {
      nameToken: "loginToken",
      username: logindata.userName,
      password: hashedPassword,
      loginToken: "loginToken",
    };

    // Basic validation for empty fields
    if (!logindata.userName || !logindata.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      dispatch(login(payload))
        .unwrap()
        .then(() => {
          // Handle success
          alert("Login successful!");
          navigate("/dashboard");
        })
        .catch((err) => {
          // Handle failure
          console.error("Login failed:", err);
        });
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col flex-wrap justify-center content-center h-screen bg-slate-300">
        <div className="flex justify-center max-w-lg mb-1 bg-slate-300">
          <img src="/Logo.png" width="200px" alt="logo" className="mb-5" />
        </div>
        <div className="max-w-lg relative flex flex-col p-4 rounded-md text-black bg-white shadow-xl">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
            Sign in to Game Central
          </div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
            Log in to your account
          </div>
          <Form
            onSubmit={handleSubmit}
            method="POST"
            className="flex flex-col gap-3"
          >
            <div className="block relative">
              <label
                htmlFor="email"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                placeholder="Enter your username"
              />
            </div>
            <div className="block relative">
              <label
                htmlFor="password"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal mt-4"
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
