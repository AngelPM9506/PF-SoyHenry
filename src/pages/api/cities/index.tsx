import type { NextApiRequest, NextApiResponse } from 'next'
import controllersCities from 'src/controllers/cities';
import prisma from "src/utils/prisma";


export default async function Cities(req: NextApiRequest, res: NextApiResponse) {
  const { method, query:{byName}, body:{name, country}} = req;
  switch (method) {
    case 'GET':
      try {
        if(!byName){
        let response = await prisma.city.findMany({
          include:{
            activity:true
          }
        })
        return res.json(response)
      }else{
        let response = await controllersCities.getCitiesNames({byName})
        return res.json(response)
      }
      } catch (error) {
        return res.json(error)
      }

    case 'POST': {
      let exist = await prisma.city.findFirst({ where: { name: name.toLowerCase() } });
			if (exist) {
				return res.json(exist);
			} else {
				const response = await controllersCities.createCity(name, country)
				return res.json(response);
			}
    }
    default:
      return res.status(400).json({ msg: 'Method not supported, try again' })
  }
}


