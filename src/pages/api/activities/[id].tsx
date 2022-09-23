import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import ActivitiesControles from "src/controllers/activities";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  let {
    method,
    body: {
      name,
      image,
      availability,
      description,
      price,
      active,
      comment,
      mail,
      rating,
    },

    query: { id, idFeedback },
  } = req;
  try {
    switch (method) {
      /**obtener tuna sola actividad */
      case "GET":
        let respGet = await ActivitiesControles.getActivity({ id });
        return res.status(200).json(respGet);
      /**agregar una nueva actividad */
      case "PUT":
        let idfeedb = idFeedback.toString();
        let respPut = await ActivitiesControles.putActivity(
          {
            name,
            image,
            availability,
            description,
            price,
            active,
            comment,
            rating,
          },
          { id, idFeedback: idfeedb }
        );
        return res.status(201).json(respPut);
      /**agregar una nueva actividad pendiente*/
      case "PATCH": {
        let respPatch = await ActivitiesControles.patchActivity(
          { comment, mail, rating },
          { id }
        );
        return res.json(respPatch);
      }
      case "DELETE":
        let idfeed = idFeedback.toString();
        let respDelete = await ActivitiesControles.deletActivity({
          id,
          idFeedback: idfeed,
        });
        return res.status(201).json(respDelete);
      default:
        res.status(400).send("Method not supported try again");
        break;
    }
  } catch (error) {
    return res.status(400).json({ status: "error", error });
  }
}
