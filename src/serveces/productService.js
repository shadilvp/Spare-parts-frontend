import axiosInstance from "../utils/axiosInstence";

export const fetchProducts = async ({

    page = 1,
    limit = 10,
    search = "",
    category = "",
    subCategory = "",
    minPrice = "",
    maxPrice = "",
    address= "",

  } = {}) => {
    console.log("datas",page, limit, search, category, subCategory, minPrice, maxPrice, condition,longitude,latitude,address)
    const response = await axiosInstance.get("/products",{
      params: {page, limit, search, category, subCategory, minPrice, maxPrice, condition,longitude,latitude,address},
    });
    return response.data
  }