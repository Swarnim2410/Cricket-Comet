import React from "react";
import { Link } from "react-router-dom";

const CardFeature = ({ name, image, price, category, description, id }) => {
  return (
    <div className="focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-xl shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 w-full min-w-[200px] max-w-[200px] bg-slate-300 hover:shadow-lg drop-shadow p-4 py-5 px-4 cursor-pointer flex flex-col">
      
      {/* As soon as we click on any product, this top: 0 takes it to the upper side*/}
      
      <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
        <div className="h-28 flex items-center justify-center">
          <img src={image} className="h-full" />
        </div>
        <h3 className="font-bold text-black capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
          {name}
        </h3>
        <p className="capitalize text-slate-500 font-medium">{category}</p>
        <p className="font-bold">
          <span className="text-black">₹</span>
          <span className="text-black">{price}</span>
        </p>
        <button
          type="button"
          className="mt-2 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-1"
        >
          Add to Cart
        </button>
      </Link>
    </div>
  );
};

export default CardFeature;
