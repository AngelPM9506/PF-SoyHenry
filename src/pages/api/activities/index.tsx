import { NextApiRequest, NextApiResponse } from 'next';
import { ActivitySort, condition, weekdays } from 'src/utils/interface';
import prisma from 'src/utils/prisma';

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  let {
    method,
    body: { name, availability, description, price, cityName, image, tripsId },
    query: { wName, sort, sortBy, wCity, maxPrice },
  } = req;
  switch (method) {
    /**obtener todos las actividades */
    case 'GET':
      let orderBy: ActivitySort[] = [];
      let sortfrom: ActivitySort = {};
      /**http://127.0.0.1:3000/api/activities?sort=asc&sortBy=price&wName=nadar&wCity=Dubai&maxPrice=60*/
      let sortName: string = sortBy ? sortBy.toString().toLowerCase() : 'name';
      sortfrom[sortName] = sort ? sort.toString().toLowerCase() : 'desc';
      orderBy.push(sortfrom);
      let condition: condition = {
        where: wName ? { name: { contains: wName.toString() } } : {},
        include: { city: true },
        orderBy,
      };

      wCity
        ? (condition.where = {
            ...condition.where,
            city: { is: { name: { contains: wCity.toString() } } },
          })
        : '';
      maxPrice
        ? (condition.where = {
            ...condition.where,
            price: { lte: parseFloat(maxPrice.toString()) },
          })
        : '';

      try {
        let response = await prisma.activity.findMany(condition);
        return res.status(200).json(response);
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    /**agregar una nueva actividad */
    case 'POST':
      /**Comprobar que existan los argumentos y que availability este en el enum*/
      if (
        !name ||
        !availability ||
        !Object.values(weekdays).includes(availability) ||
        !description ||
        !price ||
        !cityName ||
        !tripsId ||
        !Array.isArray(tripsId) ||
        !image
      ) {
        return res.status(400).json({ msg: 'Missing data, try again' });
      }

      let searchCity = await prisma.city.findMany({
        where: { name: cityName },
      });
      let cityId = searchCity[0].id;
      let activity = {
        data: { name, availability, description, price, cityId, image },
      };
      try {
        let response = await prisma.activity.create(activity);
        await prisma.activitiesOnTrips.create({
          data: {
            activityId: response.id.toString(),
            tripId: tripsId.toString(),
          },
        });
        return res.status(201).json(response);
      } catch (error: any) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      res.status(400).send('Metohd not supported try again');
      break;
  }
}
