import { Activity } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { weekdays } from "src/utils/interface";
import prisma from "src/utils/prisma";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    let { method, body: { name, availability, description, price, active, trip }, query: { id } } = req;
    switch (method) {
        /**obtener tuna sola actividad */
        case 'GET':
            try {
                let response = await prisma.activity.findUnique({
                    where: {
                        id: id.toString()
                    },
                    include: {
                        // activitiesOnTrips: true,
                        activitiesOnTrips: {
                            select: {
                                activityId: false,
                                tripId: true
                            }
                        }
                    },
                });
                return res.status(200).json(response);
            } catch (error: any) {
                return res.status(400).json({ msg: error.message });
            }
        /**agregar una nueva actividad */
        case 'PUT':
            /**Si no existe ningun valor retorna un error*/
            if (!name && (!availability || !Object.values(weekdays).includes(availability)) && !description && !price && !active && !trip) return res.status(400).json({ msg: 'Missing data, try again' });
            if (trip) {
                await prisma.activitiesOnTrips.create({
                    data: {
                        tripId: trip,
                        activityId: id.toString()
                    }
                })
            }
            let toUpActivity = await prisma.activity.findUnique({ where: { id: id.toString() } });
            if (!toUpActivity) return res.status(400).json({ msg: 'Activity not found, try again' });
            let activity = {
                name: name ? name : toUpActivity.name,
                availability: availability ? availability : toUpActivity.availability,
                description: description ? description : toUpActivity.description,
                price: price ? parseFloat(price) : toUpActivity.price,
                active: toUpActivity.active ? false : true
            };
            try {
                if (active !== undefined) {
                    let response = await prisma.activity.update({ where: { id: id.toString() }, data: activity });
                    return res.status(201).json(response);
                } else {
                    delete activity.active;
                    let response = await prisma.activity.update({ where: { id: id.toString() }, data: activity });
                    return res.status(201).json(response);
                }
            } catch (error: any) {
                console.log(error);
                return res.status(400).json({ msg: error.message, activity });
            }
        /**agregar una nueva actividad pendiente*/
        // case 'DELETE':
        //     break;
        default:
            res.status(400).send('Metohd not supported try again')
            break;
    }
}
