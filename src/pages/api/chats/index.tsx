import { NextApiRequest, NextApiResponse } from 'next';
import ChatModel from 'src/models/Chat';
import mongoConection from 'src/utils/mongoConection'

mongoConection();


const Index = async (req: NextApiRequest, res: NextApiResponse) => {
    let { method, body: { idTrip, nameUser, message } } = req;
    try {
        switch (method) {
            case 'GET':
                const clients = await ChatModel.find({});
                return res.status(200).json({ status: 'success', data: clients });
            case 'POST':
                if (!idTrip || !nameUser || !message) return res.status(404).json({ status: 'error', msg: 'Data Missing' })
                let newClient = await ChatModel.create({ idTrip, nameUser, message });
                return res.status(201).json({ status: 'success', newClient });
            default:
                return res.status(404).json({ status: 'error', msg: 'Method unsuported' });
        }
    } catch (error: any) {
        res.json({ error: error })
    }
}

export default Index;