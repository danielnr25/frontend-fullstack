import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_URL}/reports`;

export const getSalesReport = async(fechaInicio, fechaFin) => {
    try {
        const params = {fechaInicio,fechaFin};
        const response = await axios.get(`${BASE_URL}/sales-report?`,{params});
        return response.data.sales;
    } catch (error) {
        throw error.response?.data || error;
    }
}



export const getSalesProductReport = async (fechaInicio ,fechaFin) =>{
    try {
        const params = { fechaInicio, fechaFin};
        const response = await axios.get(`${BASE_URL}/sales-product-report?`,{params});
        return response.data.salesProducts;
    } catch (error) {
        throw error.response?.data || error;
    }
}