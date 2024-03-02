import React, { useEffect, useState } from "react";
import AllProducts from "../component/AllProducts";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";

const DisplayCategory = () => {
  const productData = useSelector((state) => state.product.productList);

  var currentUrl = window.location.href;
  var x = currentUrl.toString();
  const urlParts = x.slice("http://".length).split("/");
  const category = urlParts[1];
  //console.log(category);

  const [dataFilter, setDataFilter] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  //useEffect is used to set initial value to allProducts and it will run whenever productData changes

  const filteredData = productData.filter(
    (itr) => itr.category.toLowerCase() === category.toLowerCase()
  );

  //console.log(filteredData);

  return (
    <div className="">
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
      <AllProducts heading={"Explore more products"} />
    </div>
  );
};

export default DisplayCategory;
