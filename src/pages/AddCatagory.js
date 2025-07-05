import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, createSubCategory, fetchCategory } from "../serveces/productService";
import { useState } from "react";
import toast from "react-hot-toast";
import { SelectCategoryScrollable } from "./ui/selectCategory";

const AddCategory = () => {
  const [categoryname, setCategoryname] = useState("");
  const [image, setImage] = useState(null);

  const [subCategoryname, setSubCategoryname] = useState("");
  const [subCategoryimage, setSubCategoryimage] = useState(null);
  const [categoryId, setCategoryId] = useState('')

  const [active, setActive] = useState(1);

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      setCategoryname("");
      setImage(null);
      toast.success("Category added Succesfully!");
    },
    onError: (error) => {
      console.error("Error:", error);
      console.error("❌ Backend says:", error?.response?.data);
      toast.error("Category not added ");
    },
  });

    const subCategorymutation = useMutation({
    mutationFn: createSubCategory,
    onSuccess: () => {
      setSubCategoryname("");
      setSubCategoryimage(null);
      setCategoryId('')
      toast.success("SubCategory added Succesfully!");
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("SubCategory not added ");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryname || !image) return;

    const formData = new FormData();
    formData.append("categoryname", categoryname);
    formData.append("image", image);
    console.log("image field name:", image.name);
    mutation.mutate(formData);
  };

  const {
    data: categories,
    isLoading: categoryloading,
    error: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

//   console.log("catagories", categories);

  const handleSubmitSubCategory = (e) => {
    e.preventDefault();
    if (!subCategoryname || !subCategoryname || !categoryId) return;

    const formData = new FormData();
    formData.append("name", subCategoryname);
    formData.append("image", subCategoryimage);
    formData.append("categoryId", categoryId);

    subCategorymutation.mutate(formData);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center  gap-10 h-screen">
      <div className="flex gap-4">
        <button
          onClick={() => setActive(1)}
          className={` ${active === 1 ? " text-white" : " text-gray-400"}`}
        >
          Category
        </button>
        <span className="text-white">|</span>
        <button
          onClick={() => setActive(2)}
          className={` ${active === 2 ? " text-white" : " text-gray-400"}`}
        >
          SubCategory
        </button>
      </div>

      {/* Conditional Content */}
      <div className="flex justify-center  items-center w-full">
        {active === 1 ? (
          <div className="w-10/12 flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-5/12 flex flex-col gap-6 text-gray-300 border p-10 rounded-2xl border-[#464891] bg-[#ffffff0e] transform transition-transform duration-300 hover:scale-105"
            >
              <div>
                <label className="block font-medium mb-1">Category Name</label>
                <input
                  type="text"
                  value={categoryname}
                  onChange={(e) => setCategoryname(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-gray-600 bg-[#ffffff1a]"
                  placeholder="e.g. Engine Parts"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full bg--[#2a2c6b]"
                />
              </div>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="bg-[#2a2c6b] text-white px-4 py-2 rounded hover:bg-[#353544] text-sm"
              >
                {mutation.isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-10/12 flex justify-center items-center">
            <form
              onSubmit={handleSubmitSubCategory}
              className="w-5/12 flex flex-col gap-6 text-gray-300 border p-10 rounded-2xl border-[#464891] bg-[#ffffff0e] transform transition-transform duration-300 hover:scale-105 "
            >
              <div>
                <label className="block font-medium mb-1">
                  Select SubCategory
                </label>
            <SelectCategoryScrollable categories={categories} setCategoryId={setCategoryId}/>
                <label className="block font-medium mb-1">
                  SubCategory Name
                </label>
                <input
                  type="text"
                  value={subCategoryname}
                  onChange={(e) => setSubCategoryname(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-gray-600 bg-[#ffffff1a]"
                  placeholder="e.g. Engine Parts"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSubCategoryimage(e.target.files[0])}
                  className="w-full bg--[#2a2c6b]"
                />
              </div>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="bg-[#2a2c6b] text-white px-4 py-2 rounded hover:bg-[#353544] text-sm"
              >
                {mutation.isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategory;

{
  /* Sub catagory Form */
}
