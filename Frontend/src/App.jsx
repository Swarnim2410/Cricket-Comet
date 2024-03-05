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

  /*setting user details from local storage to redux*/

  const email = window.localStorage.getItem("email");
  const firstName = window.localStorage.getItem("firstName");
  const lastName = window.localStorage.getItem("lastName");
  const _id = window.localStorage.getItem("_id");
  var dataobj = {
    data : {
    firstName: firstName,
    lastName: lastName,
    _id: _id,
    email: email,
    }
  };
  if (email === null) {
    dataobj = {
      data : {
      firstName: "",
      lastName: "",
      _id: "",
      email: "",
      }
    };
  }

  dispatch(loginRedux(dataobj));

  //console.log(data);

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
