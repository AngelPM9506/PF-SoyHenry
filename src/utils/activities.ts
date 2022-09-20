import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { getCityById } from "./cities";
import { Activity, CityInDB } from "./interface";
export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
export const getActivities = async (
  wCity?: string,
  wName?: string,
  maxPrice?: number,
  sort?: string,
  sortBy?: string
) => {
  let urlGet = `/activities?`;
  sort ? (urlGet += `&sort=${sort}`) : "";
  wCity ? (urlGet += `&wCity=${wCity}`) : "";
  wName ? (urlGet += `&wName=${wName}`) : "";
  maxPrice ? (urlGet += `&maxPrice=${maxPrice}`) : "";
  sortBy ? (urlGet += `&sortBy=${sortBy}`) : "";
  const activities = await axios.get(urlGet);
  return activities.data;
};

export const getActivitiesId = async (
  id: QueryFunctionContext<string[], any>
) => {
  const activity = await axios.get(`/activities/${id}`);
  return activity.data;
};

export const createActivity = async ({
  name,
  image,
  cityName,
  availability,
  description,
  price,
}: Activity) => {
  try {
    const activity = await axios.post("/activities", {
      name,
      image,
      cityName,
      availability,
      description,
      price,
    });
    return activity.data;
  } catch (err) {
    console.error(err);
  }
};
