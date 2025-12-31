import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/categories`;

// crear una nueva categoria
export const createCategory = async(categoryData) =>{
   try {
      const response = await axios.post(BASE_URL,categoryData);
      return response.data
   } catch (error) {
      throw error.response?.data || error;
   }
}

export const getCategoryById = async(id) =>{
   try {
      const response = await axios.get(BASE_URL + `/${id}`);
      return response.data;
   } catch (error) {
      throw error.response?.data || error;
   }
}

export const updateCategory = async(id, categoryData) => {
   try {
      const response = await axios.put(BASE_URL + `/${id}`,categoryData)
      return response.data;
   } catch (error) {
      throw error.response?.data || error;
   }
}

export const deleteByCategory = async(id)=>{
   try {
      const response = await axios.delete(BASE_URL + `/${id}`);
      return response.data;
   } catch (error) {
      throw error.response?.data || error;
   }
}

export const searchCategory = async (searchTerm) =>{
   try {
      const response = await axios.get(BASE_URL+`/search?name=${searchTerm}`)
      return response;
   } catch (error) {
      throw error.response?.data || error;
   }
}

export const allCategory = async (pageNumber,limit) => {
   try {
      const response = await axios.get(BASE_URL+`?page=${pageNumber}&limit=${limit}`)
      return response.data;
   } catch (error) {
      throw error.response?.data || error;
   }
}