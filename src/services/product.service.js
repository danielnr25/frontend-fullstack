import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/products`;

// crear una nuevo producto
export const createProduct = async(productData) =>{
   try {
      const response = await axios.post(BASE_URL,productData);
      return response.data
   } catch (error) {
      throw error.response?.data || error;
   }
}

export const getProductById = async(id) =>{
   try {
      const response = await axios.get(BASE_URL + `/${id}`);
      return response.data;
   } catch (error) {
      throw error.response?.data || error;
   }
}

export const updateProduct = async(id, productData) => {
   try {
      const response = await axios.put(BASE_URL + `/${id}`,productData)
      return response.data;
   } catch (error) {
      throw error.response?.data || error;
   }
}

export const deleteByProduct = async(id)=>{
   try {
      const response = await axios.delete(BASE_URL + `/${id}`);
      return response.data;
   } catch (error) {
      throw error.response?.data || error;
   }
}

export const searchProduct = async (searchTerm) =>{
   try {
      const response = await axios.get(BASE_URL+`/search?name=${searchTerm}`)
      return response;
   } catch (error) {
      throw error.response?.data || error;
   }
}

export const allProduct = async (pageNumber,limit) => {
   try {
      const response = await axios.get(BASE_URL+`?page=${pageNumber}&limit=${limit}`)
      return response.data;
   } catch (error) {
      throw error.response?.data || error;
      
   }
}