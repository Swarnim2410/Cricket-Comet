import React from "react";
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
import Success from './page/Success.jsx'
import Cancel from "./page/Cancel.jsx";

//redux imports -->
import { store } from "./redux/index.jsx";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="menu/:filterby" element={<Menu />} />
      <Route path="login" element={<Login />} />
      <Route path="addproduct" element={<AddProduct />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/:category" element={<DisplayCategory />} />
      <Route path="success" element={<Success />} />
      <Route path="cancel" element={<Cancel />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
