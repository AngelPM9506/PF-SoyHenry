import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";
import { User } from "src/utils/interface";

export default async function index(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body: { name, mail, description } } = req;
    switch (method) {
        case 'GET':
            try {
                const responce = await prisma.user.findMany();
                return res.status(200).json(responce)
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        case 'POST':
            if (!name || !mail || !description) return res.status(400).json({ msg: 'faltan datos intenta de nuevo ' })
            let user: User = { name, mail, description };
            try {
                const responce = await prisma.user.create({ data: user });
                return res.status(201).json(responce);
            } catch (error: any) {
                return res.status(500).json({ error: error.message, name, mail, description });
            }
        default:
            res.status(400).send('metodo no soposrtado intenta de nuevo')
            break;
    }
}
