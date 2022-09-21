import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import TripsControllers from "src/controllers/trips";

const id = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      });
    const { method, body: { description, active, traveler, idPartaker, activitiesName, cities }, query: { id } } = req;
    try {
        switch (method) {
            /**obtener info de un solo trp */
            case 'GET':
                const respGet = await TripsControllers.getTrip({ id });
                return res.status(200).json(respGet);
            /**actualizar untrip  */
            case 'PUT':
                const respPut = await TripsControllers.putTrip(
                    { description, active, traveler, idPartaker, activitiesName, cities },
                    { id }
                )
                return res.status(201).json(respPut);
            /**agrgar usuarios y actividades a un trip */
            case 'PATCH':
                let respPatch = await TripsControllers.patchTrip(
                    { description, active, traveler, idPartaker, activitiesName, cities },
                    { id }
                )
                return res.status(201).json(respPatch)
            /**eliminar un trip  */
            case 'DELETE':
                let respDelete = await TripsControllers.deleteTrip({ id })
                // let respDelete = await prisma.trip.delete({
                //     where: {
                //         id: id.toString().trim()
                //     }
                // })
                //await cloudinary.uploader.destroy(resp.public_id_image);
                return res.status(201).json(respDelete)
            default: {
                return res.status(400).send('Method not supported try again');
            }
        }
    } catch (error) {
        return res.status(500).json(error);
    }

}

export default id