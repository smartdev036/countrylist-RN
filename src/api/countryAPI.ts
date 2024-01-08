import { ApiCountry, Country } from '../types/country';
import axiosInstance from './axiosInstance';

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axiosInstance.get<ApiCountry[]>('/all');
  const data = response.data;

  return data.map((apiCountry: ApiCountry) => ({
    name: apiCountry.name.common,
    code: apiCountry.cca2,
  }));
};

export const fetchCountryDetails = async (countryCode: string) => {
  try {
    const response = await axiosInstance.get(`/alpha/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching country details:', error);
    throw error;
  }
};