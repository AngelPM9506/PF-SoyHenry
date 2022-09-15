import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";
import { condition, create, typeSort } from "src/utils/interface"


export default async function index(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        method,
        body: { name, initDate, endDate, planner, description, price, idPartaker, image, activitie },
        query: { wName, sort, sortBy, wActivity, wplanner, maxPrice }
    } = req;
    switch (method) {
        case 'GET':
            let orderBy: typeSort[] = [];
            let sortfrom: typeSort = {};
            /**http://192.168.0.8:3000/api/trips?sort=asc&sortBy=price&wName=na&wplanner=cl7z6as0h01100cqiw589yste&maxPrice=500&wActivity=vol*/
            let sortName: string = sortBy ? sortBy.toString().toLowerCase() : 'name';
            sortfrom[sortName] = sort ? sort.toString().toLowerCase() : 'desc';
            orderBy.push(sortfrom);
            var condition: condition = {
                where: wName ? { name: { contains: wName.toString() } } : {},
                include: {
                    planner: true,
                    tripOnUser: {
                        include: { user: true }
                    },
                    activitiesOnTrips: {
                        include: { activity: true }
                    }
                },
                orderBy
            };

            wplanner ? condition.where = { ...condition.where, planner: { is: { id: wplanner.toString() } } } : '';
            wActivity
                ? condition.where = {
                    ...condition.where,
                    activitiesOnTrips: {
                        some: {
                            activity: {
                                is: {
                                    name: {
                                        contains: wActivity.toString()
                                    }
                                }
                            }
                        }
                    }
                } : '';
            maxPrice ? condition.where = { ...condition.where, price: { lte: parseFloat(maxPrice.toString()) } } : '';

            try {
                const response = await prisma.trip.findMany(condition);
                return res.status(200).json(response)
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        case 'POST':
            if (!name || !initDate || !endDate || !description || !price || !planner || !idPartaker || !Array.isArray(idPartaker)) {
                return res.status(400).json({ msg: 'Missing or invalid data, try again' })
            }
            let initialDate = new Date(initDate);
            let finishDate = new Date(endDate);
            let create: create[] = idPartaker.map((idP: Object) => { return { user: { connect: { id: idP.toString() } } } });
            try {
                const response = await prisma.trip.create({
                    data: {
                        name: name.toLowerCase(),
                        initDate: initialDate,
                        endDate: finishDate,
                        description: description,
                        price: price,
                        plannerId: planner,
                        tripOnUser: { create: create }
                    }
                });
                return res.status(201).json({ create, response});
            } catch (error: any) {
                console.log(error);
                return res.status(500).json({ error: error.message, name, description });
            }
        default:
            res.status(400).send('Method not supported try again')
            break;
    }
}
