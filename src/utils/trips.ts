import axios from "axios";
import { QueryFunctionContext } from "react-query";

export const getTrips = async (
  wActivity?: string,
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
  wActivity ? urlGet += `&wActivity=${wActivity}` : '';
  wName ? urlGet += `&wName=${wName}` : '';
  const trips = await axios.get(
    `/trips?sort=${sort || ""}&sortBy=${
      sortBy || ""
    }&wName=${wName || ""}&wplanner=${wplanner || ""}&maxPrice=${
      maxPrice || ""
    }&wActivity=${wActivity || ""}`
  );
  return trips.data;
};

export const getTripId = async (id: QueryFunctionContext<string[], any>) => {
  const trip = await axios.get(`/trips/${id}`);
  return trip.data;
};
