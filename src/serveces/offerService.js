import axiosInstance from "../utils/axiosInstence";

export const createOffer = async (data) => {
    const response = await axiosInstance.post("/offer/create", data,  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    return response.data
}