import type { NextApiRequest, NextApiResponse } from "next";
const cities = require("all-the-cities");
import { City, CityInDB } from "src/utils/interface";
import prisma from "src/utils/prisma";

// type Data = {
// 	msg?: string
// }

const createCity = async () => {
  const countryID = [
    "MX",
    "AR",
  ];
  const response = cities.filter(
    (city: City) => city.population > 100000 && countryID.includes(city.country)
  );
  let citiesCreatedInDB = response.map((c: City) => ({
    name: c.name,
    country: c.country,
    population: c.population,
    latitude: c.loc.coordinates[0],
    longitude: c.loc.coordinates[1],
  }));
  try {
    const response = await prisma.$transaction(
      citiesCreatedInDB.map((c: CityInDB) =>
        prisma.city.upsert({
          where: { name: c.name },
          update: {},
          create: {
            name: c.name,
            country: c.country,
            population: c.population,
            latitude: c.latitude,
            longitude: c.longitude,
          },
        })
      )
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      let exist = await prisma.city.findFirst();
      if (exist) {
        return res.json("DB is up");
      } else {
        setTimeout(() => {
          createCity();
        }, 0);
        return res.json("done");
      }
    default:
      return res.status(400).send({ msg: "Method not supported try again" });
  }
}
