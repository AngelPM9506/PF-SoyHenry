import axios from 'axios';
import io, { Socket } from 'socket.io-client';

let socket: Socket;


export const initiateSocket = async (room: string) => {
    await axios.get('/api/socket');
    socket = io();
    if (socket && room) socket.emit('join', room);
}
export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}
export const subscribeToChat = (cb: any) => {
    if (!socket) return (true);
    socket.on('chat', msg => {
        console.log('Websocket event received!');
        return cb(null, msg);
    });
}
export const sendMessage = (room: string, message: string) => {
    if (socket) socket.emit('chat', { message, room });
}