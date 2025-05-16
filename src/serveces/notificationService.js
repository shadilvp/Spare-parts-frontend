import axiosInstance from "../utils/axiosInstence";

export const sendNotification = async (notificationData) => {
    console.log(notificationData)
    const response = await axiosInstance.post("/send-notification", notificationData)
    return response.data
}