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
            case 'GET':{
                const response = await TripsControllers.getTrip({id});
                return res.json(response);
            }
            /**actualizar untrip  */
            case 'PUT':{
                const response = await TripsControllers.putTrip({ description, active, traveler, idPartaker, activitiesName, cities }, { id })
                return res.json(response);
            }
                
            /**agrgar usuarios y actividades a un trip */
            case 'PATCH':
                if (!idPartaker && !Array.isArray(idPartaker) && !activitiesName && !Array.isArray(activitiesName) && !cities && !Array.isArray(cities)) {
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
                let createCities: createCity[] = cities ? cities.map((idCity: string) => {
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
    } catch (error) {
        return res.status(500).json(error);
    }

}

export default id