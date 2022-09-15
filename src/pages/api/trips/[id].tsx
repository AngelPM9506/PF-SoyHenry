import { NextApiRequest, NextApiResponse } from "next"
import { create } from "src/utils/interface";
import prisma from "src/utils/prisma";

/**
 * git add . && git commit -m "actualizacion de default del modelo Activity, mejoras y correcion de rutas de trips y se añadio el type create " && git push -u origin FiltrosTrips 
 */

const id = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { method, body: { description, active, traveler, idPartaker }, query: { id } } = req;
    switch (method) {
        case 'GET':
            let condition = {
                where: {
                    id: id.toString()
                },
                include: {
                    planner: true,
                    tripOnUser: {
                        include: { user: true }
                    },
                    activitiesOnTrips: {
                        include: { activity: true }
                    }
                }
            }
            try {
                let response = await prisma.trip.findUnique(condition);
                return res.status(200).json(response);
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
        case 'PATCH':
            if (!idPartaker && !Array.isArray(idPartaker)) {
                return res.status(400).json({ msg: 'Missing or invalid data, try again' })
            }
            let create: create[] = idPartaker.map((idP: Object) => { return { user: { connect: { id: idP.toString() } } } });
            try {
                return res.status(201).json(await prisma.trip.update({
                    where: {
                        id: id.toString()
                    },
                    data: {
                        tripOnUser: { create: create }
                    }
                }))
            } catch (error: any) {
                return res.status(404).json({ error: error.message });
            }
        case 'DELETE':
            try {
                return res.status(201).json(await prisma.trip.delete({ where: { id: id.toString() } }))
            } catch (error: any) {
                return res.status(404).json({ error: error.message });
            }
        default:
            return res.status(400).send('Method not supported try again');
    }
}

export default id