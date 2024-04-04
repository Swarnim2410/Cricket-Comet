import React, { useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const [newimg, setNewimg] = useState(null);
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageDataUrl: "",
  });

  const handleOnChange = (e) => {
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
        imageDataUrl: reader.result, // Save the data URL in state
      }));
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("image", newimg); 

      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_DOMAIN}/addproduct`,
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

      if (responseData.redirect) {
        setData({
          name: "",
          category: "",
          price: "",
          description: "",
          imageDataUrl: "",
        });
        setNewimg(null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding product");
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
                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-900"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {data.imageDataUrl ? (
                          <img
                            src={data.imageDataUrl}
                            alt="Selected Image"
                            className="mb-4 rounded-lg max-w-full h-auto max-h-20"
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
                        name="image"
                        onChange={handleFileChange}
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
                      className="h-20 border mt-1 rounded px-4 w-full bg-black text-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
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

export default AddProduct;
