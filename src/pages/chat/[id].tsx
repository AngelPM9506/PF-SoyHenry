/* eslint-disable react-hooks/exhaustive-deps */
// import {
//     Box,
//     Container,
//     Stack,
//     FormControl,
//     Input,
//     Button,
//     Text
// } from "@chakra-ui/react";
//import Layout from 'src/components/layout/Layout'
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
//import { initiateSocket, disconnectSocket, sendMessage, subscribeToChat } from "src/utils/hooksSockets";
import { GetServerSideProps } from "next/types";
let socket: Socket;

interface Props {
    id: String;
}

export default function ChatRoom(props: Props) {
    const room = props.id.toString();
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const initiateSocket = async (room: string) => {
        await axios('/api/socket');
        socket = io();
        socket.on('connect', () => { });
        socket.emit('join', room);
        socket.on('chat', data => {
            setChat(olodChat => [...olodChat, data]);
        });
    }

    const disconnectSocket = () => {
        if (socket) socket.on("disconnect", () => { });
    }

    const sendMessage = (room: string, message: string) => {
        if (socket) socket.emit('chat', { message, room });
    }

    useEffect(() => {
        initiateSocket(room);
        return () => {
            disconnectSocket();
        }
    }, []);

    const setInput = (event: any) => {
        let { target: { value } } = event;
        setMessage(value);
    }

    const putMessage = (event: any) => {
        event.preventDefault();
        sendMessage(room, message);
    }

    return (
        <div>
            {/**render chats */}
            <div >
                {chat.map((m, i) => <p key={i}>{m} <br /></p>)}
            </div>
            {/**form */}
            <p>{message}</p>
            <form onSubmit={putMessage}>
                <div>
                    <input type='text' onChange={setInput} />
                    <input type='submit' value={'send'} />
                </div>
            </form>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async context => {
    const { id } = context.query;
    return {
        props: {
            id: id
        },
    };
}