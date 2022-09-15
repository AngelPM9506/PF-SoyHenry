import { NextApiRequest, NextApiResponse } from "next";
import { weekdays } from "src/utils/interface";
import prisma from "src/utils/prisma";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    let { method, body: { name, availability, description, price, cityName, image } } = req;
    switch (method) {
        /**obtener todos las actividades */
        case 'GET':
            try {
                let response = await prisma.activity.findMany();
                return res.status(200).json(response);
            } catch (error: any) {
                return res.status(400).json({ msg: error.message });
            }
        /**agregar una nueva actividad */
        case 'POST':
            /**Comprobar que existan los argumentos y que availability este en el enum*/
            if (!name ||
                !availability ||
                !Object.values(weekdays).includes(availability) ||
                !description ||
                !price ||
                !cityName) {
                return res.status(400).json({ msg: 'Missing data, try again' })
            };
            let searchCity = await prisma.city.findMany({ where: { name: cityName } })
            let cityId = searchCity[0].id
            let activity = { data: { name, availability, description, price, cityId, image } };
            try {
                let response = await prisma.activity.create(activity);
                return res.status(201).json(response);
            } catch (error: any) {
                return res.status(400).json({ msg: error.message });
            }
        default:
            res.status(400).send('Metohd not supported try again')
            break;
    }
}
