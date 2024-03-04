import React from "react";
import { RiEBike2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { GrNext } from "react-icons/gr";
import { BiSolidCricketBall } from "react-icons/bi";
import { BsDoorOpenFill } from "react-icons/bs";
import { GrPrevious } from "react-icons/gr";
import HomeCard from "../component/HomeCard.jsx";
import CardFeature from "../component/CardFeature.jsx";
import HomeCardNull from "../component/HomeCardNull.jsx";
import { useRef } from "react";
import AllProducts from "../component/AllProducts.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()
  const productData = useSelector((state) => state.product.productList);

  //console.log(productData);

  //to display first 4 data in home page-->
  const homeProductList = productData.slice(0, 4);

  //get the products whose category are bats -->
  const homeProductListBats = productData.filter(
    (itr) => itr.category === "bats",
    []
  );

  //display loading while data is loaded..
  const loadingArray = new Array(4).fill(null);
  const loadingArray2 = new Array(5).fill(null);

  //to display next and previous product in horizontal scrollbar..
  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 240;
  };
  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 240;
  };

  //to extract all categories present..
  // const categoryList = [
  //   ...new Set(productData.map((itr) => itr.category)),
  // ].sort();
  //console.log(categoryList);

  //dataFilter will contain all items of particular category
  //useEffect is used to set initial value to allProducts and it will run whenever productData changes
  // const [dataFilter, setDataFilter] = useState([]);

  // useEffect(() => {
  //   setDataFilter(productData);
  // }, [productData]);

  // handleFilterProduct(category) will filter the data according to provided category..
  // const handleFilterProduct = (category) => {
  //   const filteredData = productData.filter(
  //     (itr) => itr.category.toLowerCase() === category.toLowerCase()
  //   );
  //   setDataFilter(() => {
  //     return [...filteredData];
  //   });
  // };

  return (
    <div className="text-white p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-2">
            <div className="flex gap-2 bg-slate-300 w-48 px-2 py-1 items-center rounded-full">
              <p className="text-sm font-medium text-black">
                Safe and Fast delievery
              </p>
              <p className="h-4 text-black">{<RiEBike2Fill />}</p>
            </div>
            <div className="flex gap-2 bg-slate-300 w-48 px-2 py-1 items-center rounded-full">
              <p className="text-sm font-medium text-black">
                Best in quality products
              </p>
              <p className="h-4 text-black">{<BiSolidCricketBall />}</p>
            </div>
            <div className="flex gap-2 bg-slate-300 w-48 px-2 py-1 items-center rounded-full">
              <p className="text-sm font-medium text-black">
                Everything at doorstep
              </p>
              <p className="h-4 text-black">{<BsDoorOpenFill />}</p>
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold py-3">
            The fastest delievery to{" "}
            <span className="text-yellow-500">your home</span>
          </h2>
          <p className="py-3 text-base">
            Cricket is a bat-and-ball game played between two teams of eleven
            players on a field at the centre of which is a 22-yard pitch with a
            wicket at each end, each comprising two bails balanced on three
            stumps. Two players from the batting team the striker and nonstriker
            stand in front of either wicket, with one player from the fielding
            team bowling the ball towards the striker's wicket from the opposite
            end of the pitch. The striker's goal is to hit the bowled ball and
            then switch places with the nonstriker, with the batting team
            scoring one run for each exchange. Runs are also scored when the
            ball reaches or crosses the boundary of the field or when the ball
            is bowled illegally.
          </p>
          <button className="mt-3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Order Now
            </span>
          </button>
        </div>

        {/* 4 Home Cards */}

        <div className="md:w-1/2 px-4 py-4 md:flex md:flex-wrap gap-6">
          {homeProductList[0]
            ? homeProductList.map((itr, index) => (
                <div key={index} className="mb-4">
                  <HomeCard
                    name={itr.name}
                    key={itr._id}
                    id={itr._id}
                    image={itr.image}
                    price={itr.price}
                    category={itr.category}
                    description={itr.description}
                  />
                </div>
              ))
            : loadingArray.map((itr, index) => {
                return <HomeCardNull key={index} />;
              })}
        </div>
      </div>

      {/*bats category */}

      <div>
        <div className="">
          <div className="flex w-full items-center">
            <p className="font-bold text-2xl text-slate-300 mb-4">Bats</p>
            <div className="ml-auto flex gap-3">
              <button className="text-lg" onClick={prevProduct}>
                <GrPrevious />
              </button>
              <button className="text-lg" onClick={nextProduct}>
                <GrNext />
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex gap-6 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductListBats[0]
            ? homeProductListBats.map((itr, index) => {
                return (
                  <CardFeature
                    name={itr.name}
                    key={itr._id}
                    id={itr._id}
                    image={itr.image}
                    price={itr.price}
                    category={itr.category}
                    description={itr.description}
                  />
                );
              })
            : loadingArray2.map((itr, index) => {
                return <HomeCardNull key={index} />;
              })}
        </div>
      </div>

      {/*all categories with filter options*/}

      <AllProducts heading={"Your Product"} />
    </div>
  );
};

export default Home;
