import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { addProduct } from "../serveces/productService";

const AddProduct = () => {
  const [period, setPeriod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
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
    data.append("vehicleCompatibility", formData.vehicleCompatibility);
    data.append("partNumber", formData.partNumber);
    data.append("quantity", formData.quantity);
    data.append("price", formData.price);
    data.append("image", formData.image);
    data.append("weight", formData.weight);
    data.append("height", formData.height);
    data.append("width", formData.width);
    data.append("length", formData.length);
    data.append("material", formData.material);
    data.append("warranty", `${formData.warranty} ${period}`);

    try {
      const response = await addProduct(data);
      alert(response.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-full ml-64 flex justify-center">
      <div className="w-5/6 h-7/10 bg-[#fff] rounded-xl shadow-lg shadow-blue-700 border-blue-800">
        <h1 className="text-center mt-10 font-medium text-3xl">ADD PRODUCT</h1>
        <div className="flex">
          <div className="flex m-5 ml-10 flex-col gap-3">
            <label>
              Name : <br />
              <input
                placeholder="Enter Product Name..."
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Description : <br />
              <textarea
                placeholder="Enter Product Description..."
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Price : <br />
              <input
                placeholder="Price"
                type="number"
                required
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Quantity : <br />
              <input
                placeholder="Quantity"
                type="number"
                required
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </label>
            <label>
              Vehicle Compatibility (one per line):
              <textarea
                rows={4}
                required
                name="vehicleCompatibility"
                value={formData.vehicleCompatibility}
                onChange={handleChange}
              />
            </label>
            <label>
              Part No : <br />
              <input
                placeholder="Part No.."
                type="text"
                required
                name="partNumber"
                value={formData.partNumber}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="flex flex-col mr-10 m-5 gap-10">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-gray-700"
            />
            <label>
              Weight :
              <input
                placeholder="Quantity"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </label>
            <div className="flex flex-col">
              <h2>Dimentions</h2>
              <input
                placeholder="Length"
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
              />
              <input
                placeholder="Width"
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
              />
              <input
                placeholder="Height"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <label>
              Material :
              <input
                placeholder="Material.."
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
              />
            </label>
            <label className="flex">
              Waranty :
              <input
                placeholder="Product Waranty..."
                type="number"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                className="w-32 mr-3"
              />
              <select name="period" id="period" onClick={handleGetPeriod}>
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
          className="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2"
        >
          <FiPlus />
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
