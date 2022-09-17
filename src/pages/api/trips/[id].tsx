import { NextApiRequest, NextApiResponse } from "next"
import TripsControllers from "src/controllers/trips";
import { createUsers, createActivities, createCity } from "src/utils/interface";
import prisma from "src/utils/prisma";



const id = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { method, body: { description, active, traveler, idPartaker, activitiesName, cities }, query: { id } } = req;
    try {
        switch (method) {
            /**obtener info de un solo trp */
            case 'GET': {
                const response = await TripsControllers.getTrip({ id });
                return res.status(200).json(response);
            }
            /**actualizar untrip  */
            case 'PUT': {
                const response = await TripsControllers.putTrip(
                    { description, active, traveler, idPartaker, activitiesName, cities },
                    { id }
                )
                return res.status(201).json(response);
            }

            /**agrgar usuarios y actividades a un trip */
            case 'PATCH': {
                let response = await TripsControllers.patchTrip(
                    { description, active, traveler, idPartaker, activitiesName, cities },
                    { id }
                )
                return res.status(201).json(response)
            }
            /**eliminar un trip  */
            case 'DELETE': {
                let responce = await TripsControllers.deleteTrip({ id })
                return res.status(201).json(responce)
            }
            default: {
                return res.status(400).send('Method not supported try again');
            }
        }
    } catch (error) {
        return res.status(500).json(error);
    }

}

export default id