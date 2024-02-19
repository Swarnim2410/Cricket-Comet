import React from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { useState } from "react";
import { toast } from "react-hot-toast";
const AddProduct = () => {
  const [images, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  //console.log(data);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const img = await ImagetoBase64(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        image: img,
      };
    });
    if (data.img == "") {
      setImage(() => false);
    } else {
      setImage(() => true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, image, price, description } = data;
    if (name && category && image && price && description) {
      //sending data to backend server in signup and getting response in fetchData
      const fetchData = await fetch(
        `${import.meta.env.VITE_APP_SERVER_DOMAIN}/addproduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        // Handle the response from the backend
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          toast(data.message);
          if (data.redirect) {
            setImage(() => false);
          }
          setData(() => {
            return {
              name: "",
              category: "",
              price: "",
              description: "",
            };
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      toast("Enter all details");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-black flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Add a new product here
          </h2>
          <p className="text-gray-500 mb-6">Only admins can add a product</p>

          <div className="bg-slate-500 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Product Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Name of the product</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleOnChange}
                        value={data.name}
                        className="h-10 border mt-1 rounded px-4 w-full bg-black text-white"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="category">
                        Choose category of the product
                      </label>
                      <select
                        className="h-10 border mt-1 rounded px-2 w-full bg-black text-white"
                        id="category"
                        name="category"
                        onChange={handleOnChange}
                        value={data.category}
                      >
                        <option value="value">Select Category</option>
                        <option value="bats">Bats</option>
                        <option value="balls">Balls</option>
                        <option value="helmets">Helmets</option>
                        <option value="gloves">Gloves</option>
                        <option value="shirts">Shirts</option>
                      </select>
                    </div>

                    <div className="md:col-span-5">
                      <label
                        htmlFor="image"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-900"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {/* {console.log(images)} */}
                          {images ? (
                            <img
                              src={data.image}
                              alt="Uploaded Image"
                              className="object-fit h-40 w-40"
                            />
                          ) : (
                            <>
                              <div className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 text-4xl">
                                <IoCloudUploadSharp />
                              </div>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, or JPG
                              </p>
                            </>
                          )}
                        </div>

                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={uploadImage}
                        />
                      </label>
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        onChange={handleOnChange}
                        value={data.price}
                        className="h-10 border mt-1 rounded px-4 w-full bg-black text-white"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="description">Description</label>
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        onChange={handleOnChange}
                        value={data.description}
                        className="h-20 border mt-1 rounded px-4 w-full bg-black
                      text-white"
                      ></textarea>
                    </div>

                    <div className="md:col-span-5 text-center">
                      <div className="inline-flex items-end">
                        <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
