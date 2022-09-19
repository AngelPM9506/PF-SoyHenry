import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { getCityById } from "./cities";
import { Activity, CityInDB } from "./interface";
export const getActivities = async (
  wCity?: string,
  wName?: string,
  maxPrice?: number,
  sort?: string,
  sortBy?: string
) => {
  const activities = await axios.get(
    `http://localhost:3000/api/activities?sort=${sort || "desc"}&sortBy=${
      sortBy || "name"
    }&wCity=${wCity || "&"}&wName=${wName || "&"}&maxPrice=${maxPrice || "&"}`
  );
  return activities.data;
};

export const getActivitiesId = async (
  id: QueryFunctionContext<string[], any>
) => {
  const activity = await axios.get(
    `http://localhost:3000/api/activities/${id}`
  );
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
    const activity = await axios.post("http://localhost:3000/api/activities/", {
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
