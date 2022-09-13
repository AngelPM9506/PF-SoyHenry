export interface User {
    name: string;
    mail: string;
    description: string;
}

export interface UserUpdate {
    name: string;
    description: string;
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