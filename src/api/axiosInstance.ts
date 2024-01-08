import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
    // Additional configuration if needed
});

export default axiosInstance;