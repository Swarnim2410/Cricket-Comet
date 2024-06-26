import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import About from "./page/About.jsx";
import Contact from "./page/Contact.jsx";
import Menu from "./page/Menu.jsx";
import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";
import AddProduct from "./page/AddProduct.jsx";
import Signup from "./page/Signup.jsx";
import Cart from "./page/Cart.jsx";
import DisplayCategory from "./page/DisplayCategory.jsx";
import Success from "./page/Success.jsx";
import Cancel from "./page/Cancel.jsx";
import { Error } from "./page/Error.jsx";
import { EditItem } from "./page/EditItem.jsx";
import { useState } from "react";

//redux imports -->
import { store } from "./redux/index.jsx";
import { Provider } from "react-redux";
import TermsConditions from "./page/TermsConditions.jsx";
import AllProducts from "./component/AllProducts.jsx";
import Restricted from "./page/Restricted.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="menu/:filterby" element={<Menu />} />
      <Route path="login" element={<Login />} />
      <Route path="/restricted" element={<Restricted />}>
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="edit/:id" element={<EditItem />} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/:category" element={<DisplayCategory />} />
      <Route path="success" element={<Success />} />
      <Route path="cancel" element={<Cancel />} />
      <Route path="terms" element={<TermsConditions />} />
      <Route path="menu" element={<AllProducts />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
