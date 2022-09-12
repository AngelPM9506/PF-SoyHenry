import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";
import { User, UserUpdate } from "src/utils/interface";

export default async function index(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body: { name, description }, query: { id } } = req;
    switch (method) {
        case 'GET':
            try {
                const responce = await prisma.user.findUnique({ where: { id: id } });
                return res.status(200).json(responce)
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        case 'PUT':
            if (!name || !description) return res.status(400).json({ msg: 'faltan datos intenta de nuevo ' })
            let user: UserUpdate = { name, description };
            try {
                const responce = await prisma.user.update({ where: { id: id }, data: user });
                return res.status(201).json(responce);
            } catch (error: any) {
                return res.status(500).json({ error: error.message, name, description });
            }
        case 'DELETE':
            res.status(404).send('Por modificar la tabla para no borrar el usuario como tal');
        default:
            res.status(400).send('metodo no soposrtado intenta de nuevo')
            break;
    }
}
