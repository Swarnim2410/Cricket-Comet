import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProducts from "../component/AllProducts";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {

  const navigate = useNavigate()

  //getting id passed in params
  const productID = useParams().filterby;
  // console.log(productID);
  const productData = useSelector((state) => state.product.productList);

  //getting that product with the id
  const productDisplay = productData.filter((itr) => itr._id === productID)[0];
  //console.log(productDisplay);


  /* REDUX PART */

  const dispatch = useDispatch();
  const handleAddCartProduct = (itr) => {
    dispatch(
      addCartItem(productDisplay)
    );
  };

  if (!productDisplay) {
    return <div>Loading...</div>;
  }

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart")
  }

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl bg-white m-auto md:flex">
        <div className="max-w-lg bg-white overflow-hidden px-4 py-4">
          <img
            src={productDisplay.image}
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-2 ml-4">
          <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>

          <p className="capitalize font-medium text-2xl">
            {productDisplay.category}
          </p>
          <p className="font-bold text-2xl">₹{productDisplay.price}</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBuy}
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Buy
            </button>
            <button
              type="button"
              onClick={handleAddCartProduct}
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add to Cart
            </button>
          </div>
          <div className="text-slate-600 font-medium">
            <p>Description : </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>

      <AllProducts heading={"Filter by  your own preference"} />
    </div>
  );
};

export default Menu;
