/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Container,
  Stack,
  FormControl,
  Input,
  Button,
  Text,
  Flex,
  useColorModeValue,
  Heading,
  Image,
  Textarea,
} from "@chakra-ui/react";
import Layout from "src/components/layout/Layout";
import io, { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next/types";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import { useUser } from "@auth0/nextjs-auth0";
let socket: Socket;

interface Props {
  id: String;
}

interface Trip {
  [x: string]: any;
}

export default function ChatRoom(props: Props) {
  const initTrip: Trip = {};
  const room = props.id.toString();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [trip, setTrip] = useState(initTrip);
  const { user, isLoading: userLoading } = useUser();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );

  const initiateSocket = async (room: string) => {
    await axios("/api/socket");
    socket = io();
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.emit("join", room);
    socket.on("chat", (data) => {
      console.log(data);
      setChat((olodChat) => [...olodChat, data]);
    });
  };

  const disconnectSocket = () => {
    if (socket) socket.on("disconnect", () => {});
  };

  const sendMessage = (
    room: string,
    message: string,
    user: string,
    avatar: string
  ) => {
    if (socket) socket.emit("chat", { message, room, user, avatar });
  };

  const oldMesages = async () => {
    let respuesta = await axios.get(`/api/chats?room=${room}`);
    let {
      data: { messages },
    } = respuesta;
    console.log(messages);
    setChat(messages);
  };

  const getTripsDetails = async () => {
    let dataTrip = await axios.get(`/api/trips/${room}`);
    let { data } = dataTrip;
    setTrip(data);
  };

  useEffect(() => {
    initiateSocket(room);
    oldMesages();
    getTripsDetails();
    return () => {
      disconnectSocket();
    };
  }, []);

  const prefixDate = (date: string) => {
    let arraydate = date.split("T");
    let dateF = arraydate[0].split("-").reverse().join("-");
    let timePre = arraydate[1].split(".")[0].split(":");
    let time = `${timePre[0]}:${timePre[1]}`;
    return `${dateF}: ${time}`;
  };
  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const setInput = (event: any) => {
    let {
      target: { value },
    } = event;
    setMessage(value);
  };

  const putMessage = (event: any) => {
    event.preventDefault();
    let user = userDb.data.name;
    let userAvatar = userDb.data.avatar;
    if (!message || message === "") return;
    sendMessage(room, message.trim(), user, userAvatar);
    setMessage("");
  };
  const renderAvatar = (avatar: string) => {
    return (
      <Image
        boxSize={"70px"}
        src={
          avatar ||
          "https://res.cloudinary.com/mauro4202214/image/upload/v1663331567/world-travelers/favicon.ico_c8ryjz.png"
        }
        alt={""}
        borderRadius={"full"}
        boxShadow={"0px 0px 13px 10px rgba(0,0,0,0.1)"}
        margin={"1px"}
      />
    );
  };
  return (
    <Layout>
      <Heading
        as={"h2"}
        width={"100%"}
        textTransform={"capitalize"}
        textAlign={"center"}
        marginTop={"1rem"}
      >
        Chat: {trip.name}
      </Heading>
      <Flex>
        <Box
          bg={useColorModeValue(
            "RGBA(75,100,124,0.41)",
            "RGBA(75,100,124,0.41)"
          )}
          width={["95%", "95%", "85%", "75%"]}
          margin={"1rem auto"}
          padding={"0.1rem 1rem"}
          borderRadius={"3xl"}
        >
          {/**render chats */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            scrollSnapAlign={"end"}
            width={["95%", "95%", "85%", "75%"]}
            margin={"1rem auto"}
            height={"60vh"}
            borderRadius={"2xl"}
            padding={"1rem"}
            overflow={"scroll"}
            sx={{ "::-webkit-scrollbar": { display: "none" } }}
          >
            {chat &&
              chat.map((m, i) => {
                return (
                  <Box
                    key={i}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={
                      userDb && m.nameUser === userDb.data.name
                        ? "row-reverse"
                        : "row"
                    }
                  >
                    <Flex
                      borderRadius={"3xl"}
                      bg={useColorModeValue(
                        "RGBA(255,255,255,1)",
                        "rgba(209,223,227, 0.2)"
                      )}
                      boxShadow={"0px 0px 13px 10px rgba(0,0,0,0.1)"}
                      border={
                        userDb && m.nameUser === userDb.data.name
                          ? "1px solid #F3B46F"
                          : "1px solid #02b1b1"
                      }
                      margin={"0.3rem"}
                      alignItems={"center"}
                      padding={"0.5rem 1rem"}
                      maxWidth={"85%"}
                    >
                      {userDb && m.nameUser === userDb.data.name
                        ? ""
                        : renderAvatar(m.avatar)}
                      <Flex margin={"0 0.2rem"} flexDirection="column">
                        <Text
                          color={
                            userDb && m.nameUser === userDb.data.name
                              ? "#F3B46F"
                              : "#02b1b1"
                          }
                          margin={"0.3rem 0.3rem 0 0.3rem"}
                          fontStyle={"italic"}
                          fontWeight={"bold"}
                        >
                          {m.nameUser}:
                        </Text>
                        <Text
                          overflowWrap={"anywhere"}
                          fontSize={"lg"}
                          padding={"0.4rem 1rem 0 1rem"}
                        >
                          {m.message}
                        </Text>
                        <Text textAlign={"right"} fontSize={"sm"}>
                          {prefixDate(m.createdAt)}
                          <br />
                        </Text>
                      </Flex>
                      {userDb && m.nameUser === userDb.data.name
                        ? renderAvatar(m.avatar)
                        : ""}
                    </Flex>
                  </Box>
                );
              })}
            <Box as="div" ref={bottomRef} />
          </Box>
          {/**form */}
          <Stack
            as={"form"}
            width={["95%", "95%", "85%", "75%"]}
            margin={"0 auto 3rem auto"}
            onSubmit={putMessage}
          >
            <FormControl display={"flex"} alignItems={"center"}>
              <Textarea
                value={message}
                onChange={setInput}
                margin={"0.5rem auto"}
                resize={"none"}
                borderRadius={"3xl"}
                bg={useColorModeValue(
                  "RGBA(255,255,255,1)",
                  "rgba(209,223,227, 0.2)"
                )}
                autoComplete={"false"}
              />
              <Flex flexDirection={"row-reverse"}>
                <Button
                  bg={useColorModeValue("#02b1b1", "#02b1b1")}
                  margin={"0 15px"}
                  color={"white"}
                  rounded={"md"}
                  padding={"20px"}
                  type={"submit"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                    bg: "#F3B46F",
                    color: "black",
                  }}
                >
                  Send
                </Button>
              </Flex>
            </FormControl>
          </Stack>
        </Box>
      </Flex>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id: id,
    },
  };
};
