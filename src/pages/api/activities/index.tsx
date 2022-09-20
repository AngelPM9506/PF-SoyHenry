import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import ActivitiesControles from 'src/controllers/activities'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
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
        let repPost = await ActivitiesControles.postActivity({ name, availability, description, price, cityName, image });
        return res.status(201).json(repPost);
      default:
        res.status(400).send('Metohd not supported try again');
        break;
    }
  } catch (error: any) {
    return res.status(410).json({ status: "error", msg: error.message });
  }
}
/**
 * Url del get de los filtros
 * http://127.0.0.1:3000/api/activities?sort=asc&sortBy=price&wName=nadar&wCity=Dubai&maxPrice=60
 * */
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