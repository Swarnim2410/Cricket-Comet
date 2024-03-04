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

  const [dataFilter, setDataFilter] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  //useEffect is used to set initial value to allProducts and it will run whenever productData changes

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  // handleFilterProduct(category) will filter the data according to provided category..

  const handleFilterProduct = (category) => {
    setFilterBy(category);

    const filteredData = productData.filter(
      (itr) => itr.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filteredData];
    });
  };

  const closeAlert = () => {
    var alertDiv = document.getElementById("alertDiv");
    alertDiv.parentNode.removeChild(alertDiv);
  };

  return (
    /*Alert box*/
    <div className="">
      {productData[0] ? (
        <div className="my-5">
          <div
            id="alertDiv"
            data-dismissible="alert"
            role="alert"
            className="mb-4 md:mb-6 font-regular relative flex w-full max-w-screen-lg mx-auto rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 px-4 py-4 text-base text-black font-bold"
          >
            <div className="ml-3 mr-12">
              Filter by your own preferences below
            </div>
            <button
              data-dismissible-target="alert"
              onClick={closeAlert}
              className="!absolute top-3 right-3 select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs uppercase text-red-700 transition-all hover:bg-red-400 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-bold"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="my-5">
          <div
            id="alertDiv"
            data-dismissible="alert"
            role="alert"
            className="mb-4 md:mb-6 font-regular relative flex w-full max-w-screen-lg mx-auto rounded-lg bg-gradient-to-tr from-red-600 to-red-400 px-4 py-4 text-base text-black font-bold"
          >
            <div className="ml-3 mr-12">
              Please wait for a moment..
            </div>
            <button
              data-dismissible-target="alert"
              onClick={closeAlert}
              className="!absolute top-3 right-3 select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs uppercase text-white transition-all hover:bg-black active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-bold"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* display all categories*/}
      <p className="font-bold text-2xl text-slate-300 mb-4">{heading}</p>
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList.map((itr, index) => {
          return (
            <FilterProduct
              category={itr}
              key={index}
              isActive={itr.toLowerCase() === filterBy.toLowerCase()}
              onClick={() => handleFilterProduct(itr)}
            />
          );
        })}
      </div>

      {/* display items of a filtered category from above categories*/}

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
