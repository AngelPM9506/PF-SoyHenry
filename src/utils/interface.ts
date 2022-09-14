export interface User {
  name: string;
  mail: string;
  avatar: string;
  description: string;
}

export interface UserUpdate {
  name: string;
  description: string;
  mail: string
}


export interface Activity {
    where: {
        id: string
    }
    data: {
        name: string
        availability: string
        description: string
        price: number
        active?: boolean
    }
}

export enum weekdays {
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
}

export interface City {
    cityId: String,
    name: String,
    country: String,
    altCountry: String,
    muni: String,
    muniSub: String,
    featureClass: String,
    featureCode: String,
    adminCode: String,
    population: Number,
    loc: {
        type: String,
        coordinates: Number[] 
    }
}

export interface CityInDB {
    name: string,
	country: string,
	population: number,
	latitude: number,
	longitude: number
}

