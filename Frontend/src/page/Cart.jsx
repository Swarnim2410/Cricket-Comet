import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import { Link } from "react-router-dom";
import { BsCartXFill } from "react-icons/bs";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  //console.log(productCartItem);

  //tatalprice and totalQuantity till now -->
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-400">
          Your Cart Items
        </h2>
        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            <div className="w-full max-w-3xl ">
              {/*display cart items*/}
              {productCartItem.map((itr, index) => {
                return (
                  <CartProduct
                    key={index}
                    id={itr._id}
                    name={itr.name}
                    image={itr.image}
                    category={itr.category}
                    qty={itr.qty}
                    total={itr.total}
                    price={itr.price}
                  />
                );
              })}
            </div>
            {/*total cart items*/}
            <div className="w-full max-w-md bg-slate-500 ml-auto">
              <h2 className="text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Items : </p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Your Cart Value : </p>
                <p className="ml-auto w-32 font-bold">₹{totalPrice}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="pt-20 flex w-full justify-center items-center flex-col">
              <BsCartXFill className="text-9xl w-full max-w-sm text-white" />
              <p className="pt-4 text-slate-500 text-3xl font-bold">
                Cart is empty
              </p>
              <div className="mt-4">
                <Link
                  to={`/menu/65d34caca0a9c77e770e912d`}
                  className="text-blue-600 underline"
                >
                  Click here to explore our products
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
