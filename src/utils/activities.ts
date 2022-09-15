import axios from 'axios';
import { getCityById } from './cities';
import { Activity, CityInDB } from './interface';
export const getActivities = async (
  wCity?: string,
  wName?: string,
  maxPrice?: number,
  sort?: string,
  sortBy?: string
) => {
  const activities = await axios.get(
    `http://localhost:3000/api/activities?sort=${sort || 'desc'}&sortBy=${
      sortBy || 'name'
    }&wCity=${wCity || '&'}&wName=${wName || '&'}&maxPrice=${maxPrice || '&'}`
  );
  return activities.data;
};
