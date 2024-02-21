import React from "react";
import { FaFilter } from "react-icons/fa";
const FilterProduct = ({ category, onClick, isActive }) => {

  //console.log(isActive);
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div
        className={`text-3xl p-5  ${
          isActive ? "bg-red-500" : "bg-yellow-600"
        } bg-yellow-600 rounded-full`}
      >
        <FaFilter />
      </div>
      <p className="text-center font-medium my-1 capitalize text-white">
        {category}
      </p>
    </div>
  );
};

export default FilterProduct;
