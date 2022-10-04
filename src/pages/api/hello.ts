import type { NextApiRequest, NextApiResponse } from "next";
const cities = require("all-the-cities");
import { City, CityInDB } from "src/utils/interface";
import prisma from "src/utils/prisma";

// type Data = {
// 	msg?: string
// }

const createCity = async (name: string, country: string) => {
  try {
    const response = cities.find(
      (city: City) => city.name === name && city.country === country
    );
    if (JSON.stringify(response) === "{}") {
      return "The city doesn't exist";
    } else {
      let cityInDb = {
        name: response.name.toLowerCase(),
        country: response.country,
        population: response.population,
        latitude: response.loc.coordinates[0],
        longitude: response.loc.coordinates[1],
      };

      let prismaResponse = prisma.city.create({ data: cityInDb });

      return prismaResponse;
    }
  } catch (error: any) {
    return error.message;
  }
  // let citiesCreatedInDB = response.map((c: City) => ({
  //   name: c.name,
  //   country: c.country,
  //   population: c.population,
  //   latitude: c.loc.coordinates[0],
  //   longitude: c.loc.coordinates[1],
  // }));
  // try {
  //   const response = await prisma.$transaction(
  //     citiesCreatedInDB.map((c: CityInDB) =>
  //       prisma.city.upsert({
  //         where: { name: c.name },
  //         update: {},
  //         create: {
  //           name: c.name.toLowerCase(),
  //           country: c.country,
  //           population: c.population,
  //           latitude: c.latitude,
  //           longitude: c.longitude,
  //         },
  //       })
  //     )
  //   );
  // } catch (error: any) {
  //   throw new Error(error);
  // }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { name, country },
  } = req;

  switch (method) {
    case "GET":
      let exist = await prisma.city.findFirst({
        where: { name: name.toLowerCase() },
      });
      if (exist) {
        return res.json(exist);
      } else {
        const response = await createCity(name, country);
        return res.json(response);
      }
    default:
      return res.status(400).send({ msg: "Method not supported try again" });
  }
}
