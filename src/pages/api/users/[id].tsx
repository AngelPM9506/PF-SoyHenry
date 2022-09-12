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
                const response = await prisma.user.findUnique({ where: { id: id.toString() } });
                if(response.active) {
                    return res.status(200).json(response)
                } else {
                    return res.status(404).json({ msg: 'Usuario inactivo contacta con el admin' });
                }
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        case 'PUT':
            if (!name || !description) return res.status(400).json({ msg: 'faltan datos intenta de nuevo ' })
            let user: UserUpdate = { name, description };
            try {
                const response = await prisma.user.update({ where: { id: id.toString() }, data: user });
                console.log(response)
                if(response.active) {
                    return res.status(201).json(response);
                } else {
                    return res.status(404).json({ msg: 'Usuario inactivo contacta con el admin' });
                }
            } catch (error: any) {
                return res.status(500).json({ error: error.message, name, description });
            }
        case 'DELETE':
            try {
                const response = await prisma.user.update({ where: { id: id.toString() }, data: { active: false } });
                res.status(200).json({ User: response, msg: 'Cuanta suspendida' })
            } catch (error: any) {
                return res.status(500).json({ error: error.message, name, description });
            }
        default:
            res.status(400).send('metodo no soposrtado intenta de nuevo')
            break;
    }
}
