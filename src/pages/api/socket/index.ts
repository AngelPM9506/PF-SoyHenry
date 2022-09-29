import { NextApiRequest, NextApiResponse } from "next"
import { Server } from 'socket.io';
const index = (req: NextApiRequest, res: NextApiResponse | any) => {
    if (res.socket.server.io) {
        console.log('server is already running');
    } else {
        console.log('Socket is initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;
        io.on('connection', socket => {
            socket.on('input-change', msg => {
                socket.broadcast.emit('update-input', msg);
            });
        })
    }
    res.status(200).end();
}

export default index