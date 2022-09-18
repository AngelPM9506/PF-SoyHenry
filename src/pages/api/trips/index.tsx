import { NextApiRequest, NextApiResponse } from "next"
import TripsControllers from 'src/controllers/trips'

export default async function index(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        method,
        body: { name, initDate, endDate, planner, description, price, activitiesName, image, cities },
        query: { wName, sort, sortBy, wActivity, wplanner, wCity, maxPrice }
    } = req;
    try {
        switch (method) {
            case 'GET': {
                const response = await TripsControllers.getTrips({
                    wName, sort, sortBy, wActivity, wplanner, wCity, maxPrice
                })
                return res.json(response);
            }
            case 'POST': {
                let args = { name, initDate, endDate, planner, description, price, activitiesName, image, cities }
                const response = await TripsControllers.postTrip(args)
                return res.json(response)
            }
            default:
                res.status(400).send('Method not supported try again')
                break;
        }
    } catch (error: any) {
        res.status(500).json({ msg: `mesage_error -> ${error.message}`, error})
    }
}
