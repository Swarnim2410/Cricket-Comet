import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImCart } from "react-icons/im";
import { HiUserCircle } from "react-icons/hi2";
import Burger from "../assest/burger-category.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  //fetching data from redux-store (userData will contain details if user is logged in else it will be empty )-->

  const userData = useSelector((state) => state.user);
  //console.log(userData);

  const dispatch = useDispatch();

  const handleLogout = () => {
    toast("Back to home page");
    dispatch(logoutRedux());
    setTimeout(() => {
      navigate("/");
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
          <div className="h-10 px-3">
            <img src={Burger} className="h-full" />
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
            <Link to={"menu/65d34caca0a9c77e770e912d"} className="font-medium">
              Menu
            </Link>
            <Link to={"about"} className="font-medium">
              About
            </Link>
            <Link to={"contact"} className="font-medium">
              Contact
            </Link>
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
                {userData.email === import.meta.env.VITE_APP_ADMIN_EMAIL && (
                  <Link
                    to={"addproduct"}
                    className="whitespace-nowrap cursor-pointer "
                  >
                    Add Product
                  </Link>
                )}
                {userData.email ? (
                  <p
                    className="whitespace-nowrap cursor-pointer px-2"
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
                <nav className=" text-black  flex flex-col md:hidden">
                  <Link to={""} className="font-bold px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/65d34caca0a9c77e770e912d"}
                    className="font-medium px-1 py-1"
                  >
                    Menu
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
