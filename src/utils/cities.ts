import axios from 'axios';
import { CityInDB } from './interface';
export const getCityById = async (id: string) => {
  const city = await axios.get(`http://localhost:3000/api/cities/${id}`);
  return city.data;
};

export const getCities = async () => {
  const city = await axios.get(`http://localhost:3000/api/cities`);
  return city.data;
}