import axiosInstance from "../utils/axiosInstence";

export const fetchProducts = async ({

    page = 1,
    limit = 10,
    search = "",
    category = "",
    minPrice = "",
    maxPrice = "",

  } = {}) => {
    console.log("datas",page, limit, search, category, minPrice, maxPrice)
    const response = await axiosInstance.get("/products",{
      params: {page, limit, search, category, minPrice, maxPrice},
    });
    return response.data
  }

export const getSpecificProduct =  async(productId) => {
  const response = await axiosInstance.get(`/products/${productId}`)
  return response.data.product
}

export const deleteProduct = async (productId) => {
  const response = await axiosInstance.put(`/products/delete/${productId}`)
  return response.data
}

  export const addProduct = async (data) => {
      const response = await axiosInstance.post("/add-product", data, {
        headers : {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data;
    };