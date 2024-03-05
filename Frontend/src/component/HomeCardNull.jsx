import React from "react";

const HomeCardNull = ({ name, image, price, category, description }) => {
  return (
    <div className="py-4 w-64 min-h-[215px] px-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-md flex flex-col items-center justify-center">
      <p className="text-center mb-2 font-normal text-gray-700 dark:text-gray-400 overflow-hidden whitespace-nowrap">
        Loading..
      </p>
    </div>
  );
};

export default HomeCardNull;
