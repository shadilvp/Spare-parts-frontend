import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../serveces/orderService";
import LoaderIcon from "./ui/loader";

const Orders = () => {
  const {
    data: orderData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  console.log("orderData", orderData);

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
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <h2 className="text-white text-xl font-extralight">
          An error occurred
        </h2>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-6xl mx-auto ">
      <h1 className="text-2xl font-bold mb-6 text-[#fff]">Orders Management</h1>

      {orderData.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orderData.map((order) => (
          <div
            key={order._id}
            className="mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                Order ID: <span className="text-gray-600">{order._id}</span>
              </h2>
              <p>
                <strong>Customer:</strong> {order.userId?.name} ({order.userId?.email})
              </p>
              <p>
                <strong>Shipping Address:</strong> {order.shippingAddress}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  } font-semibold`}
                >
                  {order.status}
                </span>
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Products:</h3>
              <div className="grid gap-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg"
                  >
                    <img
                      src={item.productId?.images?.[0]}
                      alt={item.productId?.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.productId?.name}</h4>
                      <p className="text-sm text-gray-600">
                        Price: ₹{item.productId?.price}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-800 font-medium">
                        Total: ₹{item.productId?.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-right">
                <span className="font-bold text-lg text-black">
                  Grand Total: ₹{order.totalAmount}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default Orders;
