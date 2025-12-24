import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/categories`;

// crear una nueva categoria
export const createCategory = async(categoryData) =>{
   try {
      const response = await axios.post(BASE_URL,categoryData);
      return response.data
   } catch (error) {
      throw new Error("Error al crear la categoria: ", error.response.data)
   }
}