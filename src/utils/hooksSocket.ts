import axios from 'axios';
import io, { Socket } from 'socket.io-client';

const { AXIOS_URL_BASE } = process.env;

let socket: Socket;

export const initiateSocket = async (room: string) => {
    await axios.get('/api/socket');  
    socket = io();
    console.log(`Connecting socket... ${AXIOS_URL_BASE}`);
    if (socket && room) socket.emit('join', room);
}
export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}
export const subscribeToChat = (cb: Function) => {
    if (!socket) return (true);
    socket.on('chat', (msg: string) => {
        console.log('Websocket event received!');
        return cb(null, msg);
    });
}
export const sendMessage = (room: string, message: string) => {
    if (socket) socket.emit('chat', { message, room });
}