import axiosInstance from "../utils/axiosInstence";

export const fetchProducts = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "",
  minPrice = "",
  maxPrice = "",
} = {}) => {
  console.log("datas", page, limit, search, category, minPrice, maxPrice);
  const response = await axiosInstance.get("/products", {
    params: { page, limit, search, category, minPrice, maxPrice },
  });
  console.log("products fetched", response.data)
  return response.data;
};

export const getSpecificProduct = async (productId) => {
  const response = await axiosInstance.get(`/products/${productId}`);
  return response.data.product;
};

export const deleteProduct = async (productId) => {
  const response = await axiosInstance.put(`/products/delete/${productId}`);
  return response.data;
};

export const addProduct = async (data) => {
  console.log("data in service:");
  for (let pair of data.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }
  const response = await axiosInstance.post("/products/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};

export const createCategory = async (data) => {
  const response = await axiosInstance.post("/category", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};

export const fetchCategory = async () => {
  const response = await axiosInstance.get('/category')
  // console.log("catagories",response.data.categories)
  return response.data.categories
}


export const createSubCategory = async (data) => {
  const response = await axiosInstance.post("/sub-category", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};

export const fetchSubCategory = async (catagoryId) => {
  // console.log(catagoryId)
  const response = await axiosInstance.get(`/sub-category/${catagoryId}`)
  // console.log("catagories",response.data)
  return response.data.subCategories
}