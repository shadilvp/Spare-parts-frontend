import axiosInstance from "../utils/axiosInstence"


export const fetchLogineduser = async () => {
    // console.log("hello")
    const response = await axiosInstance.get("/loginedUser");
    // console.log("response", response.data)
    return response.data;
  }


export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users")
  console.log(response.data)
  return response.data.data
}