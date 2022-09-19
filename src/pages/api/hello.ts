import type { NextApiRequest, NextApiResponse } from 'next';
const cities = require('all-the-cities');
import { City, CityInDB } from 'src/utils/interface';
import prisma from 'src/utils/prisma';

// type Data = {
// 	msg?: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const response = cities.filter((city: City) => city.population > 100000);
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

        return res.json(response);
      } catch (error: any) {
        return res.status(404).json(error);
      }
    default:
      return res.status(400).send({ msg: 'Method not supported try again' });
  }
}
