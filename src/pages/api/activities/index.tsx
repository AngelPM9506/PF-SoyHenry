import { NextApiRequest, NextApiResponse } from 'next';
import { typeSort, condition, weekdays } from 'src/utils/interface';
import prisma from 'src/utils/prisma';
import ActivitiesControles from 'src/controllers/activities'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  let {
    method,
    body: { name, availability, description, price, cityName, image },
    query: { wName, sort, sortBy, wCity, maxPrice },
  } = req;
  try {
    switch (method) {
      /**obtener todos las actividades */
      case 'GET':
        let repGet = await ActivitiesControles.getActivities({ wName, sort, sortBy, wCity, maxPrice });
        return res.status(200).json(repGet);

      /**agregar una nueva actividad */
      case 'POST':
        /**Comprobar que existan los argumentos y que availability este en el enum*/
        if (
          !name || !availability || !description || !price || !cityName || !image
        ) { return res.status(400).json({ msg: 'Missing data, try again' }); }

        let activity = {
          data: {
            name, availability, description, price, image,
            city: { connect: { name: cityName.toString() } }
          },
          include: { city: true }
        };
        var responseP = await prisma.activity.create(activity);
        return res.status(201).json(responseP);
      default:
        res.status(400).send('Metohd not supported try again');
        break;
    }
  } catch (error: any) {
    return res.json({ status: "error", msg: error.message });
  }
}
/*
{
  "name": "Nadar en un arecife de coral",
  "availability": ["Monday", "Tuesday"],
  "description": "Un gran día en el mar",
  "price": 30.65,
  "cityName": "Texcoco de Mora",
  "image": "Prueba imagen",
}
*/