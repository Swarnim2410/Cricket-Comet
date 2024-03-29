import React from "react";
import { Link, Outlet } from "react-router-dom";

/* for all the admin works */

const Restricted = () => {
  const access = window.localStorage.getItem("access");
  if (access === import.meta.env.VITE_APP_ADMIN_EMAIL) {
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
