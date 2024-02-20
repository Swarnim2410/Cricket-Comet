import React, { useState } from "react";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AllProducts = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);

  // console.log(productData);

  //to display first 4 data in home page-->
  //   const homeProductList = productData.slice(0, 4);

  //get the products whose category are bats -->
  //   const homeProductListBats = productData.filter(
  //     (itr) => itr.category === "bats",
  //     []
  //   );

  //display loading while data is loaded..
  //   const loadingArray = new Array(4).fill(null);
  //   const loadingArray2 = new Array(5).fill(null);

  //to display next and previous product in horizontal scrollbar..

  //   const slideProductRef = useRef();
  //   const nextProduct = () => {
  //     slideProductRef.current.scrollLeft += 240;
  //   };
  //   const prevProduct = () => {
  //     slideProductRef.current.scrollLeft -= 240;
  //   };

  //to extract all categories present..
  const categoryList = [
    ...new Set(productData.map((itr) => itr.category)),
  ].sort();
  //console.log(categoryList);

  //dataFilter will contain all items of particular category
  //useEffect is used to set initial value to allProducts and it will run whenever productData changes
  
  const [dataFilter, setDataFilter] = useState([]);


  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  // handleFilterProduct(category) will filter the data according to provided category..
  const handleFilterProduct = (category) => {
    const filteredData = productData.filter(
      (itr) => itr.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filteredData];
    });
  };

  return (
    <div className="my-5">
      <p className="font-bold text-2xl text-slate-300 mb-4">{heading}</p>
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList.map((itr, index) => {
          return (
            <FilterProduct
              category={itr}
              key={index}
              onClick={() => handleFilterProduct(itr)}
            />
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {dataFilter.map((itr) => {
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

export default AllProducts;
