import { NextApiRequest, NextApiResponse } from 'next';
import ChatModel from 'src/models/Chat';
import mongoConection from 'src/utils/mongoConection'

mongoConection();


const Index = async (req: NextApiRequest, res: NextApiResponse) => {
    let { method, query: { id },  body: { idTrip, nameUser, message } } = req;
    try {
        switch (method) {
            case 'GET':
                const getClient = await ChatModel.findById(id);
                return res.status(200).json({ status: 'success', data: getClient ? getClient : 'Unfounded' });
            case 'PUT':
                if (!idTrip && !nameUser && !message) return res.status(404).json({ status: 'error', msg: 'Data Missing' })
                let upClient = await ChatModel.updateOne({ _id: id }, { idTrip, nameUser, message });
                return res.status(201).json({ status: 'success', upClient });
            case 'DELETE':
                let clientDelete = await ChatModel.deleteOne({ _id: id });
                return res.status(201).json({ status: 'success', clientDelete });
            default:
                return res.status(404).json({ status: 'error', msg: 'Method unsuported' });
        }
    } catch (error: any) {
        res.json({ error: error })
    }
}

export default Index;