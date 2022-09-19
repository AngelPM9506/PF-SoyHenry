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
  wActivity ? urlGet += `&wActivity=${wActivity}` : '';
  wName ? urlGet += `&wName=${wName}` : '';
  const trips = await axios.get(
    `http://localhost:3000/api/trips?sort=${sort || "desc"}&sortBy=${
      sortBy || "name"
    }&wName=${wName || "&"}&wplanner=${wplanner || "&"}&maxPrice=${
      maxPrice || "&"
    }&wCity=${wCity || "&"}`
  );
  return trips.data;
};

export const getTripId = async (id: QueryFunctionContext<string[], any>) => {
  const trip = await axios.get(`/trips/${id}`);
  return trip.data;
};
