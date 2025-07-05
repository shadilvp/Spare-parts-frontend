import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../serveces/authanticationService";
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };



  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success('Admin Login successful!');
      console.log("Login Successful:", data);
  
      navigate("/dashboard");

    },
    onError: (error) => {
      toast.error('Something went wrong.');
      console.error("Login failed:", error);
    },
  });

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    mutation.mutate(loginData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#000000] to-[#06089e]">
      <div className="w-full max-w-md bg-[#42366d6a] rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-300">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 bg-[#bcbcdc4b]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 bg-[#bcbcdc4b]"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4d4bcc] text-white py-2 rounded-xl hover:bg-[#423fe8] transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
