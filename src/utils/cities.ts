import axios from "axios";
import { CityInDB } from "./interface";
export const getCityById = async (id: string) => {
  const city = await axios.get(`/cities/${id}`);
  return city.data;
};

export const getCities = async () => {
  const city = await axios.get(`/cities`);
  return city.data;
};

export const createCity = async (inputCity: object) => {
  const city = await axios.post('/api/cities', inputCity);
  return city.data
}
