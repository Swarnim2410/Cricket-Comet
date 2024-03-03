import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="bg-green-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg mt-10 flex-col">
      <p>Payment is Successfull</p>
      <Link to="/" className="text-blue-600 underline">Go Back to Home Page</Link>
    </div>
  );
};

export default Success;
