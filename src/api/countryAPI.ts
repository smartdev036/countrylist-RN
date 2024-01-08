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
