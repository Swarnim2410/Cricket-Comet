import React from "react";
import { RiEBike2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { GrNext } from "react-icons/gr";
import { BiSolidCricketBall } from "react-icons/bi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";
import HomeCard from "../component/HomeCard.jsx";
import CardFeature from "../component/CardFeature.jsx";
import HomeCardNull from "../component/HomeCardNull.jsx";
import { useRef } from "react";
import AllProducts from "../component/AllProducts.jsx";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
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

  const [data, setData] = useState({
    email: "",
    text: "",
  });

  console.log(data);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Thank you for your feedback");
    setData({
      email: "",
      text: "",
    });
  };

  return (
    <div className="text-white p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-2 justify-evenly">
            <div className="flex gap-2 bg-slate-300 px-5 lg:px-2 py-1 items-center rounded-full">
              <p className="text-sm font-medium text-black">
                Safe and Fast delievery
              </p>
              <p className="h-4 text-black">{<RiEBike2Fill />}</p>
            </div>
            <div className="flex gap-2 bg-slate-300 px-5 lg:px-2 py-1 items-center rounded-full">
              <p className="text-sm font-medium text-black">
                Best in quality products
              </p>
              <p className="h-4 text-black">{<BiSolidCricketBall />}</p>
            </div>
            <div className="hidden md:flex gap-2 bg-slate-300 px-5 lg:px-2 py-1 items-center rounded-full">
              <p className="text-sm font-medium text-black">Secure Checkouts</p>
              <p className="h-4 text-black">{<AiFillSafetyCertificate />}</p>
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold py-3">
            Unveiling Products Fastest Delivery{" "}
            <span className="text-yellow-500 py-2">at 161.3 kmph</span>
          </h2>
          <p className="py-1 text-base">
            Welcome to Cricket Comet, the premier destination for cricket
            enthusiasts! Dive into a world of excellence with our exceptional
            range of cricket gear. From finely crafted bats that deliver power
            and precision to top-tier protective equipment and stylish apparel,
            we cater to players of all skill levels. Our commitment to quality
            ensures that each product is designed to enhance your performance on
            the field. Enjoy the convenience of fast and reliable shipping,
            coupled with expert advice from our passionate team. Join our
            vibrant cricket community, where like-minded enthusiasts share tips
            and stories. At Cricket Comet, we believe in combining technology
            with tradition to create cricket gear that empowers every player.
            Play your best game and embrace the spirit of cricket with Cricket
            Comet – Where Every Innings Counts!
          </p>
          <Link
            to="/cart"
            className="mt-3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Order Now
            </span>
          </Link>
        </div>

        {/* 4 Home Cards */}

        <div className="md:w-1/2 px-4 py-4 md:flex md:flex-wrap gap-6">
          {homeProductList[0]
            ? homeProductList.map((itr) => (
                <div key={itr._id} className="mb-4">
                  <HomeCard
                    name={itr.name}
                    id={itr._id}
                    image={itr.image}
                    price={itr.price}
                    category={itr.category}
                    description={itr.description}
                  />
                </div>
              ))
            : loadingArray.map((itr, index) => (
                <div key={index} className="mb-4">
                  <HomeCardNull />
                </div>
              ))}
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

      <div className="bg-black h-screen flex items-center justify-center p-12 py-6">
        <div className="mx-auto w-full max-w-screen-lg bg-blue-700 px-5 py-10">
          <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-20">
            <div className="flex justify-center md:justify-end">
              <img
                className="w-full max-w-sm"
                src="https://ouch-cdn2.icons8.com/sKnF2PmYhkmP28DzIm6KqWSknT03UVWjg3FLlGYIOp4/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTI3/L2U4OWQ2NmZiLTg0/NzEtNDc3NS1hNTA0/LTMwNWRiYmJkNzg0/MC5zdmc.png"
                alt="Marketing newsletter via computer Illustration in PNG, SVG"
              />
            </div>
            <div className="flex items-center">
              <div className="mx-auto md:mx-0">
                <h3 className="text-4xl font-bold text-white">
                  Share your thoughts
                </h3>
                <p className="mt-2 max-w-[20rem] text-lg text-white/80">
                  Want to suggest something? Share your thoughts with us.
                </p>
                <form
                  action=""
                  onSubmit={handleSubmit}
                  className="mt-4 flex flex-col"
                >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={handleOnChange}
                    placeholder="Enter your email"
                    className="w-full rounded border border-white/50 bg-transparent px-3 py-2 text-white placeholder:text-white/50 md:max-w-[18rem] mt-2"
                  />
                  <div className="md:col-span-5 mt-2">
                    <textarea
                      type="text"
                      name="text"
                      id="text"
                      value={data.text}
                      onChange={handleOnChange}
                      placeholder="Message"
                      className="h-20 border mt-1 rounded px-4 w-full bg-blue-700 text-white"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full max-w-[14rem] rounded bg-white/30 px-14 py-2 text-center text-white"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
