import axiosInstance from "../utils/axiosInstence";

export const getAllAdmins = async () => {
//   console.log("hyyy")
  const response = await axiosInstance.get("/admins")
  console.log(response.data.admins)
  return response.data.admins
}

export const deleteAdmin = async (adminId) => {
    const response = await axiosInstance.put("/delete-admin", adminId)
    return response.data
}

export const adminDashboard = async () => {
  const response = await axiosInstance.get('/dashboard');
  return response.data;
}