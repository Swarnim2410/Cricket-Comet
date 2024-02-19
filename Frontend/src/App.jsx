import "./App.css";
import Header from "./component/Header.jsx";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const dispatch = useDispatch();

  //to get the product data from redux-->

  const productData = useSelector((state) => state.product);
  //fetching all products from 5000/product -->

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_DOMAIN}/product`
      );
      const resData = await res.json();
      //console.log(resData);
      dispatch(setDataProduct(resData));
    })();
  }, []);

  // useEffect(() => {
  //   console.log(productData);
  // }, [productData]);

  //app.jsx starts -->

  return (
    <>
      <Toaster />
      <div className="">
        <Header />
        <main className="pt-16 bg-black min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}
export default App;
