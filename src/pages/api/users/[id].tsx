import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/utils/prisma";
import { UserData } from "src/components/UserProfile";

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
    case "GET":
      try {
        const response = await prisma.user.findUnique({
          where: { id: id?.toString() },
        });
        if (response.active) {
          return res.status(200).json(response);
        } else {
          return res
            .status(404)
            .json({ msg: "Inactive user contact the admin" });
        }
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    case "PUT":
      if (!name || !description || !mail)
        return res.status(400).json({ msg: "Missing data, try again" });
      let user: UserData = {
        name,
        description,
        mail,
        avatar,
        urlTikTok,
        urlInstagram,
        urlFaceBook,
        keyWords,
      };

      try {
        console.log(urlTikTok);
        const response = await prisma.user.update({
          where: { mail: mail },
          data: user,
        });
        console.log(response);
        if (response.active) {
          return res.status(201).json(response);
        } else {
          return res
            .status(404)
            .json({ msg: "Inactive user contact the admin" });
        }
      } catch (error: any) {
        return res
          .status(500)
          .json({ error: error.message, name, description });
      }
    case "DELETE":
      try {
        const response = await prisma.user.update({
          where: { id: id?.toString() },
          data: { active: false },
        });
        res.status(200).json({ User: response, msg: "Suspendeed acount" });
      } catch (error: any) {
        return res
          .status(500)
          .json({ error: error.message, name, description });
      }
    default:
      res.status(400).send("Method not supported try again");
      break;
  }
}
