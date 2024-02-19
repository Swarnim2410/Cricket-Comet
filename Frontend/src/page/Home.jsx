import React from "react";
import { RiEBike2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GrNext } from "react-icons/gr";
import { BiSolidCricketBall } from "react-icons/bi";
import { GrPrevious } from "react-icons/gr";
import HomeCard from "../component/HomeCard.jsx";
import CardFeature from "../component/CardFeature.jsx";
import HomeCardNull from "../component/HomeCardNull.jsx";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);

  // console.log(productData);

  //to display first 4 data in home page-->
  const homeProductList = productData.slice(0, 4);

  //get the products whose category are bats -->
  const homeProductListBats = productData.filter(
    (itr) => itr.category === "bats",
    []
  );

  //display loading while data is loaded..
  const loadingArray = new Array(4).fill(null);

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
          </div>
          <h2 className="text-4xl md:text-6xl font-bold py-3">
            The fastest delievery to{" "}
            <span className="text-yellow-500">your home</span>
          </h2>
          <p className="py-3 text-base">
            sab kuch milta hai idhar chaahe jo manga ke dekh lena
          </p>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Order Now
            </span>
          </button>
        </div>
        <div className="md:w-1/2 px-4 py-4 md:flex md:flex-wrap gap-6">
          {homeProductList[0]
            ? homeProductList.map((itr, index) => (
                <div key={index} className="mb-4">
                  <HomeCard
                    name={itr.name}
                    key={itr._id}
                    image={itr.image}
                    price={itr.price}
                    category={itr.category}
                    description={itr.description}
                  />
                </div>
              ))
            : loadingArray.map((itr) => {
                return <HomeCardNull />;
              })}
        </div>
      </div>
      <div>
        <div className="">
          <div className="flex w-full items-center">
            <p className="font-bold text-2xl text-slate-300 mb-4">Bats</p>
            <div className="ml-auto flex gap-3">
              <button className="text-lg">
                <GrPrevious />
              </button>
              <button className="text-lg">
                <GrNext />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-5 overflow-scroll scrollbar-none">
          {homeProductListBats.map((itr, index) => {
            return (
              <CardFeature
                name={itr.name}
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
    </div>
  );
};

export default Home;
