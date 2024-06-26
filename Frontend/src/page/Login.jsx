import React, { useState, useEffect } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../google/firebase";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const userData = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      _id: "2",
    },
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.user);

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // console.log(user);
    let splitName = user.displayName.split(" ");
    const firstName = splitName[0];
    const lastName = splitName[splitName.length - 1];
    const email = user.email;

    // console.log(email);

    userData.data.firstName = firstName;
    userData.data.lastName = lastName;
    userData.data.email = email;

    // console.log(userData);

    dispatch(loginRedux(userData));

    window.localStorage.setItem("email", userData.data.email);
    window.localStorage.setItem("firstName", userData.data.firstName);
    window.localStorage.setItem("lastName", userData.data.lastName);
    window.localStorage.setItem("_id", userData.data._id);
    window.localStorage.setItem("access", userData.data.email);

    // Navigate after state has been updated
    setTimeout(() => {
      navigate("/");
    });
    toast.success(`Welcome ${user.displayName}`);
    // navigate("/");
  };

  // console.log(loginData);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_SERVER_DOMAIN}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const responseData = await response.json();
        //console.log(responseData);

        if (
          responseData.redirect &&
          responseData.data.email === import.meta.env.VITE_APP_ADMIN_EMAIL
        ) {
          toast("Admin login is successfull!!");
        } else {
          toast(responseData.message);
        }

        if (responseData.redirect) {
          //console.log(responseData.data);
          window.localStorage.setItem("email", responseData.data.email);
          window.localStorage.setItem("firstName", responseData.data.firstName);
          window.localStorage.setItem("lastName", responseData.data.lastName);
          window.localStorage.setItem("_id", responseData.data._id);
          window.localStorage.setItem("access", responseData.data.email);

          dispatch(loginRedux(responseData));
          // Navigate after state has been updated
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast("Enter all details");
    }
  };

  // this is to print the data from the store after dispatching it succesfully -->

  // useEffect(() => {
  //   // Actions to perform after userData changes
  //   console.log(userData);
  // }, [userData]);

  return (
    <div className="flex flex-col justify-center items-center py-8 px-6 mx-auto md:h-screen">
      <div className="justify-center items-center w-full bg-white rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-sm xl:p-0 dark:bg-gray-800">
        <div className="p-6 w-full sm:p-8 lg:p-10">
          <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
            Sign in to your account
          </h1>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleOnChange}
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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

            <button
              className="text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center mb-6 bg-blue-700"
              type="submit"
            >
              <span className="flex justify-center items-center">
                Sign in to account
              </span>
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Not registered?
              <Link
                to="/signup"
                className="ml-1 text-blue-700 hover:underline dark:text-blue-500"
              >
                Create an account.
              </Link>
            </div>
          </form>
          <div className="mt-1">
            <div className="text-sm text-slate-400">OR</div>
            <div
              className="bg-white max-w-48 flex items-center rounded-3xl p-1 mt-2 cursor-pointer font-bold"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="ml-1 mr-1.5" />
              <button className="text-black">Sign in with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
