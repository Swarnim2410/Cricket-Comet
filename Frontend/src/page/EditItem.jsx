import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import toast from "react-hot-toast";

export const EditItem = () => {
  const { id } = useParams(); // Use object destructuring to extract id from useParams
  const productData = useSelector((state) => state.product.productList);
  const productDisplay = productData.filter((item) => item._id === id)[0];
  // console.log(productDisplay);

  const [newimg, setNewimg] = useState(null);

  const [data, setData] = useState({
    name: productDisplay?.name || "",
    price: productDisplay?.price || "",
    category: productDisplay?.category || "",
    description: productDisplay?.category || "",
    image: productDisplay?.image || "",
  });

  useEffect(() => {
    setData({
      name: productDisplay?.name || "",
      price: productDisplay?.price || "",
      category: productDisplay?.category || "",
      description: productDisplay?.description || "",
      image: productDisplay?.image || "",
    });
  }, [productDisplay]);

  // console.log(data);
  // console.log(newimg);

  const handleOnChange = (e) => {
    // console.log(2);
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewimg(file);

    // Read the selected file and convert it to a data URL
    const reader = new FileReader();
    reader.onload = () => {
      setData((prev) => ({
        ...prev,
        image: reader.result, // Save the data URL in state
      }));
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  };

  // console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("image", newimg);

      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_DOMAIN}/editproduct`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await res.json();
      toast(responseData.message);
      // console.log(responseData.product);

      if (responseData.redirect) {
        setData({
          name: responseData.product.name,
          category: responseData.product.category,
          price: responseData.product.price,
          description: responseData.product.description,
          image: responseData.product.image,
        });
        setNewimg(null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding product");
    }
  };

  return (
    <div className="bg-black text-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row">
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl text-white">
              Product Details
            </h2>

            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img
                  className="object-cover w-40 h-40 p-3 rounded-md ring-2 ring-slate-700 dark:ring-indigo-500"
                  src={data.image}
                  alt="Bordered avatar"
                />

                <div className="w-2/3 sm:w-full flex flex-col space-y-5 sm:ml-8">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleFileChange}
                    className="py-3.5 px-7 text-base font-medium bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="items-center mt-8 sm:mt-14">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleOnChange}
                      className="bg-slate-700 border border-slate-800 text-white text-sm rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent block w-full p-2.5"
                      value={data.name}
                    />
                  </div>
                </div>

                <div className="mb-2 sm:mb-6">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium"
                  >
                    Product Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={handleOnChange}
                    className="bg-slate-700 border border-slate-800 text-white text-sm rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent block w-full p-2.5"
                    value={data.price}
                    required
                  />
                </div>

                <div className="mb-2 sm:mb-6">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium"
                  >
                    Product Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    onChange={handleOnChange}
                    readOnly
                    className="bg-slate-500  text-white text-sm rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent block w-full p-2.5"
                    value={data.category}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium"
                  >
                    Product Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    onChange={handleOnChange}
                    name="description"
                    rows="4"
                    className="bg-slate-700 border border-slate-800 text-white text-sm rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent block w-full p-2.5"
                    value={data.description}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditItem;
