import React from "react";

export function SelectSubCategoryScrollable({ subCategories = [], setSubCategoryId }) {
  // if (!Array.isArray(categories)) return <div>Loading...</div>;

  return (
    <div className="w-full my-3">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
        Select a category
      </label>
      <select
        id="category"
        onChange={(e) => setSubCategoryId(e.target.value)}
        className=" px-3 py-2 border border-gray-300 rounded bg-[#27262d51] text-white text-sm"
        defaultValue=""
      >
        <option value="" disabled className="text-xs">
          -- Select a SubCategory --
        </option>
        {subCategories.length > 0 ? (
          subCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.subCategoryname}
            </option>
          ))
        ) : (
          <option disabled>No categories found</option>
        )}
      </select>
    </div>
  );
}
