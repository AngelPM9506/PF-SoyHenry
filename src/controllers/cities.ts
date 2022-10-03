import prisma from "src/utils/prisma";
const cities = require("all-the-cities");
import { City, CityInDB } from "src/utils/interface";

type query = {
  byName?: string | string[];
};

const controllersCities = {
  getCitiesNames: async (query: query) => {
    let { byName } = query;
    try {
      if (byName) {
        let response = await prisma.city.findMany({
          select: {
            name: true,
            activity: true,
          },
        });
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  createCity: async (name: string, country: string) => {

    try {
      const response = cities.find(
        (city: City) => city.name === name && city.country === country
      );
      if (JSON.stringify(response) === "{}") {
        return "The city doesn't exist"
      } else {
        let cityInDb = {
          name: response.name.toLowerCase(),
          country: response.country,
          population: response.population,
          latitude: response.loc.coordinates[0],
          longitude: response.loc.coordinates[1],
        }
  
        let prismaResponse = prisma.city.create({ data: cityInDb })
  
        return prismaResponse;
      }
    } catch (error: any) {
      return error.message;
    }
  }
};

export default controllersCities;
