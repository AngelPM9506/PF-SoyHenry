import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { Trip } from "./interface";

export const getTrips = async (
  // wActivity?: string,
  wCity?: string,
  wName?: string,
  maxPrice?: number,
  sort?: string,
  sortBy?: string,
  wplanner?: string
) => {
  let urlGet = "/api/trips?";
  sort ? (urlGet += `&sort=${sort}`) : "";
  sortBy ? (urlGet += `&sortBy=${sortBy}`) : "";
  maxPrice ? (urlGet += `&maxPrice=${maxPrice}`) : "";
  wName ? (urlGet += `&wName=${wName}`) : "";
  wCity ? (urlGet += `&wCity=${wCity}`) : "";
  wplanner ? (urlGet += `&wplanner=${wplanner}`) : "";
  const trips = await axios.get(urlGet);
  return trips.data;
};

export const getTripId = async (id: QueryFunctionContext<string[], any>) => {
  const trip = await axios.get(`/api/trips/${id}`);
  return trip.data;
};

export const editTrip = async ({
  id,
  name,
  image,
  description,
  active,
  activitiesName,
}: Trip) => {
  const trip = await axios.put(`/api/trips/${id}`, {
    name,
    image,
    active,
    description,
    activitiesName,
  });

  return trip.data;
};

export const deleteTrip = async (id: string) => {
  const trip = await axios.delete(`/api/trips/${id}`);
  return trip.data;
};
