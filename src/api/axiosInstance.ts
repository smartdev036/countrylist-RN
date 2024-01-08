import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1'; 

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

export default axiosInstance;