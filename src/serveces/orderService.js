import axiosInstance from "../utils/axiosInstence"

export const getAllOrders = async () => {
    const response = await axiosInstance.get('/order/all')
    // console.log("all orders", response.data)
    return response.data
}