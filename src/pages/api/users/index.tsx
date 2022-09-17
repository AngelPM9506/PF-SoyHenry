import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/utils/prisma";
import { User } from "src/utils/interface";
import usersControllers from "src/controllers/users";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body: { name, mail, description, avatar },
  } = req;
  switch (method) {
    case "GET":{
      let response = await usersControllers.getUsers()
      return res.json(response)
    }
    case "POST":
      let response = await usersControllers.postUser({ name, mail, description, avatar })
      res.json(response)
    default:
      res.status(400).send("Metohd not supported try again");
      break;
  }

}

