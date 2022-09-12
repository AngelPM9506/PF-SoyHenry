import { NextApiRequest, NextApiResponse } from "next"
import prisma from "src/utils/prisma";
import { UserUpdate } from "src/utils/interface";

export default async function index(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body: { name, description }, query: { id } } = req;
    switch (method) {
        case 'GET':
            try {
                const responce = await prisma.user.findUnique({ where: { id: id.toString() } });
                responce?.active
                    ? res.status(200).json(responce)
                    : res.status(404).json({ msg: 'Usuario inactivo contacta con el admin' });
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        case 'PUT':
            if (!name || !description) return res.status(400).json({ msg: 'faltan datos intenta de nuevo ' })
            let user: UserUpdate = { name, description };
            try {
                const responce = await prisma.user.update({ where: { id: id.toString() }, data: user });
                responce?.active
                    ? res.status(201).json(responce)
                    : res.status(404).json({ msg: 'Usuario inactivo contacta con el admin' });
            } catch (error: any) {
                return res.status(500).json({ error: error.message, name, description });
            }
        case 'DELETE':
            try {
                const responce = await prisma.user.update({ where: { id: id.toString() }, data: { active: false } });
                res.status(200).json({ User: responce, msg: 'Cuanta suspendida' })
            } catch (error: any) {
                return res.status(500).json({ error: error.message, name, description });
            }
        default:
            res.status(400).send('metodo no soposrtado intenta de nuevo')
            break;
    }
}
