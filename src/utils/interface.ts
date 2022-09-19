import { type } from "os";

export interface Trip {
  id?: string;
  name: string;
  initDate: string;
  cities?: string[];
  endDate: string;
  planner?: string;
  tripOnUser?: Object[];
  description: string;
  activitiesName: string[];
  image?: string | ArrayBuffer;
  price?: number;
}

export interface User {
  name: string;
  mail: string;
  avatar: string;
  description: string;
}

export interface UserUpdate {
  name: String;
  mail: String;
  description: String;
}

export interface Activity {
  id?: string;
  name: string;
  availability: string | string[];
  description: string;
  price: number;
  city?: City;
  cityName: string;
  image?: string | ArrayBuffer;
  active?: boolean;
}

export type typeSort = {
  [x: string]: string;
};

export type condition = {
  where?: {
    city?: object;
    name?: object;
    price?: object;
    activity?: object;
    activitiesOnTrips?: object;
    planner?: object;
    citiesOnTrips?: object;
  };
  include?: object;
  select?: object;
  orderBy?: typeSort[];
};
export type createUsers = {
  user: {
    connect: {
      id: string;
    };
  };
};

export type createActivities = {
  activity: {
    connect: {
      name: string;
    };
  };
};

export type createCity = {
  city: {
    connect: {
      name: string;
    };
  };
};

export enum weekdays {
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
}

export interface City {
  cityId: string;
  name: string;
  country: string;
  altCountry: string;
  muni: string;
  muniSub: string;
  featureClass: string;
  featureCode: string;
  adminCode: string;
  population: Number;
  loc: {
    type: string;
    coordinates: Number[];
  };
}

export interface CityInDB {
  name: string;
  country: string;
  population: number;
  latitude: number;
  longitude: number;
}

export interface Errors {
  name?: string;
  image?: string;
  initDate?: string;
  endDate?: string;
  description?: string;
  price?: string;
  cityName?: string;
  cities?: string;
  availability?: string;
  activitiesName?: string;
}
