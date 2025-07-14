import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, getSpecificProduct } from "../serveces/productService";
import LoaderIcon from "./ui/loader";
import BackButton from "./ui/backButton";
import DeleteButton from "./ui/deleteButton";
import KeyInfoSwitch from "./ui/keyInfoSwitch";
import ProductStatusSelect from "./ui/productStatusSelect";
// import SelectCatagory from "./ui/selectCatagory";
import SelectWarranty from "./ui/selectWarranty";
import { useEffect, useState } from "react";
// import SUbCatagory from "./ui/vehicleType";

const ProductDetailedview = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCatagory: "",
    brand: "",
    vehicleCompatibility: [],
    partNumber: "",
    quantity: 1,
    mrp: 0,
    price: 0,
    images: null,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    length: 0,
    material: "",
    warranty: 0,
    color: [],
    features: [],
  });

  const { productId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [showDivB, setShowDivB] = useState(false);
  const [colors, setColors] = useState([]);

  const [compatabilityValue, setCompatabilityValue] = useState("");
  const [compatability, setCompatability] = useState([]);
  const [featureValue, setFeatureValue] = useState("");
  const [features, setFeatures] = useState([]);

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getspecificProduct", productId],
    queryFn: () => getSpecificProduct(productId),
  });

  console.log("color", colors);
  console.log("productData", productData);

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      navigate("/Products");
    },
    onError: (error) => {
      console.error("Product not deleted:", error);
    },
  });

  const handleDeleteProduct = () => {
    mutation.mutate(productId);
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

  const handleEditProduct = () => {
    setIsEdit((prev) => !prev);
  };

  useEffect(() => {
    if (productData && isEdit) {
      setFormData({
        name: productData.name || "",
        description: productData.description || "",
        category: productData.category?._id || "",
        subCatagory: productData.subCategory || "",
        brand: productData.brand || "",
        vehicleCompatibility: productData.vehicleCompatibility || [],
        partNumber: productData.partNumber || "",
        quantity: productData.quantity || 1,
        mrp: productData.mrp || 0,
        price: productData.price || 0,
        images: productData.images || [],
        dimensions: {
          length: productData.dimensions?.length || 0,
          width: productData.dimensions?.width || 0,
          height: productData.dimensions?.height || 0,
        },
        length: productData.length || 0,
        material: productData.material || "",
        warranty: productData.warranty || 0,
        color: productData.color || [],
        features: productData.features || [],
      });
      setColors(productData.color || []);
      setCompatability(productData.vehicleCompatibility || []);
      setFeatures(productData.features || []);
    }
  }, [productData, isEdit]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="w-20 h-20">
          <LoaderIcon />
        </div>
      </div>
    );
  }
  if (error) {
    return <h2>There is a error occured</h2>;
  }

  return (
    <div className="flex flex-col  items-center min-h-screen text-gray-400 p-7 gap-4 ">
      <div className="flex  w-full p-2 rounded-2xl justify-between bg-[#070824] shadow-md shadow-[#5765ac]">
        {/* Hedear Container */}
        <div className="flex items-center gap-4">
          <BackButton />
          <h3 className="text-xl">Product Detailed View</h3>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="border px-3 py-1 rounded-lg bg-[#6c6b6b] text-white hover:bg-[#413f3f]"
            onClick={handleEditProduct}
          >
            {isEdit ? "Discard" : "Edit"}
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={handleDeleteProduct}
          >
            <DeleteButton />
          </button>
        </div>
      </div>

      {/* Bottom Containers */}

      {!isEdit ? (
        <div className="flex w-full justify-between gap-4 items-stretch">
          {/* Images & preview */}
          <div className="flex flex-col justify-between gap-4 p-5 w-1/2 rounded-2xl bg-[#070824] shadow-md shadow-[#5765ac]">
            {/* Images */}
            <div className="flex justify-between gap-4 w-full h-1/2 bg-[#111826] rounded-2xl p-4">
              {/* First image */}
              <div className="border border-white w-1/2 rounded-2xl overflow-hidden">
                {productData?.images?.[0] && (
                  <img
                    src={productData.images[0]}
                    alt="Main"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </div>

              {/* Grid of next 1-4 images */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 w-1/2">
                {productData?.images?.slice(1, 5).map((img, index) => (
                  <div
                    key={index}
                    className="border rounded-2xl overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`Image ${index + 2}`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Preview & Visibility */}
            <div className="flex justify-between gap-4 w-full h-1/2 bg-[#111826] rounded-2xl p-4">
              <div className="flex flex-col justify-between w-1/2 h-full gap-4 ">
                <div className="border h-1/2 rounded-2xl">visibility</div>
                <div className="border h-1/2 rounded-2xl">preview</div>
              </div>
              <div className="border w-1/2 h-full rounded-2xl">
                related items
              </div>
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
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.displayType}
                      </h3>
                    </div>
                  </div>
                  {/* Name */}
                  <div className="flex flex-col gap-2 w-full py-3">
                    <label>Product Name</label>
                    <div className="flex justify-between w-full">
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.name}
                      </h3>
                    </div>
                  </div>
                  {/* Status & Brand */}
                  <div className="flex justify-start gap-40 items-center py-2 w-full">
                    <div>
                      <label>Status</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.status}
                      </h3>
                    </div>
                    <div>
                      <label>Brand</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.brand}
                      </h3>
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
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.mrp}
                      </h3>
                    </div>
                    <div>
                      <label>Our price</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.price}
                      </h3>
                    </div>
                    <div>
                      <label>Quantity</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.quantity}
                      </h3>
                    </div>
                  </div>
                  {/* Dimentions */}
                  <div className="flex justify-between items-center py-2 w-full gap-7">
                    <div>
                      <label>Length</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.dimensions.length}
                      </h3>
                    </div>
                    <div>
                      <label>Width</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.dimensions.width}
                      </h3>
                    </div>
                    <div>
                      <label>Height</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.dimensions.height}
                      </h3>
                    </div>
                  </div>
                  {/* Warranty & peried*/}
                  <div className="flex justify-between items-center py-2 w-full gap-10">
                    <div>
                      <label>Warranty</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.warranty} months
                      </h3>
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
                      <label>Available Colors</label>
                      {/* Selected Color Swatches */}
                      <div className="flex gap-3 flex-wrap mt-2">
                        {productData?.color?.map((color) => (
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
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.material?.trim()
                          ? productData.material
                          : "This field is empty"}
                      </h3>
                    </div>
                  </div>
                  {/* Vehicle Compatability */}
                  <div className="">
                    <label>Vehicle Compatability</label>
                    <div className="my-3 h-16 overflow-y-auto scrollbar-hide  border p-2 rounded-lg">
                      <h4 className="font-bold">Items:</h4>
                      <ul className="list-disc list-inside">
                        {productData?.vehicleCompatibility?.map(
                          (item, index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center pr-2"
                            >
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                  {/* Features */}
                  <div className="">
                    <label>Features</label>

                    <div className="my-3 h-16 overflow-y-auto scrollbar-hide  border p-2 rounded-lg">
                      <h4 className="font-bold">Items:</h4>
                      <ul className="list-disc list-inside">
                        {productData?.features?.map((item, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center pr-2"
                          >
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Description */}
                  <div className="flex py-2 w-full">
                    <div className="w-full">
                      <label>Description:</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.description}
                      </h3>
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
      ) : (
        <div className="flex w-full justify-between gap-4 items-stretch">
          {/* Images & preview */}
          <div className="flex flex-col justify-between gap-4 p-5 w-1/2 rounded-2xl bg-[#070824] shadow-md shadow-[#5765ac]">
            {/* Images */}
            <div className="flex justify-between gap-4 w-full h-1/2 bg-[#111826] rounded-2xl p-4">
              <div className="border border-white w-1/2 rounded-2xl"></div>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 w-1/2">
                <div className="border rounded-2xl">1</div>
                <div className="border rounded-2xl">2</div>
                <div className="border rounded-2xl">3</div>
                <div className="border rounded-2xl">4</div>
              </div>
            </div>
            {/* Preview & Visibility */}
            <div className="flex justify-between gap-4 w-full h-1/2 bg-[#111826] rounded-2xl p-4">
              <div className="flex flex-col justify-between w-1/2 h-full gap-4 ">
                <div className="border h-1/2 rounded-2xl">visibility</div>
                <div className="border h-1/2 rounded-2xl">preview</div>
              </div>
              <div className="border w-1/2 h-full rounded-2xl">
                related items
              </div>
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
      )}
    </div>
  );
};

export default ProductDetailedview;
