import React from "react";
import AllProducts from "../component/AllProducts";

const DisplayCategory = () => {
  var currentUrl = window.location.href;
  console.log(currentUrl);
  return (
    <div className="">
      <AllProducts heading={"Explore more products"} />
    </div>
  );
};

export default DisplayCategory;
