import { type } from "os";
import { UserData } from "src/components/UserProfile";

export interface Trip {
  activityId?: string;
  plannerId?: string;
  id?: string;
  name: string;
  initDate?: string;
  cities?: string[];
  endDate: string;
  planner?: { avatar?: string; id?: string } | any;
  tripOnUser?: Object[];
  description: string;
  activitiesName: { name: string; actDate: string }[];
  image?: string | ArrayBuffer;
  price?: number;
  active?: boolean;
  activitiesOnTrips?: {
    activityId?: string;
    activity: Activity;
    tripId?: string;
  }[];
  citiesOnTrips?: { city: CityInDB }[];

}

export interface User {
  id?: string;
  name: string;
  mail: string;
  email?: string;
  avatar: string;
  description?: string;
}

export interface UserUpdate {
  name: String;
  mail: String;
  description: String;
}

export interface Activity {
  id?: string;
  name?: string;
  availability?: string[];
  description?: string;
  price?: number;
  city?: City;
  cityName?: string;
  image?: string | ArrayBuffer;
  active?: boolean;
  idFeedback?: string;
  comment?: string;
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
  actDate: Date;
  activity: {
    connect: {
      name: string;
    };
  };
};

export type activeDate = {
  actDate: string;
  name: string;
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
  includes: any;
}

export interface CityInDB {
  id: string;
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
  date?: string;
  description?: string;
  price?: string;
  cityName?: string;
  cities?: string;
  availability?: string;
  activitiesName?: string;
  keyWords?: string;
}

export type createComment = {
  comments: {
    connect: {
      comment: string;
    };
  };
};

export interface Comment {
  id: string;
  comment?: string;
  rating?: number;
  User?: User;
  userMail?: string;
  feedbackDate?: string;
}
