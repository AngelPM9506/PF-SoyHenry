import axios from 'axios';
import { getCityById } from './cities';
import { Activity, CityInDB } from './interface';
export const getActivities = async () => {
  const response = await axios.get('http://localhost:3000/api/activities');
  const activities = await Promise.all(
    response.data.map(async (a: Activity) => {
      return (a = { ...a, city: await getCityById(a.cityId) });
    })
  );

  return activities;
};
