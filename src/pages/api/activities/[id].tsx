import { NextApiRequest, NextApiResponse } from "next";
import ActivitiesControles from "src/controllers/activities";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    let { method, body: { name, image, availability, description, price, active }, query: { id } } = req;
    try {
        switch (method) {
            /**obtener tuna sola actividad */
            case 'GET':
                let respGet = await ActivitiesControles.getActivity({ id });
                return res.status(200).json(respGet);
            /**agregar una nueva actividad */
            case 'PUT':
                let respPut = await ActivitiesControles.putActivity(
                    { name, image, availability, description, price, active },
                    { id }
                )
                return res.status(201).json(respPut);
            /**agregar una nueva actividad pendiente*/
            case 'DELETE':
                let respDelete = await ActivitiesControles.deletActivity({ id });
                return res.status(201).json(respDelete);
            default:
                res.status(400).send('Metohd not supported try again')
                break;
        }
    } catch (error) {
        return res.status(400).json({ stastus: 'error', error });
    }
}
