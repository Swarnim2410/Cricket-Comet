import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import { Link, useNavigate } from "react-router-dom";
import { BsCartXFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user);
  const productCartItem = useSelector((state) => state.product.cartItem);
  //console.log(productCartItem);

  //totalprice and totalQuantity till now -->

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  /*************PAYMENT WORK******************/

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(
        import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY
      );
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_DOMAIN}/payment`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(productCartItem),
        }
      );
      if (res.statusCode === 500) return;

      const data = await res.json();
      console.log(data);

      toast("Redirect to payment Gateway...!");
      stripePromise.redirectToCheckout({ sessionId: data });
    } else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-400">
          Your Cart Items
        </h2>
        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/* display cart items  */}
            <div className="w-full max-w-3xl ">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            {/* total cart item  */}
            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b text-white">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold ">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b text-white">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {totalPrice}
                </p>
              </div>
              <button
                className="bg-red-500 w-full text-lg font-bold py-2 text-white"
                onClick={handlePayment}
              >
                Payment
              </button>
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
                <Link to={`/menu`} className="text-blue-600 underline">
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
