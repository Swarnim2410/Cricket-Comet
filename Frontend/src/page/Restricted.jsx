import React from "react";
import { Link, Outlet } from "react-router-dom";

const Restricted = () => {
  const access = window.localStorage.getItem("access");
  if (access) {
    return <Outlet />;
  } else {
    return (
      <div className="items-center text-center">
        <div className="text-white font-bold pt-2 pb-2 text-center">
          USER IS NOT A ADMIN
        </div>
        <Link to="/" className="text-blue-600 pt-2 underline">
          Go Back to Home Page
        </Link>
      </div>
    );
  }
};

export default Restricted;
