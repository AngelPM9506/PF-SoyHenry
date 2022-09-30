/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Container,
    Stack,
    FormControl,
    Input,
    Button,
    Text,
    Flex
} from "@chakra-ui/react";
import Layout from 'src/components/layout/Layout'
import io, { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
//import { initiateSocket, disconnectSocket, sendMessage, subscribeToChat } from "src/utils/hooksSockets";
import { GetServerSideProps } from "next/types";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import { useUser } from "@auth0/nextjs-auth0";
let socket: Socket;

interface Props {
    id: String;
}

export default function ChatRoom(props: Props) {
    const room = props.id.toString();
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const { user, isLoading: userLoading } = useUser();
    const bottomRef = useRef();

    const { data: userDb, isLoading } = useQuery(
        ["userDb", user],
        () => user && getOrCreateUser(user)
    );

    const initiateSocket = async (room: string) => {
        await axios('/api/socket');
        socket = io();
        socket.on('connect', () => { console.log(socket.id) });
        socket.emit('join', room);
        socket.on('chat', data => {
            console.log(data);
            setChat(olodChat => [...olodChat, data]);
        });
    }

    const disconnectSocket = () => {
        if (socket) socket.on("disconnect", () => { });
    }

    const sendMessage = (room: string, message: string, user: string) => {
        if (socket) socket.emit('chat', { message, room, user });
    }

    const oldMesages = async () => {
        let respuesta = await axios.get(`/api/chats?room=${room}`);
        let { data: { messages } } = respuesta;
        console.log(messages);
        setChat(messages);
    }

    useEffect(() => {
        initiateSocket(room);
        oldMesages();
        return () => {
            disconnectSocket();
        }
    }, []);

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    },[chat]);

    const setInput = (event: any) => {
        let { target: { value } } = event;
        setMessage(value);
    }

    const putMessage = (event: any) => {
        event.preventDefault();
        let user = userDb.data.name;
        if (!message || message === '') return;
        sendMessage(room, message, user);
        setMessage('');
    }

    return (
        <Layout>
            {/**render chats */}
            <Box display={'flex'} flexDirection={'column'} scrollSnapAlign={'end'} width={'50%'} margin={'1rem auto'} height={'70vh'}
                border={'1px solid #F3B46F'} borderRadius={'2xl'} padding={'2rem'} overflow={'scroll'}
                sx={{ '::-webkit-scrollbar': { display: 'none' } }} >
                {chat && chat.map((m, i) => {
                    return (
                        <Box key={i} display={'flex'}
                            flexDirection={userDb && (m.nameUser === userDb.data.name) ? 'row-reverse' : 'row'} >
                            <Box key={i} padding={'0 1rem'} maxWidth={'100%'} >
                                <Text marginTop={'0.3rem'} fontStyle={'italic'} fontWeight={'bold'}>{m.nameUser}:</Text>
                                <Text border={'1px solid #4b647c'} margin={'0.3rem'}
                                    padding={'0.4rem 1rem'} borderRadius={'3xl'} width={'max-content'} maxWidth={'85%'}>
                                    {m.message}
                                    <br />
                                </Text>
                            </Box>
                        </Box>
                    );
                })}
                <Box ref={bottomRef} />
            </Box>
            {/**form */}
            <Stack as={'form'} width={'50%'} margin={'0 auto 3rem auto'} onSubmit={putMessage}>
                <FormControl>
                    <Input type='text' value={message} onChange={setInput} margin={'0.5rem auto'} />
                    <Flex flexDirection={'row-reverse'} >
                        <Button type='submit' bg={'#4b647c'} width={'max-content'} margin={'0.5rem'}
                            cursor={'pointer'} >Send</Button>
                    </Flex>
                </FormControl>
            </Stack>
        </Layout >
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