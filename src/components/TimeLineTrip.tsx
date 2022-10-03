/* eslint-disable react-hooks/rules-of-hooks */
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdOutlineTripOrigin } from "react-icons/md";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  HStack,
  Link,
  Text,
  VStack,
  Button,
  Stack,
  Box,
  StackDivider,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tooltip,
  Flex,
} from "@chakra-ui/react";

import NextLink from "next/link";
import CardTimeLine from "./CardTimeLine";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import { useRef, useEffect, useState } from "react";
import usersControllers from "src/controllers/users";
import searchUser from "src/utils/searchUserOnTrip";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { SendTransaction } from "./SendWeb3Transaction";
import { ModalWeb3 } from "./ModalWeb3";
import { FaPaypal, FaCcPaypal } from "react-icons/fa";
import Image from "next/image";
export const TimeLine = ({ data, ethPrice, validate, setValidate }: any) => {
  const activitiesinOrder = data.activitiesOnTrips.sort(function compareFn(
    a: any,
    b: any
  ) {
    const datea = new Date(a.actDate);
    const dateb = new Date(b.actDate);
    if (datea < dateb) {
      return -1;
    } else if (datea > dateb) {
      return 1;
    }
  });

  const router = useRouter();
  const { user, error } = useUser();
  const { isConnected } = useAccount();
  const [userOnTrip, setUserOnTrip] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );

  const payTrip = async () => {
     console.log(data)
    const response = await axios.post("/api/payment/paypal", {
      id: data.id,
      description: data.name,
      price: data.price,
      userID: userDb?.data.id,
    });

    router.push(response.data.links ? response.data.links[1].href : "/trips");
  };

  useEffect(() => {
    async function a() {
      const bool = await searchUser(data.id, userDb?.data.id);
      setUserOnTrip(bool);
    }
    a();
  }, [data.id, userDb]);

  return (
    <Stack width={"100%"} align={"center"} key={validate} mb={10}>
      {userOnTrip ? (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="150px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {`You are already register in this trip and your payment was succesfully process for ${data.name}!`}
          </AlertTitle>
        </Alert>
      ) : null}
      <StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />
      <Box
        bgColor={"#02b1b1"}
        height={"60px"}
        width={"230px"}
        rounded={"lg"}
        padding={"8px"}
        boxShadow={"0px 5px   white"}
      >
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={"2xl"}>
          Trips itinerary
        </Text>
      </Box>
      <VerticalTimeline>
        {data.activitiesOnTrips.length != 0 ? (
          data.activitiesOnTrips.map((activity: any) => (
            <CardTimeLine
              key={activity.id}
              activity={activity.activity}
              actDate={activity.actDate}
              cities={data.citiesOnTrips}
            />
          ))
        ) : (
          <Text> No Activities found</Text>
        )}

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: "#293541", color: "#02b1b1" }}
          icon={<MdOutlineTripOrigin />}
        />
      </VerticalTimeline>
      {userOnTrip ? (
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Tooltip
            hasArrow
            placement="auto"
            label="Ya has pagado y te encuentras en este viaje!"
          >
            <Button
              isDisabled
              rounded={"lg"}
              w={"100%"}
              pb={"2px"}
              mb={"10px"}
              mt={"0px"}
              size={"lg"}
              py={"8"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              fontSize={"xl"}
              onClick={() => payTrip()}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                bg: "#F3B46F",
                color: "#293541",
              }}
            >
              Pay and Join the trip!
            </Button>
          </Tooltip>
        </Stack>
      ) : (
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Button
            rounded={"lg"}
            w={"100%"}
            pb={"2px"}
            mt={"0px"}
            size={"lg"}
            py={"8"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            fontSize={"xl"}
            onClick={() => setShowPayment(showPayment ? false : true)}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              bg: "#F3B46F",
              color: "#293541",
            }}
            disabled={userOnTrip}
          >
            Pay and Join the trip!
          </Button>
          {showPayment && (
            <>
              <VerticalTimeline />
              <Flex gap={5} pb={5}>
                <Button
                  bg="#02b1b1"
                  color="white"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                    bg: "#F3B46F",
                    color: "#293541",
                  }}
                  borderRadius={10}
                  fontWeight="bold"
                  fontSize="lg"
                  w={140}
                  onClick={() => payTrip()}
                >
                  <FaPaypal color="#003087" style={{ fontSize: "1.5rem" }} />
                  <Text pl={2}>Paypal</Text>
                </Button>

                {!isConnected ? (
                  <ConnectButton label={"Connect Wallet"} showBalance={false} />
                ) : (
                  <ModalWeb3
                    value={data.price}
                    ethPrice={ethPrice}
                    tripData={data}
                    setValidate={setValidate}
                    validate={validate}
                  />
                )}
              </Flex>
            </>
          )}

          {/* {isConnected && (
            <ModalWeb3
              value={data.price}
              ethPrice={ethPrice}
              tripData={data}
              setValidate={setValidate}
              validate={validate}
            />
          )} */}
        </Stack>
      )}
    </Stack>
  );
};
