import React, { useState } from "react";
import { DropdownMenu } from "./ui/dropDownMenu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, fetchProducts } from "../serveces/productService";
import { useNavigate } from "react-router-dom";

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

  const { data, isLoading, error , refetch } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });
  console.log("admin Shop - Products:", data);

  const handleDeleteProduct = (productId) => {
      mutation.mutate(productId)
  }

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
    <div className={`p-4 bg-white min-h-screen w-5/6 md:ml-56`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Product List</h2>
        <button onClick={() => navigate("/add-product")} className=" border-pink-800 rounded-md p-1 px-2 shadow-md shadow-blue-600">Add Product</button>
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
        <p>Loading products...</p>
      ) : (
        <table className="w-full border-collapse text-black border border-gray-300 mt-4">
          <thead>
            <tr className="bg-green-500 text-white text-left">
              <th className="border p-2 w-12">No</th>
              <th className="border p-2 w-16">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map((product, index) => (
              <tr key={product.id} className="text-left border">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="border p-2">{product.category.name}</td>
                <td className=" p-2 flex justify-around space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={()=>navigate(`/Products/${product._id}`)}
                  >
                    View
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={()=> handleDeleteProduct(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Products;
