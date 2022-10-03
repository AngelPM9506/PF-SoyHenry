import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/utils/prisma";

export default async function Web3Payment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { tripId, userId },
  } = req;

  try {
    switch (method) {
      case "POST": {
        const exist = await prisma.usersOnTrips.findFirst({
          where: {
            userid: userId,
            tripId: tripId,
          },
        });
        if (exist) {
          return res.json("user exist in trips");
        } else {
          await prisma.usersOnTrips.create({
            data: {
              userid: userId,
              tripId: tripId,
            },
          });
          const tripUpdated = await prisma.trip.update({
            where: { id: tripId },
            data: {
              active: true,
            },
          });
          return res.status(200).json(tripUpdated);
        }
      }
      default:
        return res.status(400).json({ msg: "Method not supported, try again" });
    }
  } catch (error: any) {
    return res.status(500).json(error.msg);
  }
}
