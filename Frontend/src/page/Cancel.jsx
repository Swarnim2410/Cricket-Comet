import React from "react";
import { Link } from "react-router-dom";
const Cancel = () => {
  return (
    <div className="bg-red-300 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg mt-10 flex-col">
      <p>Payment is Cancelled</p>
      <Link to="/" className="text-blue-500 underline">
        Go Back to Home Page
      </Link>
    </div>
  );
};

export default Cancel;
