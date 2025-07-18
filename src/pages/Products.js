import React, { useState } from "react";
import { DropdownMenu } from "./ui/dropDownMenu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, fetchProducts } from "../serveces/productService";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from "lucide-react";

const Products = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    condition: "",
    category: "",
    subCategory: "",
    page: 1,
    minPrice: "",
    maxPrice: "",
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });
  console.log("admin Shop - Products:", data);

  const handleDeleteProduct = (productId) => {
    mutation.mutate(productId);
  };

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      console.log(data.message);
      refetch();
    },
    onError: (error) => {
      console.error("Product is not deleted", error);
    },
  });

  return (
    <div className={`p-4 min-h-screen  text-gray-400`}>
      <div className="flex justify-between items-center mb-4  ">
        <h2 className="text-xl font-bold">Product List</h2>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/add-product")}
            className=" -pink-800 rounded-md p-1 px-2 shadow-md shadow-blue-600"
          >
            Add Product
          </button>
          <button
            onClick={() => navigate("/addCategory")}
            className=" -pink-800 rounded-md p-1 px-2 shadow-md shadow-blue-600"
          >
            Add Category
          </button>
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <div className="p-4 w-64 bg-white rounded shadow-md">
            <input
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />

            {/* Clear Filters Button */}
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  condition: "",
                  category: "",
                  subCategory: "",
                  minPrice: "",
                  maxPrice: "",
                  page: 1,
                })
              }
            >
              Clear Filters
            </button>
          </div>
        </DropdownMenu>
      </div>

      {/* Product Table */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen ">
          <div className="w-20 h-20">
            <LoaderIcon />
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl -2  ">
          <table className="w-full -collapse text-gray-400   mt-4 rounded-xl">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-left rounded-lg">
                <th className=" p-2 w-12">No</th>
                <th className=" p-2 w-16">Image</th>
                <th className=" p-2">Name</th>
                <th className=" p-2">Price</th>
                <th className=" p-2">Mrp</th>
                <th className=" p-2">Quantity</th>
                <th className=" p-2">Category</th>
                <th className=" p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product, index) => (
                <tr key={product.id} className="text-left  rounded-xl">
                  <td className=" p-2 rounded-xl">{index + 1}</td>
                  <td className=" p-2 rounded-xl">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 object-fit rounded-md"
                    />
                  </td>
                  <td className=" p-2">{product.name}</td>
                  <td className=" p-2">${product.price}</td>
                  <td className=" p-2">${product.mrp}</td>
                  <td className=" p-2">{product.quantity}</td>
                  <td className=" p-2">{product.category.name}</td>
                  <td className=" p-2 flex justify-around space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/Products/${product._id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Products;
