import axiosInstance from "../utils/axiosInstence"


export const fetchLogineduser = async () => {
    // console.log("hello")
    const response = await axiosInstance.get("/loginedUser");
    // console.log("response", response.data)
    return response.data;
  }


export const getAllUsers = async () => {
  // console.log("hyyy")
  const response = await axiosInstance.get("/users")
  // console.log(response.data.users)
  return response.data.users
}

export const getSpecificUser = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}`)
  // console.log("response",response.data.user)
  return response.data.user
}


export const deleteUser = async (userId) => {
  const response = await axiosInstance.put(`/delete-user/${userId}`)
  return response.data
}

export const blockUser = async (userId) => {
  console.log(userId)
  const response = await axiosInstance.put(`users/block/${userId}`)
  return response.data
}