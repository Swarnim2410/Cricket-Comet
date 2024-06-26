import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImCart } from "react-icons/im";
import { HiUserCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

const Header = () => {
  // console.log(import.meta.env.VITE_APP_APP_ID);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [open, setOpen] = useState(false);

  const loggedIn = window.localStorage.getItem("email");
  //console.log(loggedIn);
  //fetching data from redux-store (userData will contain details if user is logged in else it will be empty )-->

  const userData = useSelector((state) => state.user);
  //console.log(userData);

  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("firstName");
    window.localStorage.removeItem("lastName");
    window.localStorage.removeItem("_id");
    window.localStorage.removeItem("access");
    toast("Logout succesfull");
    dispatch(logoutRedux());
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const showMeDropdown = () => {
    setShowDropdown((pre) => !pre);
  };

  //get number of items in cart from cartItem stored in ProductSlice.jsx -->
  const cartItemNumber = useSelector((state) => state.product.cartItem);

  //console.log(import.meta.env.VITE_APP_ADMIN_EMAIL);
  return (
    <header className="fixed shadow-lg w-full h-16 z-50">
      <div className="flex items-center h-full justify-between bg-slate-400">
        <Link to={""}>
          <div className="h-16 px-3">
            <FaHome className="h-full w-1/2" />
          </div>
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          <nav className="gap-4 md:gap-7 text-black px-5 hidden md:flex">
            <Link
              to={""}
              className="font-bold text-blue-700 hover:text-blue-800"
            >
              Home
            </Link>
            <Link to={"menu"} className="font-medium">
              Items
            </Link>
            <Link to={"about"} className="font-medium">
              About
            </Link>
            <Link to={"contact"} className="font-medium">
              Contact
            </Link>

            {/* we will only show dropdown on clicking */}

            {/* Also we will show manage items only to admin */}
            <div className="font-medium">
              {userData.email === import.meta.env.VITE_APP_ADMIN_EMAIL && (
                <div className="relative" x-data="{ open: false }">
                  <div className="flex" onClick={() => setOpen(!open)}>
                    <div className="whitespace-nowrap cursor-pointer">
                      Manage Items
                    </div>
                    <div className="cursor-pointer flex items-center px-0.5">
                      {!open ? <FaCaretDown /> : <FaCaretUp />}
                    </div>
                  </div>
                  {open && (
                    <div
                      className="absolute mt-2 w-32 bg-white rounded-lg shadow-md"
                      onClick={() => setOpen(false)}
                    >
                      <Link
                        to="/restricted/addproduct"
                        className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg"
                      >
                        Add New Item
                      </Link>
                      <Link
                        to="/restricted/addproduct"
                        className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg"
                      >
                        Edit Item
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>
          <div className="text-2xl relative cursor-pointer text-blue-700 hover:text-blue-800">
            <Link to={"cart"}>
              <ImCart />
              <div className="absolute -top-2 -right-1 text-white bg-black h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>

          {/* we will only show dropdown on clicking */}

          {/* also we will show logout if user is logged in */}

          <div className="text-slate-300" onClick={showMeDropdown}>
            <div className="text-3xl cursor-pointer text-blue-700 hover:text-blue-800 py-6 px-5">
              <HiUserCircle />
            </div>
            {showDropdown && (
              <div className="bg-slate-600 absolute top-18 right-1.5 py-2 px-4 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                <div className="py-1">
                  {loggedIn ? (
                    // Show Logout option if loggedIn is true
                    <p
                      className="whitespace-nowrap cursor-pointer  text-black font-bold px-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  ) : (
                    <Link
                      to={"login"}
                      className="whitespace-nowrap cursor-pointer font-bold text-black"
                    >
                      Login/Signup
                    </Link>
                  )}
                </div>

                <nav className=" text-black  flex flex-col md:hidden rounded-lg">
                  <div className="font-medium px-2 py-1">
                    {userData.email ===
                      import.meta.env.VITE_APP_ADMIN_EMAIL && (
                      <Link
                        to={"/restricted/addproduct"}
                        className="whitespace-nowrap cursor-pointer "
                      >
                        Add Product
                      </Link>
                    )}
                  </div>
                  <div className="font-medium px-2 py-1">
                    {userData.email ===
                      import.meta.env.VITE_APP_ADMIN_EMAIL && (
                      <Link
                        to={"/restricted/addproduct"}
                        className="whitespace-nowrap cursor-pointer "
                      >
                        Edit Product
                      </Link>
                    )}
                  </div>
                  <Link to={""} className="font-medium px-2 py-1">
                    Home
                  </Link>
                  <Link to={"menu"} className="font-medium px-1 py-1">
                    Items
                  </Link>
                  <Link to={"about"} className="font-medium px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="font-medium px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
