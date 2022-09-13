import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "src/utils/prisma";


export default async function Cities(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        let response = await prisma.city.findMany()
        return res.json(response)
      } catch (error) {
        return res.json(error)
      }
    default:
      return res.status(400).json({ msg: 'Method not supported, try again' })
  }
}
