import React, { useState } from "react";
import BackButton from "./ui/backButton";
import { Percent } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createOffer } from "../serveces/offerService";

const Offers = () => {
  const discountTypes = [
    { value: "percent", label: "Percent Off" },
    { value: "fixed", label: "Fixed Amount Off" },
    { value: "bogo", label: "Buy One Get One" },
    { value: "free_shipping", label: "Free Shipping" },
    { value: "bundle", label: "Bundle Discount" },
    { value: "first_time", label: "First-Time User Discount" },
    { value: "seasonal", label: "Seasonal Discount" },
    { value: "loyalty", label: "Loyalty Discount" },
    { value: "quantity", label: "Quantity-Based Discount" },
    { value: "cashback", label: "Cashback Offer" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    bodyText: "",
    discountType: "",
    minOrderAmount: "",
    discountWorth: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    thumbnail: null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!confirm) {
      toast.error("Please confirm the form before submitting.");
      return;
    }
    const data = new FormData();
    data.append("title", formData.title);
    data.append("bodyText", formData.bodyText);
    data.append("discountType", formData.discountType);
    data.append("amount", formData.minOrderAmount);
    data.append("discountWorth", formData.discountWorth);
    data.append("startDate", formData.startDate);
    data.append("startTime", formData.startTime);
    data.append("endDate", formData.endDate);
    data.append("endTime", formData.endTime);
    data.append("image", formData.thumbnail);

    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: createOffer,
    onSuccess: (response) => {
      toast.success(response.message || "Offer created successfully!");
      
      setFormData({
        title: "",
        bodyText: "",
        discountType: "",
        minOrderAmount: "",
        discountWorth: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        thumbnail: null,
      });

      setThumbnailPreview(null);
      setConfirm(false);

      document.getElementById("thumbnail").value = "";
    },
    onError: (error) => {
      console.error("Error creating offer:", error);
      toast.error("offer not created succesfully");
    },
  });

  return (
    <div className="w-full p-2 flex flex-col items-center">
      {/* Top header */}
      <div className="flex w-10/12 p-2 rounded-2xl justify-between bg-[#070824] shadow-md shadow-[#5765ac] text-white mt-10">
        <div className="flex items-center gap-4">
          <BackButton />
          <h3 className="text-xl">Create A New Offer</h3>
        </div>
      </div>

      {/* Form */}
      <div className="w-full flex flex-col items-center justify-center mt-10 p-2">
        <form className="w-10/12 grid grid-cols-2 gap-6 text-white">
          {/* Offer Title */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Offer Title</label>
            <input
              type="text"
              className="p-2 rounded-md bg-slate-800 text-white"
              placeholder="Enter offer title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {/* Body Text */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">
              Body Text (20 to 30 Characters)
            </label>
            <textarea
              maxLength={30}
              className="p-2 rounded-md bg-slate-800 text-white"
              placeholder="Write your offer description"
              value={formData.bodyText}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bodyText: e.target.value }))
              }
            />
          </div>

          {/* Discount Type */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Discount Type</label>
            <select
              id="discountType"
              className="border rounded-md px-3 py-2 w-full bg-slate-800 text-white"
              value={formData.discountType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  discountType: e.target.value,
                }))
              }
            >
              <option value="" disabled>
                Select a discount type
              </option>
              {discountTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Order Amount */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Minimum Order Amount</label>
            <input
              type="number"
              className="p-2 rounded-md bg-slate-800 text-white"
              placeholder="Enter amount"
              value={formData.minOrderAmount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  minOrderAmount: e.target.value,
                }))
              }
            />
          </div>

          {/* Discount Worth */}
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-gray-400">Discount Worth</label>
            <div className="relative w-full max-w-md">
              <input
                type="number"
                className="w-full p-2 rounded-md bg-slate-800 text-white pr-10"
                placeholder="Enter discount value"
                value={formData.discountWorth}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discountWorth: e.target.value,
                  }))
                }
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
                <Percent size={20} />
              </span>
            </div>
          </div>

          {/* Validity Period - Start */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Starting On</label>
            <div className="flex gap-2">
              <input
                type="date"
                className="w-full p-2 rounded-md bg-slate-800 text-white"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
              <input
                type="time"
                className="w-full p-2 rounded-md bg-slate-800 text-white"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* Validity Period - End */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Ending On</label>
            <div className="flex gap-2">
              <input
                type="date"
                className="w-full p-2 rounded-md bg-slate-800 text-white"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endDate: e.target.value }))
                }
              />
              <input
                type="time"
                className="w-full p-2 rounded-md bg-slate-800 text-white"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endTime: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Upload Thumbnail */}
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-gray-400">Upload Thumbnail</label>
            <label
              htmlFor="thumbnail"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md p-6 cursor-pointer hover:border-blue-500 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v4m0 0H8m4 0h4M16 8a4 4 0 10-8 0 4 4 0 008 0z"
                />
              </svg>
              <p className="text-gray-400">Click to upload thumbnail</p>
              <input
                type="file"
                id="thumbnail"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData((prev) => ({ ...prev, thumbnail: file }));
                    setThumbnailPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
            {thumbnailPreview && (
              <div className="mt-4">
                <p className="text-gray-400 mb-1">Preview:</p>
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-32 h-32 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Confirm Checkbox */}
          <div className="col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="myCheckbox"
              checked={confirm}
              onChange={(e) => setConfirm(e.target.checked)}
              className="w-5 h-5 accent-gray-600"
            />
            <label
              htmlFor="myCheckbox"
              className="text-gray-200 font-extralight text-sm"
            >
              I understand the discount given in this offer will be borne by me.
            </label>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-center gap-4 mt-4">
            <button className="bg-red-600 px-4 py-2 rounded-md text-sm font-medium">
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-gray-600 px-4 py-2 rounded-md text-sm font-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Offers;
