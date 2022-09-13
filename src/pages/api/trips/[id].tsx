import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";

const id = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { method, body: { description, active }, query: { id } } = req;
    switch (method) {
        case 'GET':
            try {
                let response = await prisma.trip.findUnique({ where: { id: id.toString() } });
                return res.status(200).json(response);
            } catch (error: any) {
                return res.status(404).json({ error: error.message });
            }
            break;
        case 'PUT':
            try {
                if (!active && !description) return res.status(400).json({ msg: 'faltan datos intenta de nuevo ' });
                let trip = await prisma.trip.findUnique({ where: { id: id.toString() } });
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
            res.status(400).send('metodo no soportado intenta de nuevo');
            break;
    }
}

export default id