import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";
import { condition, typeSort } from "src/utils/interface"


export default async function index(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        method,
        body: { name, initDate, endDate, planner, description, price },
        query: { wName, sort, sortBy, wActivity, wplanner, maxPrice }
    } = req;
    switch (method) {
        case 'GET':
            let orderBy: typeSort[] = [];
            let sortfrom: typeSort = {};
            /**http://127.0.0.1:3000/api/activities?sort=asc&sortBy=price&wName=nadar&wCity=Dubai&maxPrice=60*/
            let sortName: string = sortBy ? sortBy.toString().toLowerCase() : 'name';
            sortfrom[sortName] = sort ? sort.toString().toLowerCase() : 'desc';
            orderBy.push(sortfrom);
            let condition: condition = {
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
            if (!name || !initDate || !endDate || !description || !price || !planner) {
                return res.status(400).json({ msg: 'Missing data, try again' })
            }
            let initialDate = new Date(initDate)
            let finishDate = new Date(endDate)
            try {
                const response = await prisma.trip.create({
                    data: {
                        name: name.toLowerCase(),
                        initDate: initialDate,
                        endDate: finishDate,
                        description: description,
                        price: price,
                        plannerId: planner
                    }
                });
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
