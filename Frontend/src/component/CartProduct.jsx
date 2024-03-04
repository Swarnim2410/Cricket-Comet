import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  increaseQty,
  decreaseQty,
} from "../redux/productSlice";
const CartProduct = ({ id, name, price, image, qty, total, category }) => {
  const dispatch = useDispatch();

  const deleteTheCartItem = () => {
    dispatch(deleteCartItem(id));
  };

  const increaseQuantity = () => {
    dispatch(increaseQty(id));
  };

  const decreaseQuantity = () => {
    dispatch(decreaseQty(id));
  };


  return (
    <div className="p-2 flex gap-4 rounded border-2 border-slate-600">
      <div className="bg-white p-3 rounded overflow-hidden h-1/2 w-1/2">
        <img src={image} className="w-full h-auto object-cover" />
      </div>
      <div className="flex flex-col gap-2 ml-4 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-yellow-400 capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="text-slate-300 cursor-pointer hover:text-red-500"
            onClick={deleteTheCartItem}
          >
            <MdDelete />
          </div>
        </div>
        <p className="capitalize font-medium text-slate-300">{category}</p>
        <p className="font-bold text-base text-slate-200 ">₹ {price}</p>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              type="button"
              onClick={decreaseQuantity}
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              <FaMinus />
            </button>
            <p className="font-semibold text-white">{qty}</p>
            <button
              type="button"
              onClick={increaseQuantity}
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-500">
            <p className="">Total : </p>
            <p className="text-white">₹ {total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
