import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { addProduct } from "../serveces/productService";

const AddProduct = () => {
  const [period, setPeriod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand:"",
    vehicleType: "",
    vehicleCompatibility: "",
    partNumber: "",
    quantity: 1,
    price: 0,
    image: null,
    weight: 0,
    height: 0,
    width: 0,
    length: 0,
    material: "",
    warranty: 0,
  });
  // console.log("formData", formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleGetPeriod = (e) => {
    setPeriod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Product image is required");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("vehicleType", formData.vehicleType);
    data.append("vehicleCompatibility", formData.vehicleCompatibility);
    data.append("partNumber", formData.partNumber);
    data.append("quantity", formData.quantity);
    data.append("price", formData.price);
    data.append("images", formData.image);
    data.append("weight", formData.weight);
    data.append("height", formData.height);
    data.append("width", formData.width);
    data.append("length", formData.length);
    data.append("material", formData.material);
    data.append("warranty", `${formData.warranty} ${period}`);

    // console.log("FormData entries:");
    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      const response = await addProduct(data);
      alert(response.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-full ml-64 flex justify-center">
      <div className="w-5/6 h-7/10 bg-[#fff] rounded-xl shadow-xl shadow-blue-700 border-blue-800 flex flex-col items-center justify-between">
        <h1 className="text-center mt-5 font-medium text-3xl">ADD PRODUCT</h1>
        <div className="flex">
          <div className="flex m-5 ml-10 flex-col gap-3">
            <label className="text-gray-600">
              Name : <br />
              <input
                placeholder="Enter Product Name..."
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded-lg shadow-lg   font-extralight"
              />
            </label>
            <label className="text-gray-600">
              Description : <br />
              <textarea
                placeholder="Enter Product Description..."
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded-lg shadow-lg   font-extralight"
              />
            </label>
            <label className="text-gray-600">
              Price : <br />
              <input
                placeholder="Price"
                type="number"
                required
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border p-2 rounded-lg shadow-lg   font-extralight"
              />
            </label>
            <label>
              Brand: <br />
              <input
                placeholder="Brand"
                type="text"
                required
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="border p-2 rounded-lg shadow-lg   font-extralight"
              />
            </label>
            <label>
              Category : <br />
              <select
                name="category"
                id="category"
                className="border p-2 rounded-lg shadow-lg   font-extralight text-gray-400"
                required
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">select Category</option>
                <option value="Engine Parts">Engine Parts</option>
                <option value="Transmission & Drivetrain">
                  Transmission & Drivetrain
                </option>
                <option value="Suspension & Steering">
                  Suspension & Steering
                </option>
                <option value="Brakes">Brakes</option>
                <option value="Electrical & Lighting">
                  Electrical & Lighting
                </option>
                <option value="Cooling System">Cooling System</option>
                <option value="Fuel System">Fuel System</option>
                <option value="Air Conditioning & Heating">
                  Air Conditioning & Heating
                </option>
                <option value="Body Parts">Body Parts</option>
                <option value="Interior Accessories">
                  Interior Accessories
                </option>
                <option value="Exhaust System">Exhaust System</option>
                <option value="Filters">Filters</option>
                <option value="Tires & Wheels">Tires & Wheels</option>
                <option value="Lubricants & Fluids">Lubricants & Fluids</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </label>
            <label>
              Vehicle Type : <br />
              <select
                name="vehicleType"
                id="vehicleType"
                className="border p-2 rounded-lg shadow-lg   font-extralight text-gray-400"
                required
                value={formData.vehicleType}
                onChange={handleChange}
              >
                <option value="">select Vehicle Type</option>
                <option value="Bike">Bike</option>
                <option value="Car">Car</option>
                <option value="Lorry">Lorry</option>
                <option value="Bus">Bus</option>
              </select>
            </label>
            <label className="text-gray-600">
              Quantity : <br />
              <input
                placeholder="Quantity"
                type="number"
                required
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="border p-2 rounded-lg shadow-lg   font-extralight"
              />
            </label>
            <label className="text-gray-600">
              Vehicle Compatibility (one per line):
              <textarea
                rows={2}
                required
                name="vehicleCompatibility"
                value={formData.vehicleCompatibility}
                onChange={handleChange}
                className="border p-2 rounded-lg shadow-lg   font-extralight"
              />
            </label>
          </div>

          <div className="flex flex-col mr-10 m-5 gap-10">
            <label className="text-gray-600">
              Part No : <br />
              <input
                placeholder="Part No.."
                type="text"
                required
                name="partNumber"
                value={formData.partNumber}
                onChange={handleChange}
                className="border p-2 rounded-lg shadow-lg   font-extralight"
              />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="  p-3 border border-gray-300 rounded-lg text-gray-700 shadow-lg"
            />
            <label className="text-gray-600">
              Weight :
              <input
                placeholder="Quantity"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="border px-2 rounded-lg shadow-lg   font-extralight"
              />
            </label>
            <div className="flex flex-col gap-2">
              <h2>Dimentions</h2>
              <div className="flex">
                <h3 className="text-gray-600 mr-2">Length</h3>
                <input
                  placeholder="Length"
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="border px-2 rounded-lg shadow-lg   font-extralight"
                />
              </div>
              <div className="flex">
                <h3 className="text-gray-600 mr-4">Width</h3>
                <input
                  placeholder="Width"
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  className="border px-2 rounded-lg shadow-lg   font-extralight"
                />
              </div>
              <div className="flex">
                <h3 className="text-gray-600 mr-3">Height</h3>
                <input
                  placeholder="Height"
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="border px-2 rounded-lg shadow-lg   font-extralight"
                />
              </div>
            </div>
            <label className="text-gray-600 ">
              Material :
              <input
                placeholder="Material.."
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="border p-2 rounded-lg shadow-lg   font-extralight"
              />
            </label>
            <label className="flex text-gray-600">
              Waranty :
              <input
                placeholder="Product Waranty..."
                type="number"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                className="w-28 mr-3 border px-2 rounded-lg shadow-lg   font-extralight text-gray-400"
              />
              <select
                name="period"
                id="period"
                onClick={handleGetPeriod}
                className="border px-2 rounded-lg shadow-lg   font-extralight text-gray-400"
              >
                <option value="">select period</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </label>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-3 border-blue-700 border-1 text-black rounded-lg flex items-center justify-center gap-2 w-52 mb-5 shadow-lg shadow-blue-700"
        >
          <FiPlus />
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
