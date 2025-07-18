import React, { useEffect, useState } from "react";
import KeyInfoSwitch from "./ui/keyInfoSwitch";
import ProductStatusSelect from "./ui/productStatusSelect";

const EditProduct = ({
  formData,
  setFormData,
  colors,
  setColors,
  compatabilityValue,
  setCompatabilityValue,
  compatability,
  setCompatability,
  featureValue,
  setFeatureValue,
  features,
  setFeatures,
  showDivB,
  setShowDivB,
}) => {
  const [images, setImages] = useState(
    Array(5)
      .fill("")
      .map((_, index) => formData.images?.[index] || "")
  );

  useEffect(() => { 
    setImages(
      Array(5)
        .fill("")
        .map((_, index) => formData.images?.[index] || "")
    );
  }, [formData.images]);

  const handleCompatability = (e) => {
    e.preventDefault();
    if (compatabilityValue.trim() !== "") {
      setCompatability((prev) => [...prev, compatabilityValue.trim()]);
      setCompatabilityValue("");
    }
  };

  const handleFeatures = (e) => {
    e.preventDefault();
    if (featureValue.trim() !== "") {
      setFeatures((prev) => [...prev, featureValue.trim()]);
      setFeatureValue("");
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    if (colors.length < 5 && !colors.includes(newColor)) {
      setColors((prev) => [...prev, newColor]);
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setColors((prev) => prev.filter((color) => color !== colorToRemove));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedImages = [...images];
      updatedImages[index] = imageUrl;
      setImages(updatedImages);

      // Update formData.images to reflect the new image
      const updatedFormImages = [...(formData.images || [])];
      updatedFormImages[index] = imageUrl; // Update or add the new image URL
      setFormData((prev) => ({
        ...prev,
        images: updatedFormImages,
      }));
    }
  };

  const renderImageSlot = (index) => (
    <label className="cursor-pointer w-full h-full">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, index)}
        className="hidden"
      />
      <div
        className="w-full h-full border border-white rounded-2xl flex items-center justify-center overflow-hidden bg-[#1b2437]"
        style={{ minHeight: "100px" }}
      >
        {images[index] ? (
          <img
            src={images[index]}
            alt={`preview-${index}`}
            className="object-cover w-full h-full rounded-2xl"
          />
        ) : (
          <span className="text-xs text-gray-400">Click to add</span>
        )}
      </div>
    </label>
  );

  return (
    <div className="flex flex-col  items-center min-h-screen text-gray-400 gap-4 w-full">
      <div className="flex w-full justify-between gap-4 items-stretch">
        {/* Images & preview */}
        <div className="flex flex-col justify-between gap-4 p-5 w-1/2 rounded-2xl bg-[#070824] shadow-md shadow-[#5765ac]">
          {/* Images */}
          <div className="flex justify-between gap-4 w-full h-1/2 bg-[#111826] rounded-2xl p-4">
            {/* Main Image */}
            <div className="w-1/2">{renderImageSlot(0)}</div>

            {/* 4 Other Images */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4 w-1/2">
              {renderImageSlot(1)}
              {renderImageSlot(2)}
              {renderImageSlot(3)}
              {renderImageSlot(4)}
            </div>
          </div>
          {/* Preview & Visibility */}
          <div className="flex justify-between gap-4 w-full h-1/2 bg-[#111826] rounded-2xl p-4">
            <div className="flex flex-col justify-between w-1/2 h-full gap-4 ">
              <div className="border h-1/2 rounded-2xl">visibility</div>
              <div className="border h-1/2 rounded-2xl">preview</div>
            </div>
            <div className="border w-1/2 h-full rounded-2xl">related items</div>
          </div>
        </div>
        {/* Details */}
        <div className=" p-3 w-1/2 rounded-2xl h-full bg-[#070824] shadow-md shadow-[#5765ac] font-extralight">
          <h3 className="text-xl text-gray-200 py-3">Product Details</h3>

          {!showDivB ? (
            <div className="flex flex-col items-center">
              {/* Div A */}
              <div className=" p-4 rounded mb-4">
                {/* Key Info */}
                <div className="flex flex-col gap-2 w-full">
                  <label>Key info to decribe and display your product</label>
                  <div className="flex">
                    <KeyInfoSwitch />
                  </div>
                </div>
                {/* Name */}
                <div className="flex flex-col gap-2 w-full py-3">
                  <label>Product Name</label>
                  <div className="flex justify-between w-full">
                    <input
                      type="text"
                      value={formData.name}
                      className="w-full bg-[#1b2437] p-1"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                {/* Status & Brand */}
                <div className="flex justify-between items-center py-2 w-full">
                  <div>
                    <label>Status</label>
                    <ProductStatusSelect />
                  </div>
                  <div>
                    <label>Brand</label>
                    <input
                      type="text"
                      className="w-full bg-[#1b2437] p-1 "
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          brand: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                {/* Vehicle Type & Catagory */}
                <div className="flex justify-between items-center py-2 w-full">
                  <div>
                    <label>Catagory</label>
                    {/* <SelectCatagory /> */}
                  </div>
                  <div>
                    <label>Sub Catagory</label>
                    {/* <SUbCatagory /> */}
                  </div>
                </div>
                {/* price & Quantity */}
                <div className="flex justify-between items-center py-2 w-full gap-7">
                  <div>
                    <label>mrp</label>
                    <input
                      type="number"
                      className="w-full bg-[#1b2437] p-1 "
                      value={formData.mrp}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mrp: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>Our price</label>
                    <input
                      type="number"
                      className="w-full bg-[#1b2437] p-1 "
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>Quantity</label>
                    <input
                      type="number"
                      className="w-full bg-[#1b2437] p-1 "
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          quantity: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                {/* Dimentions */}
                <div className="flex justify-between items-center py-2 w-full gap-7">
                  <div>
                    <label>Length</label>
                    <input
                      type="number"
                      className="w-full bg-[#1b2437] p-1 "
                      value={formData.dimensions.length}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dimensions: {
                            ...prev.dimensions,
                            length: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>Width</label>
                    <input
                      type="number"
                      className="w-full bg-[#1b2437] p-1 "
                      value={formData.dimensions.width}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dimensions: {
                            ...prev.dimensions,
                            width: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>Height</label>
                    <input
                      type="number"
                      className="w-full bg-[#1b2437] p-1 "
                      value={formData.dimensions.height}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dimensions: {
                            ...prev.dimensions,
                            height: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
                {/* Warranty & peried*/}
                <div className="flex justify-between items-center py-2 w-full gap-10">
                  <div>
                    <label>Warranty (in Month)</label>
                    <input
                      type="number"
                      className="w-full bg-[#1b2437] p-1 "
                      value={formData.warranty}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          warranty: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDivB(true)}
                className="bg-[#3f4d7b] text-white px-4 py-1 hover:bg-[#262e4a] w-24"
              >
                Next
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {/* Div B */}
              <div className=" p-4 rounded mb-4 w-full">
                {/* Meterial & Colour */}
                <div className="flex justify-between items-center py-2 w-full gap-7">
                  <div className="flex flex-col gap-2 w-full">
                    {/* Color Picker Input */}
                    <div>
                      <label className="block mb-1">Colour</label>
                      <input
                        type="color"
                        onChange={handleColorChange}
                        className="w-20 h-5 bg-[#1b2437] rounded-full cursor-pointer"
                      />
                    </div>

                    {/* Selected Color Swatches */}
                    <div className="flex gap-3 flex-wrap mt-2">
                      {colors.map((color) => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded-full cursor-pointer border-2 border-white"
                          style={{ backgroundColor: color }}
                          onClick={() => handleRemoveColor(color)}
                          title="Click to remove"
                        ></div>
                      ))}
                    </div>

                    {/* Info or Limit Reached */}
                    {colors.length >= 5 && (
                      <p className="text-xs text-red-400">
                        Maximum of 5 colors selected
                      </p>
                    )}
                  </div>
                  <div>
                    <label>Meterial</label>
                    <input
                      type="Text"
                      className="w-full bg-[#1b2437] p-1 "
                      value={formData.material}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          material: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                {/* Vehicle Compatability */}
                <div className="">
                  <label>Vehicle Compatability</label>
                  <form onSubmit={handleCompatability} className="flex gap-2">
                    <input
                      type="text"
                      value={compatabilityValue}
                      onChange={(e) => setCompatabilityValue(e.target.value)}
                      className="w-full bg-[#1b2437] p-1 h-8"
                    />
                    <button
                      type="submit"
                      className="bg-[#3f4d7b] text-white px-4 py-1 hover:bg-[#262e4a]"
                    >
                      Add
                    </button>
                  </form>

                  <div className="my-3 h-16 overflow-y-auto scrollbar-hide">
                    <h4 className="font-bold">Items:</h4>
                    <ul className="list-disc list-inside">
                      {compatability.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center pr-2"
                        >
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setCompatability((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="text-red-400 hover:text-red-600 font-bold ml-2"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Features */}
                <div className="">
                  <label>Features</label>
                  <form onSubmit={handleFeatures} className="flex gap-2">
                    <input
                      type="text"
                      value={featureValue}
                      onChange={(e) => setFeatureValue(e.target.value)}
                      className="w-full bg-[#1b2437] p-1 h-8"
                    />
                    <button
                      type="submit"
                      className="bg-[#3f4d7b] text-white px-4 py-1 hover:bg-[#262e4a]"
                    >
                      Add
                    </button>
                  </form>

                  <div className="my-3 h-16 overflow-y-auto scrollbar-hide">
                    <h4 className="font-bold">Items:</h4>
                    <ul className="list-disc list-inside">
                      {features.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center pr-2"
                        >
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setFeatures((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="text-red-400 hover:text-red-600 font-bold ml-2"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Description */}
                <div className="flex py-2 w-full">
                  <div className="w-full">
                    <label>Description:</label>
                    <textarea
                      className="w-full bg-[#1b2437] p-2"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      maxLength={200}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDivB(false)}
                className="bg-[#3f4d7b] text-white px-4 py-1 hover:bg-[#262e4a] w-24"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
