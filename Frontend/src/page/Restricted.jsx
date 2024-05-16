import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Error } from "./Error";

/* for all the admin works */

const Restricted = () => {
  const access = window.localStorage.getItem("access");
  if (access === import.meta.env.VITE_APP_ADMIN_EMAIL) {
    return <Outlet />;
  } else {
    return <Error />;
  }
};

export default Restricted;
