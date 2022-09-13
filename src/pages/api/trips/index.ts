import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";


export default async function index(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body: { name, initDate, endDate, planner, description, price } } = req;
    switch (method) {
        case 'GET':
            try {
                const response = await prisma.trip.findMany();
                return res.status(200).json(response)
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        case 'POST':
            if (!name || !initDate || !endDate || !description || !price || !planner) return res.status(400).json({ msg: 'Missing data, try again' })
            // planner debe ser el id del usuario que esta creando el viaje
            /*
            {
                "name": "Rio Cuarto para la people",
                "initDate": "2022-10-01",
                "endDate": "2022-10-15",
                "description": "description",
                "price": 5.5,
                "planner": "cl7zdjn89001178v0hq363xub"
            }
            */
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
