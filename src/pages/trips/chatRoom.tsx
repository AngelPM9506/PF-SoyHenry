import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
let socket: Socket;

const ChatRoom = () => {

    const [input, setInput] = useState('');
    const [msg, setMsg] = useState('');

    const socketInit = async () => {
        await axios.get('/api/socket');
        socket = io();
        socket.on('connetc', () => {
            console.log('connected');
        });
        socket.on('update-input', (msg: any) => {
            setMsg(msg);
        })
    }

    useEffect(() => {
        socketInit();
    });

    const getMesage = (event: any) => {
        setInput(event.target.value);
    }

    const setMesage = (event: any) => {
        event.preventDefault();
        console.log(input);        
        socket.emit('input-change', input);
    }
    
    return (
        <div>
            <form onSubmit={setMesage}>
                <input type="text" onChange={getMesage} />
                <input type="submit" value="send message" />
            </form>
            <p>{input}</p>
            <p>{msg}</p>
        </div>
    )
}

export default ChatRoom