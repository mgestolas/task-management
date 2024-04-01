import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import CheckList from "../assets/checklist.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      if (response.data) {
        const { token, username } = response.data;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("username", JSON.stringify(username));
        setTimeout(() => {
          toast.success(response.data.message);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error login", error);
      setError(error.response.data.message);

      setTimeout(() => {
        setError("");
        setIsLoggingIn(false);
      }, 2000);
    }
  };

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  return (
    <div className="min-h-screen  bg-gray-50 px-4">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center justify-center border-b mb-12">
          <img src={CheckList} alt="Checklist" className="w-12" />
          <h1 className="max-w-md text-center text-lg font-semibold text-indigo-500 ">
            Log in to access your task management dashboard and stay organized
            with your daily tasks.
          </h1>
        </div>
        <div className="max-w-lg w-full space-y-8 shadow-lg p-4">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-500">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={`${!togglePassword ? "password" : "text"}`}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="showPassword"
                  name="showPassword"
                  type="checkbox"
                  onChange={handleTogglePassword}
                  checked={togglePassword}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="showPassword"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Show password
                </label>
              </div>
              <p>
                Don't have an account?{" "}
                <Link to="/register">
                  <span className="text-indigo-500">Register</span>
                </Link>
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoggingIn ? "Signing in...." : "  Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
