import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";

export default async function Cities(req: NextApiRequest, res: NextApiResponse) {
    let { method, query: { id } } = req
    switch (method) {
        case 'GET':
            try {
                let response = await prisma.city.findUnique({
                    where: {
                        id: id.toString()
                    },
                    include: {
                        activity: true
                    },
                })
                return res.json(response)
            } catch (error) {
                return res.json(error)
            }
    }
}
