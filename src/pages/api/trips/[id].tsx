import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";

const id = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { method, body: { description, active, traveler }, query: { id } } = req;
    switch (method) {
        case 'GET':
            try {
                let response = await prisma.trip.findUnique({ where: { id: id.toString() } });
                let travelersOnTrip = await prisma.usersOnTrips.findMany({
                    where: {
                        tripId: id.toLocaleString()
                    },
                    select: {
                        userid: true,
                        tripId: false
                    }
                })
                return res.status(200).json({ response, travelersOnTrip });
            } catch (error: any) {
                return res.status(404).json({ error: error.message });
            }
        case 'PUT':
            try {
                if (!active && !description && !traveler) {
                    return res.status(400).json({ msg: 'Missing data try again' })
                };
                if (traveler) {
                    await prisma.usersOnTrips.create({
                        data: {
                            userid: traveler,
                            tripId: id.toLocaleString()
                        }
                    })
                }
                let trip = await prisma.trip.findUnique({ where: { id: id.toString() } });
                if (!trip) return res.status(400).json({ msg: 'Trip not found, try again' });
                let condition = {
                    where: {
                        id: id.toString()
                    },
                    data: {
                        description: description ? description : trip.description,
                        active: trip.active ? false : true
                    }
                }
                if (active !== undefined) {
                    return res.status(201).json(await prisma.trip.update(condition));
                } else {
                    delete condition.data.active;
                    return res.status(201).json(await prisma.trip.update(condition));
                }
            } catch (error: any) {
                return res.status(404).json({ error: error.message });
            }
            break;
        // case 'DELETE':
        //     break;
        default:
            res.status(400).send('Method not supported try again');
            break;
    }
}

export default id