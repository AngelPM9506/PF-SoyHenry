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
  const trips = await axios.get(
    `http://localhost:3000/api/trips?sort=${sort || "desc"}&sortBy=${
      sortBy || "name"
    }&wName=${wName || "&"}&wplanner=${wplanner || "&"}&maxPrice=${
      maxPrice || "&"
    }&wActivity=${wActivity || "&"}`
  );
  return trips.data;
};

export const getTripId = async (id: QueryFunctionContext<string[], any>) => {
  const trip = await axios.get(`http://localhost:3000/api/trips/${id}`);
  return trip.data;
};
