import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_URL}/sales`;

export const getSales = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}`, { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getSaleById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

