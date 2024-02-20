import React from "react";

const HomeCard = ({ name, image, price, category, description }) => {
  return (
    <div className="py-4 md:w-72 lg:w-64 px-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-md" onClick={()=>window.scrollTo({top:"900",behavior:"smooth"})}>
      <img className="h-20 w-20 mx-auto" alt="" src={image} />
      <div className="">
        <h5 className="capitalize text-center mt-2 mb-1 text-sm font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden whitespace-nowrap">
          {name}
        </h5>

        <p className="capitalize text-center mb-2 font-normal text-gray-700 dark:text-gray-400 overflow-hidden whitespace-nowrap">
          {category}
        </p>
        <p className="font-bold text-center mb-2  text-gray-700 dark:text-gray-400 overflow-hidden whitespace-nowrap">
          ₹{price}
        </p>
      </div>
    </div>
  );
};

export default HomeCard;
