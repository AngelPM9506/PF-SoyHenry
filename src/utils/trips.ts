import axios from "axios";
import { QueryFunctionContext } from "react-query";

export const getTrips = async (
  // wActivity?: string,
  wCity?: string,
  wName?: string,
  maxPrice?: number,
  sort?: string,
  sortBy?: string,
  wplanner?: string
) => {
  let urlGet = '/trips?';
  sort ? urlGet += `&sort=${sort}` : '';
  sortBy ? urlGet += `&sortBy=${sortBy}` : '';
  maxPrice ? urlGet += `&maxPrice=${maxPrice}` : '';
  wName ? urlGet += `&wName=${wName}` : '';
  wCity ? urlGet += `&wCity=${wCity}` : '';
  wplanner ? urlGet += `&wplanner=${wplanner}` : '';
  const trips = await axios.get(urlGet);
  return trips.data;
};

export const getTripId = async (id: QueryFunctionContext<string[], any>) => {
  const trip = await axios.get(`/trips/${id}`);
  return trip.data;
};
