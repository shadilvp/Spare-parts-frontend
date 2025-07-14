import {
  addProduct,
  fetchCategory,
  fetchSubCategory,
} from "../serveces/productService";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { deleteProduct, getSpecificProduct } from "../serveces/productService";
// import LoaderIcon from "./ui/loader";
import BackButton from "./ui/backButton";
import KeyInfoSwitch from "./ui/keyInfoSwitch";
import ProductStatusSelect from "./ui/productStatusSelect";
// import SelectCatagory from "./ui/selectCatagory";
import { useRef, useState } from "react";
// import SUbCatagory from "./ui/vehicleType";
import AddButton from "./ui/addProduct";
import { SelectCategoryScrollable } from "./ui/selectCategory";
import { SelectSubCategoryScrollable } from "./ui/selectSubCategory";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    displayType: "",
    description: "",
    category: "",
    subCatagory: "",
    brand: "",
    vehicleCompatibility: [],
    partNumber: "",
    quantity: 1,
    mrp: 0,
    price: 0,
    images: [],
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    material: "",
    warranty: 0,
    color: [],
    features: [],
    keyInfo: "general",
    status: "available",
  });
  // console.log("formData", formData);

  //new
  const navigate = useNavigate();
  const [showDivB, setShowDivB] = useState(false);
  const [colors, setColors] = useState([]);

  const [compatabilityValue, setCompatabilityValue] = useState("");
  const [compatability, setCompatability] = useState([]);
  const [featureValue, setFeatureValue] = useState("");
  const [features, setFeatures] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

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

  //fetching the catagory
  const {
    data: categories,
    isLoading: categoryloading,
    error: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

  //Fetching Subcatagory
  const {
    data: subCategories,
    isLoading: Subcategoryloading,
    error: SubcategoryError,
  } = useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: () => fetchSubCategory(categoryId),
    enabled: !!categoryId,
  });

  const handleAddProduct = () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", categoryId);
    data.append("subCategory", subCategoryId);
    data.append("brand", formData.brand);
    data.append("quantity", formData.quantity.toString());
    data.append("mrp", formData.mrp.toString());
    data.append("price", formData.price.toString());
    data.append("warranty", formData.warranty.toString());
    data.append("material", formData.material);
    data.append("keyInfo", formData.keyInfo);
    data.append("status", formData.status);

    data.append("length", formData.dimensions.length);
    data.append("width", formData.dimensions.width);
    data.append("height", formData.dimensions.height);

    formData.images.forEach((img) => {
      if (img) {
        data.append("images", img);
      }
    });

    data.append("color", JSON.stringify(colors));
    data.append("features", JSON.stringify(features));
    data.append("vehicleCompatibility", JSON.stringify(compatability));

    mutation.mutate(data);

    console.log("🚀 Final Product Data", data);
  };

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("product Added  successful!");
      navigate("/products");
    },
    onError: (error) => {
      console.error("Error adding product:", error);
      toast.error("product not added");
    },
  });

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen ">
  //       <div className="w-20 h-20">
  //         <LoaderIcon />
  //       </div>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return <h2>There is a error occured</h2>;
  // }

  const fileInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleImageClick = (index) => {
    fileInputRefs[index].current?.click();
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => {
      const updatedImages = [...(prev.images || [])];
      updatedImages[index] = file; // Replace or set at index
      return { ...prev, images: updatedImages };
    });
  };

  return (
    <div className="w-full flex justify-center py-3">
      <div className="flex flex-col  items-center min-h-screen text-gray-400 w-11/12 gap-4 ">
        <div className="flex  w-full p-2 rounded-2xl justify-between bg-[#070824] shadow-md shadow-[#5765ac]">
          {/* Hedear Container */}
          <div className="flex items-center gap-4">
            <BackButton />
            <h3 className="text-xl">Add New Product</h3>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <button className="text-red-500 hover:text-red-700">
                Discard
              </button>
            </div>
            <div>
              <div className="text-red-500 hover:text-red-700">
                <AddButton onClick={handleAddProduct} />
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Containers */}
        <div className="flex w-full justify-between gap-4 items-stretch">
          {/* Images & preview */}
          <div className="flex flex-col justify-between gap-4 p-5 w-1/2 rounded-2xl bg-[#070824] shadow-md shadow-[#5765ac]">
            {/* Images */}
            <div className="flex justify-between gap-4 w-full h-1/2 bg-[#111826] rounded-2xl p-4">
              {/* Left: Large main image */}
              <div
                className="border border-white w-1/2 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(0)}
              >
                {formData.images[0] ? (
                  <img
                    src={URL.createObjectURL(formData.images[0])}
                    alt="Main Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-500">Click to add</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRefs[0]}
                  onChange={(e) => handleImageChange(e, 0)}
                  className="hidden"
                />
              </div>

              {/* Right: 2x2 grid of thumbnails */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 w-1/2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="border rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={() => handleImageClick(i)}
                  >
                    {formData.images[i] ? (
                      <img
                        src={URL.createObjectURL(formData.images[i])}
                        alt={`preview-${i}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        Click to add
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRefs[i]}
                      onChange={(e) => handleImageChange(e, i)}
                      className="hidden"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Preview & Visibility */}
            <div className="flex justify-between gap-4 w-full h-1/2 bg-[#111826] rounded-2xl p-4">
              <div className="flex flex-col justify-between w-1/2 h-full gap-4 ">
                <div className="border h-1/2 rounded-2xl bg-[#070824]">
                  visibility
                </div>
                <div className="border h-1/2 rounded-2xl  p-2 flex flex-col gap-2 items-center justify-between bg-[#070824]">
                  <div>
                    <h2 className="text-xl font-medium">Preview</h2>
                    <p className="text-sm font-extralight">
                      You want to see how your product look like?
                    </p>
                  </div>
                  <button className="text-sm font-medium border rounded-xl w-1/2">
                    Preview
                  </button>
                </div>
              </div>
              <div className="border w-1/2 h-full rounded-2xl bg-[#070824]">
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
                      <KeyInfoSwitch
                        value={formData.keyInfo}
                        onChange={(val) =>
                          setFormData((prev) => ({
                            ...prev,
                            keyInfo: val,
                          }))
                        }
                      />
                    </div>
                  </div>
                  {/* Name */}
                  <div className="flex flex-col gap-2 w-full py-3">
                    <label>Product Name</label>
                    <div className="flex justify-between w-full">
                      <input
                        type="text"
                        placeholder="Enter product name"
                        className="w-full bg-[#1b2437] p-1"
                        value={formData.name}
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
                        placeholder="Enter product brand"
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
                    <div className="w-1/2">
                      <label>Catagory</label>
                      <SelectCategoryScrollable
                        categories={categories}
                        setCategoryId={setCategoryId}
                      />
                    </div>
                    <div className="w-1/2">
                      <label>Sub Catagory</label>
                      <SelectSubCategoryScrollable
                        subCategories={subCategories}
                        setSubCategoryId={setSubCategoryId}
                      />
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
                        placeholder=""
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
                              length: Number(e.target.value),
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
                              width: Number(e.target.value),
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
                              height: Number(e.target.value),
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                  {/* Warranty & peried*/}
                  <div className="flex justify-between items-center py-2 w-full gap-10">
                    <div>
                      <label>Warranty (In Month)</label>
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
                      <input type="Text" className="w-full bg-[#1b2437] p-1 " />
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
                        maxLength={200}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
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
    </div>
  );
};

export default AddProduct;
