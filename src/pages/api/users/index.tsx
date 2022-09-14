import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/utils/prisma';
import { User } from 'src/utils/interface';

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body: { name, mail, description, avatar },
  } = req;
  switch (method) {
    case 'GET':
      try {
        const response = await prisma.user.findMany({
          where: { active: true },
        });
        return res.status(200).json(response);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    case 'POST':
      if (!name || !mail)
        return res.status(400).json({ msg: 'Missing data, try again' });
      let user: User = { name, mail, description, avatar };
      try {
        const response = await prisma.user.upsert({
          where: { mail: mail },
          update: {},
          create: {
            name: name,
            mail: mail,
            avatar: avatar,
            description: description,
          },
        });
        return res.status(201).json(response);
      } catch (error: any) {
        return res
          .status(500)
          .json({ error: error.message, name, mail, description });
      }
    default:
      res.status(400).send('Metohd not supported try again');
      break;
  }
}
