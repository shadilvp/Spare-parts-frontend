// @spareParts-frontend/services/paymentService.js
import axiosInstance from "../utils/axiosInstence";

export const createPayment = async (paymentData) => {
  const response = await axiosInstance.post("/payments", paymentData);
  return response.data;
};

export const getPayments = async () => {
  const response = await axiosInstance.get("/payments");
  return response.data;
};

export const updatePayment = async (id, paymentData) => {
  const response = await axiosInstance.put(`/payments/${id}`, paymentData);
  return response.data;
};

export const deletePayment = async (id) => {
  const response = await axiosInstance.delete(`/payments/${id}`);
  return response.data;
};
