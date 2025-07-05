import React from "react";

export function SelectCategoryScrollable({ categories = [], setCategoryId }) {
  if (!Array.isArray(categories)) return <div>Loading...</div>;

  return (
    <div className="w-full my-3">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
        Select a category
      </label>
      <select
        id="category"
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-[280px] px-3 py-2 border border-gray-300 rounded bg-[#27262d51] text-white text-sm"
        defaultValue=""
      >
        <option value="" disabled className="text-xs">
          -- Select a category --
        </option>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryname}
            </option>
          ))
        ) : (
          <option disabled>No categories found</option>
        )}
      </select>
    </div>
  );
}
