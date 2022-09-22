import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/utils/prisma";
import { User } from "src/utils/interface";
import usersControllers from "src/controllers/users";
import NextCors from "nextjs-cors";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const {
    method,
    body: { name, mail, description, avatar }, query: {id, tripID}
  } = req;
  switch (method) {
    case "GET": {
      if(!tripID || !id) {
        let response = await usersControllers.getUsers();
        return res.json(response);
      } else {
        let response = await usersControllers.searchUser(tripID.toString(), id.toString());
        return res.json(response);
      }
    }
    case "POST":
      let response = await usersControllers.postUser({
        name,
        mail,
        description,
        avatar,
      });
      return res.json(response);
    default:
      res.status(400).send("Metohd not supported try again");
      break;
  }
}
