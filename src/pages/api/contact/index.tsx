import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import ContactController from "src/controllers/contact";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    let { method, body: { name, surname, subject, email, whatsapp, message, userId } } = req;
    try {
        switch (method) {
            case 'GET':
                let contactGet = await ContactController.getContact();
                return res.status(200).json(contactGet);
            case 'POST':
                if (!name || !surname || !subject || !email || !whatsapp || !message ) {
                    return res.status(404).json({ status: 'error', msg: 'Missing data, try again' });
                }
                userId ? '': userId =  'User unloged';
                let args = { name, surname, subject, email, whatsapp, message, userId };
                let contactPost = await ContactController.postContac(args);
                return res.status(200).json(contactPost);
            default:
                return res.status(400).json({ msg: 'Method not supported, try again' });
        }
    } catch (error) {
        res.json(error)
    }
}

export default index

/**
 * 
 { 
    "name": "", 
    "surname": "", 
    "subject": "", 
    "email": "", 
    "whatsapp": "", 
    "message": "", 
    "userId": "" 
}
 */