import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/utils/prisma";
import { UserData } from "src/components/UserProfile";
import { cloudinaryImg } from "src/utils/cloudinaryUpload";
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
    body: {
      name,
      description,
      mail,
      avatar,
      keyWords,
      urlTikTok,
      urlInstagram,
      urlFaceBook,
      isAdmin,
      active,
    },
    query: { id },
  } = req;

  switch (method) {
    case "GET": {
      let response = await usersControllers.getUser({ id });
      return res.json(response);
    }
    case "PUT": {
      let response = await usersControllers.putUser({
        name,
        description,
        mail,
        avatar,
        keyWords,
        urlTikTok,
        urlInstagram,
        urlFaceBook,
        isAdmin,
        active,
      });
      return res.json(response);
    }
    case "DELETE": {
      let response = await usersControllers.deleteUser({ id });
      return res.json(response);
    }
    default:
      res.status(400).send("Method not supported try again");
      break;
  }
}
