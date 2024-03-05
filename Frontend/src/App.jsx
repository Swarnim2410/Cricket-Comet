import "./App.css";
import Header from "./component/Header.jsx";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "./redux/userSlice.jsx";

function App() {
  const dispatch = useDispatch();

  // To get the product data from redux
  const productData = useSelector((state) => state.product);

  useEffect(() => {
    // Fetch product data and dispatch setDataProduct action
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_DOMAIN}/product`
      );
      const resData = await res.json();
      dispatch(setDataProduct(resData));
    })();

    // Set user details from local storage to redux
    const email = window.localStorage.getItem("email");
    const firstName = window.localStorage.getItem("firstName");
    const lastName = window.localStorage.getItem("lastName");
    const _id = window.localStorage.getItem("_id");
    var dataobj = {
      data: {
        firstName: firstName,
        lastName: lastName,
        _id: _id,
        email: email,
      },
    };
    if (email === null) {
      dataobj = {
        data: {
          firstName: "",
          lastName: "",
          _id: "",
          email: "",
        },
      };
    }
    dispatch(loginRedux(dataobj));
  }, []); // Empty dependency array ensures this effect runs only once on component mount

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
