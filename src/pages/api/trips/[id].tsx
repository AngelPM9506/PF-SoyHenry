import { NextApiRequest, NextApiResponse } from "next"
import { createUsers, createActivities, createCity } from "src/utils/interface";
import prisma from "src/utils/prisma";



const id = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { method, body: { description, active, traveler, idPartaker, activitiesName, citiesIds }, query: { id } } = req;
    switch (method) {
        /**obtener info de un solo trp */
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
                    },
                    citiesOnTrips: {
                        include: { city: true }
                    }
                }
            }
            try {
                let response = await prisma.trip.findUnique(condition);
                return res.status(200).json(response);
            } catch (error: any) {
                return res.status(404).json({ error: error.message });
            }
        /**actualizar untrip  */
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
                        active: trip.active ? false : true,
                    },
                    include: {
                        planner: true,
                        tripOnUser: {
                            include: { user: true, trip: true }
                        },
                        activitiesOnTrips: {
                            include: { activity: true }
                        },
                        citiesOnTrips: {
                            include: { city: true }
                        }
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
        /**agrgar usuarios y actividades a un trip */
        case 'PATCH':
            if (!idPartaker && !Array.isArray(idPartaker) && !activitiesName && !Array.isArray(activitiesName) && !citiesIds && !Array.isArray(citiesIds)) {
                return res.status(400).json({ msg: 'Missing or invalid data, try again' })
            }
            let createUsers: createUsers[] = idPartaker ? idPartaker.map((idP: Object) => {
                return {
                    user: {
                        connect: {
                            id: idP.toString()
                        }
                    }
                }
            }) : [];
            let createActivities: createActivities[] = activitiesName ? activitiesName.map((nameAct: string) => {
                return {
                    activity: {
                        connect: {
                            name: nameAct
                        }
                    }
                }
            }) : [];
            let createCities: createCity[] = citiesIds ? citiesIds.map((idCity: string) => {
                return {
                    city: {
                        connect: {
                            id: idCity.toString()
                        }
                    }
                }
            }) : [];
            try {
                return res.status(201).json(await prisma.trip.update({
                    where: {
                        id: id.toString()
                    },
                    data: {
                        tripOnUser: { create: createUsers },
                        activitiesOnTrips: { create: createActivities },
                        citiesOnTrips: { create: createCities }
                    },
                    include: {
                        planner: true,
                        tripOnUser: {
                            include: { user: true, trip: true }
                        },
                        activitiesOnTrips: {
                            include: { activity: true }
                        },
                        citiesOnTrips: {
                            include: { city: true }
                        }
                    }
                }))
            } catch (error: any) {
                return res.status(404).json({ error: error.message });
            }
        /**eliminar un trip  */
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