import React, { useEffect, useState } from "react";
import AllProducts from "../component/AllProducts";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";

const DisplayCategory = () => {
  const productData = useSelector((state) => state.product.productList);

  var currentUrl = window.location.href;
  var x = currentUrl.toString();
  //console.log(x);
  const urlParts = x.slice("http://".length).split("/");
  // console.log(urlParts);
  // console.log(urlParts.length);
  var category = urlParts[1];
  if (urlParts.length == 3) {
    category = urlParts[2];
  }
  //console.log(category);

  // const [dataFilter, setDataFilter] = useState([]);
  // const [filterBy, setFilterBy] = useState("");

  //useEffect is used to set initial value to allProducts and it will run whenever productData changes

  const filteredData = productData.filter(
    (itr) => itr.category.toLowerCase() === category.toLowerCase()
  );

  const closeAlert = () => {
    var alertDiv = document.getElementById("alertDiv");
    alertDiv.parentNode.removeChild(alertDiv);
  };
  //console.log(filteredData);

  return (
    <div className="">
      <div className="text-slate-300 text-center pt-2 md:pt-4 font-bold text-2xl pb-4 md:pb-6">
        Find your favorite cricket {category} right here
      </div>

      <div
        id="alertDiv"
        data-dismissible="alert"
        role="alert"
        className="font-regular relative flex w-full max-w-screen-lg mx-auto rounded-lg bg-gradient-to-tr from-green-600 to-green-400 px-4 py-4 text-base text-black font-bold"
      >
        <div className="ml-3 mr-12">
          Click on any product to view more details
        </div>
        <button
          data-dismissible-target="alert"
          onClick={closeAlert}
          className="!absolute top-3 right-3 select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs  uppercase text-red-700 transition-all hover:bg-red-400 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-bold"
          type="button"
        >
          Close
        </button>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {filteredData.map((itr) => {
          return (
            <CardFeature
              name={itr.name}
              id={itr._id}
              key={itr._id}
              image={itr.image}
              price={itr.price}
              category={itr.category}
              description={itr.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DisplayCategory;
