import axiosInstance from "../utils/axiosInstence"

export const login = async (loginData) => {
  console.log(loginData)
  const response = await axiosInstance.post("/login-admin", loginData);
  return response.data;
}
