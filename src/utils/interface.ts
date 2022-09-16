import { type } from "os";

export interface Trip {
  id?: String | string;
  name: String | string;
  initDate: String | string;
  cities?: String[];
  endDate: String | string;
  planner?: String | string;
  tripOnUser?: Object[];
  description: String | string;
  activitiesName: String[];
  image?: String | string | ArrayBuffer;
  price?: Number;
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
  city: City;
  image?: string;
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
  cityId: String;
  name: String;
  country: String;
  altCountry: String;
  muni: String;
  muniSub: String;
  featureClass: String;
  featureCode: String;
  adminCode: String;
  population: Number;
  loc: {
    type: String;
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
  image?: string | ArrayBuffer;
  initDate?: string;
  endDate?: string;
  description?: string;
}
