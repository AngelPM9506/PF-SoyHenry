import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";


export default async function index(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body: { name, initDate, endDate, planner, description, price, image, activitie } } = req;
    switch (method) {
        case 'GET':
            try {
                const response = await prisma.trip.findMany();
                return res.status(200).json(response)
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        case 'POST':
            if (!name || !initDate || !endDate || !description || !price || !planner) {
                return res.status(400).json({ msg: 'Missing data, try again' })
            }
            let initialDate = new Date(initDate)
            let finishDate = new Date(endDate)
            try {
                const response = await prisma.trip.create({
                    data: {
                        name: name,
                        initDate: initialDate,
                        endDate: finishDate,
                        description: description,
                        price: price,
                        plannerId: planner,
                        image: image
                    }
                });
                await prisma.activitiesOnTrips.create({
                    data: {
                        tripId: response.id.toString(),
                        activityId: activitie
                    }
                })
                return res.status(201).json(response);
            } catch (error: any) {
                console.log(error);
                return res.status(500).json({ error: error.message, name, description });
            }
        default:
            res.status(400).send('Method not supported try again')
            break;
    }
}
