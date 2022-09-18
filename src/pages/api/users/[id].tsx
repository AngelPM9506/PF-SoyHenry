import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/utils/prisma";
import { UserData } from "src/components/UserProfile";
import { cloudinaryImg } from "src/utils/cloudinaryUpload";
import usersControllers from "src/controllers/users";


export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body: {
      name,
      description,
      mail,
      avatar,
      keyWords,
      urlTikTok,
      urlInstagram,
      urlFaceBook,
    },
    query: { id },
  } = req;

  switch (method) {
    case "GET":{
      let response = await usersControllers.getUser({ id })
      return res.json(response)
    }
    case "PUT":{
      let response = await usersControllers.putUser({
        name,
        description,
        mail,
        avatar,
        keyWords,
        urlTikTok,
        urlInstagram,
        urlFaceBook,
      })
      return res.json(response)
    }
    case "DELETE":{
      let response = await usersControllers.deleteUser({id})
      return res.json(response)
    }
    default:
      res.status(400).send("Method not supported try again");
      break;
  }
}
