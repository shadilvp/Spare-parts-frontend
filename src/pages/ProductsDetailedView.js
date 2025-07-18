import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteProduct,
  getSpecificProduct,
  fetchCategory,
  fetchSubCategory,
  editProduct,
} from "../serveces/productService";
import LoaderIcon from "./ui/loader";
import BackButton from "./ui/backButton";
import DeleteButton from "./ui/deleteButton";
import AddButton from "./ui/addProduct";
import { useEffect, useState } from "react";
import EditProduct from "./editProduct";
import toast from "react-hot-toast";

const ProductDetailedview = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
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

  const [isEdit, setIsEdit] = useState(false);
  const [showDivB, setShowDivB] = useState(false);
  const [colors, setColors] = useState([]);
  const [compatabilityValue, setCompatabilityValue] = useState("");
  const [compatability, setCompatability] = useState([]);
  const [featureValue, setFeatureValue] = useState("");
  const [features, setFeatures] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  // Fetch product data
  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getspecificProduct", productId],
    queryFn: () => getSpecificProduct(productId),
  });

  // Fetch categories
  const {
    data: categories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

  // Fetch subcategories
  const {
    data: subCategories,
    isLoading: subCategoryLoading,
    error: subCategoryError,
  } = useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: () => fetchSubCategory(categoryId),
    enabled: !!categoryId,
  });

  // Mutation for editing product
  const mutation = useMutation({
    mutationFn: ({ data, productId }) => editProduct(data, productId),
    onSuccess: () => {
      toast.success("Product updated successfully!");
      navigate("/Products");
    },
    onError: (error) => {
      console.error("Product not updated:", error);
      toast.error("Failed to update product");
    },
  });

  const handleDeleteProduct = () => {
    mutation.mutate({ mutationFn: deleteProduct, productId });
  };

  const handleEditProduct = () => {
    setIsEdit((prev) => !prev);
  };

  const handleSubmitEdit = () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", categoryId || formData.category);
    data.append("subCategory", subCategoryId || formData.subCategory);
    data.append("brand", formData.brand);
    data.append("quantity", formData.quantity.toString());
    data.append("mrp", formData.mrp.toString());
    data.append("price", formData.price.toString());
    data.append("warranty", formData.warranty.toString());
    data.append("material", formData.material);
    data.append("keyInfo", formData.keyInfo);
    data.append("status", formData.status);

    data.append("length", formData.dimensions.length.toString());
    data.append("width", formData.dimensions.width.toString());
    data.append("height", formData.dimensions.height.toString());

    formData.images.forEach((img) => {
      if (img && typeof img !== "string") {
        // Only append new File objects, not existing URLs
        data.append("images", img);
      }
    });

    data.append("color", JSON.stringify(colors));
    data.append("features", JSON.stringify(features));
    data.append("vehicleCompatibility", JSON.stringify(compatability));

    mutation.mutate({ data, productId });
  };

  useEffect(() => {
    if (productData && isEdit) {
      setFormData({
        name: productData.name || "",
        description: productData.description || "",
        category: productData.category?._id || "",
        subCategory: productData.subCategory || "",
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
        material: productData.material || "",
        warranty: productData.warranty || 0,
        color: productData.color || [],
        features: productData.features || [],
        keyInfo: productData.keyInfo || "general",
        status: productData.status || "available",
      });
      setColors(productData.color || []);
      setCompatability(productData.vehicleCompatibility || []);
      setFeatures(productData.features || []);
      setCategoryId(productData.category?._id || "");
      setSubCategoryId(productData.subCategory || "");
    }
  }, [productData, isEdit]);

  if (isLoading || categoryLoading || subCategoryLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="w-20 h-20">
          <LoaderIcon />
        </div>
      </div>
    );
  }
  if (error || categoryError || subCategoryError) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <h2 className="text-white text-xl font-extralight">
          An error occurred
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen text-gray-400 p-7 gap-4">
      <div className="flex w-full p-2 rounded-2xl justify-between bg-[#070824] shadow-md shadow-[#5765ac]">
        {/* Header Container */}
        <div className="flex items-center gap-4">
          <BackButton />
          <h3 className="text-xl">Product Detailed View</h3>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            className="border px-3 py-1 rounded-lg bg-[#6c6b6b] text-white hover:bg-[#413f3f]"
            onClick={handleEditProduct}
          >
            {isEdit ? "Discard" : "Edit"}
          </button>
          {isEdit && (
            <button
              className="text-white bg-[#3f4d7b] px-4 py-1 rounded-lg hover:bg-[#262e4a]"
              onClick={handleSubmitEdit}
            >
              Save
            </button>
          )}
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
              <div className="flex flex-col justify-between w-1/2 h-full gap-4">
                <div className="border h-1/2 rounded-2xl">visibility</div>
                <div className="border h-1/2 rounded-2xl">preview</div>
              </div>
              <div className="border w-1/2 h-full rounded-2xl">
                related items
              </div>
            </div>
          </div>
          {/* Details */}
          <div className="p-3 w-1/2 rounded-2xl h-full bg-[#070824] shadow-md shadow-[#5765ac] font-extralight">
            <h3 className="text-xl text-gray-200 py-3">Product Details</h3>

            {!showDivB ? (
              <div className="flex flex-col items-center">
                {/* Div A */}
                <div className="p-4 rounded mb-4">
                  {/* Key Info */}
                  <div className="flex flex-col gap-2 w-full">
                    <label>Key info to describe and display your product</label>
                    <div className="flex">
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.keyInfo}
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
                  {/* Vehicle Type & Category */}
                  <div className="flex justify-between items-center py-2 w-full">
                    <div>
                      <label>Category</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.category?.name}
                      </h3>
                    </div>
                    <div>
                      <label>Sub Category</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.subCategory?.name}
                      </h3>
                    </div>
                  </div>
                  {/* Price & Quantity */}
                  <div className="flex justify-between items-center py-2 w-full gap-7">
                    <div>
                      <label>MRP</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.mrp}
                      </h3>
                    </div>
                    <div>
                      <label>Our Price</label>
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
                  {/* Dimensions */}
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
                  {/* Warranty */}
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
                <div className="p-4 rounded mb-4 w-full">
                  {/* Material & Colour */}
                  <div className="flex justify-between items-center py-2 w-full gap-7">
                    <div className="flex flex-col gap-2 w-full">
                      <label>Available Colors</label>
                      <div className="flex gap-3 flex-wrap mt-2">
                        {productData?.color?.map((color) => (
                          <div
                            key={color}
                            className="w-8 h-8 rounded-full cursor-pointer border-2 border-white"
                            style={{ backgroundColor: color }}
                            title="Color"
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label>Material</label>
                      <h3 className="bg-[#1b2538] px-3 py-1 font-semibold">
                        {productData?.material?.trim()
                          ? productData.material
                          : "This field is empty"}
                      </h3>
                    </div>
                  </div>
                  {/* Vehicle Compatibility */}
                  <div>
                    <label>Vehicle Compatibility</label>
                    <div className="my-3 h-16 overflow-y-auto scrollbar-hide border p-2 rounded-lg">
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
                  <div>
                    <label>Features</label>
                    <div className="my-3 h-16 overflow-y-auto scrollbar-hide border p-2 rounded-lg">
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
        <EditProduct
          formData={formData}
          setFormData={setFormData}
          colors={colors}
          setColors={setColors}
          compatabilityValue={compatabilityValue}
          setCompatabilityValue={setCompatabilityValue}
          compatability={compatability}
          setCompatability={setCompatability}
          featureValue={featureValue}
          setFeatureValue={setFeatureValue}
          features={features}
          setFeatures={setFeatures}
          showDivB={showDivB}
          setShowDivB={setShowDivB}
          categories={categories}
          subCategories={subCategories}
          setCategoryId={setCategoryId}
          setSubCategoryId={setSubCategoryId}
        />
      )}
    </div>
  );
};

export default ProductDetailedview;
