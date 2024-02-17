import React, { useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(import.meta.env.VITE_APP_SERVER_DOMAIN);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleShowPassword = () => {
    setShowPassword((pre) => !pre);
  };

  const handleConfirmShowPassword = () => {
    setShowConfirmPassword((pre) => !pre);
  };

  //validation -->
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = data;
    if (firstName && email && lastName && password && confirmPassword) {
      if (password === confirmPassword) {
        let checkBox = document.getElementById("terms");
        let x = checkBox.checked;
        if (x) {
          //sending data to backend server in signup and getting response in fetchData
          const fetchData = await fetch(
            `${import.meta.env.VITE_APP_SERVER_DOMAIN}/signup`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(data),
            }
          )
            // Handle the response from the backend
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              toast(data.message);
              if(data.redirect){
                navigate("/login")
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
         
        } else {
          toast("accept the conditions");
        }
      } else {
        toast("passwords do not match");
      }
    } else {
      toast("please provide all the details");
    }
  };

  return (
    <div className="px-20 md:px-40 lg:px-60">
      <div className="p-6 w-full sm:p-8 lg:p-10 bg-black">
        <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
          Create an account
        </h1>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6 space-y-6 md:flex-row md:space-y-0 md:space-x-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                First name
              </label>
              <input
                id="firstName"
                placeholder="Swarnim"
                //name se hi submit ho raha
                name="firstName"
                type="text"
                value={data.firstName}
                onChange={handleOnChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Last name
              </label>
              <input
                placeholder="Gupta"
                name="lastName"
                type="text"
                id="lastName"
                value={data.lastName}
                onChange={handleOnChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              placeholder="id@gmail.com"
              name="email"
              type="email"
              id="email"
              value={data.email}
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <div className="flex border-none outline-none sm:text-sm rounded-lg px-2 py-2 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <input
                placeholder=""
                id="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                type={showPassword ? "text" : "password"}
                className="border-none outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="flex-col py-1">
                <span className="cursor-pointer" onClick={handleShowPassword}>
                  {showPassword ? <BiSolidShow /> : <BiSolidHide />}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm your password
            </label>
            <div className="flex border-none outline-none sm:text-sm rounded-lg px-2 py-2 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <input
                placeholder=""
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                type={showConfirmPassword ? "text" : "password"}
                className="border-none outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="flex-col py-1">
                <span
                  className="cursor-pointer"
                  onClick={handleConfirmShowPassword}
                >
                  {showConfirmPassword ? <BiSolidShow /> : <BiSolidHide />}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                name="terms"
                type="checkbox"
                className="w-4 h-4 bg-gray-50 rounded border-gray-300 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-900 dark:text-white">
                I accept the
                <a
                  className="ml-1 text-blue-700 dark:text-blue-500 hover:underline"
                  href="/terms-and-conditions/"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            className="text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-800"
            type="submit"
          >
            <span className="flex justify-center items-center">
              Create account
            </span>
          </button>
        </form>
        <div className="py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="ml-1 text-blue-700 dark:text-blue-500 hover:underline"
          >
            Login here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
