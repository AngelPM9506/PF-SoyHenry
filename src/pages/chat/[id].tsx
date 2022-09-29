import {
	Box,
	Container,
	Stack,
    FormControl,
    Input,
    Button
} from "@chakra-ui/react";
import Layout from 'src/components/layout/Layout'
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { initiateSocket, disconnectSocket, sendMessage, subscribeToChat } from "src/utils/hooksSockets";
let socket: Socket;

const ChatRoom = () => {
    const router = useRouter();
    const [room, setRoom] = useState(router.query.id.toString());
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        if (room) initiateSocket(room);
        subscribeToChat((err: any, data: any) => {
            console.log("estoy aca");
            if(err) return;
            setChat(oldChats =>[data, ...oldChats])
        });

        return () => {
            disconnectSocket();
        }
    }, [room, chat]);

    
    return (
        <Layout>
            <Stack flexDir="column" h="75vh" w="100%">
                { chat.map((m,i) => <p key={i}>{m}</p>) }
            </Stack>
            <Stack w="100%">
                <FormControl w="100%" display="flex" alignItems="center" p="30px">
                    <Input type='text' onChange={e => setMessage(e.target.value)}/>
                    <Button type="submit" 
                            ml="15px" 
                            onClick={()=> sendMessage(room, message)}>
                        Send
                    </Button>
                </FormControl>
            </Stack>
        </Layout>
    )
}

export default ChatRoom