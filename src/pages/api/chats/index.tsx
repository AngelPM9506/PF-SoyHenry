import { NextApiRequest, NextApiResponse } from 'next';
import ChatModel from 'src/models/Chat';
import mongoConection from 'src/utils/mongoConection'

mongoConection();


const Index = async (req: NextApiRequest, res: NextApiResponse) => {
    let { method, query: { room }, body: { idTrip, nameUser, message, avatar } } = req;
    try {
        switch (method) {
            case 'GET':
                let selectRom = room ? { idTrip: room } : {};
                const clients = await ChatModel.find(selectRom);
                return res.status(200).json({ status: 'success', messages: clients });
            case 'POST':
                if (!idTrip || !nameUser || !message || !avatar) return res.status(404).json({ status: 'error', msg: 'Data Missing' })
                let newClient = await ChatModel.create({ idTrip, nameUser, message, avatar });
                return res.status(201).json({ status: 'success', newClient });
            default:
                return res.status(404).json({ status: 'error', msg: 'Method unsuported' });
        }
    } catch (error: any) {
        res.json({ error: error })
    }
}

export default Index;