/* eslint-disable react-hooks/rules-of-hooks */

import Head from "next/head";
import MyCarousel from "src/components/Carousel";
import styles from "../styles/Home.module.css";
import { Activity, Trip } from "src/utils/interface";
import Layout from "src/components/layout/Layout";

import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  useColorModeValue,
  Text,
  Heading,
} from "@chakra-ui/react";

import axios from "axios";
import Loading from "src/components/Loading";
import { BannedAlert } from "src/components/Banned";
import { NextSeo } from "next-seo";
import {
  ROnboardingStep,
  ROnboardingWrapper,
  useROnboarding,
} from "r-onboarding";
import "r-onboarding/dist/style.css";
import { useRef } from "react";
import { stepsHome, stepsHomelittle } from "../utils/stepsTour";
import { FaQuestion } from "react-icons/fa";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
interface Props {
  trips: Trip[];
  activities: Activity[];
}
import { useWindowSize } from "../utils/windowsize";
import React from "react";

const Home = ({ trips, activities }: Props) => {
  const wrapperRef: any = useRef(null);

  const { start, goToStep, finish } = useROnboarding(wrapperRef);
  const { user, isLoading: userLoading } = useUser();
  const router = useRouter();
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );
  const size = useWindowSize();
  if (!userLoading && !user) {
    router.push("/api/auth/login");
    return <div></div>;
  }
  if (isLoading) return <Loading />;

  if (!isLoading && userDb && !userDb.data.active) {
    return <BannedAlert />;
  }

  console.log(size);
  return (
    <>
      <ROnboardingWrapper
        // @ts-expect-error
        ref={wrapperRef}
        steps={size.width < 980 ? stepsHomelittle : stepsHome}
      >
        {({ step, next, previous, isFirst, isLast, index }: any) => {
          if (!step) return null;
          return (
            // @ts-expect-error
            <ROnboardingStep>
              <Box
                rounded={"md"}
                padding={"10px"}
                backgroundColor={"#D1DFE3"}
                minWidth={"200px"}
                minHeight={"130px"}
                maxWidth={"70%"}
              >
                <Stack width={"100%"} alignItems={"flex-end"}>
                  <Button margin={"0px"} padding={"0px"} onClick={finish}>
                    <AiOutlineClose size={"1.5em"} color={"#293541"} />
                  </Button>
                </Stack>
                <Heading
                  width={"100%"}
                  marginBottom={"10px"}
                  color={"#293541"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text fontSize={"2xl"} textAlign={"center"}>
                    {step.content.title}
                  </Text>
                </Heading>
                <Text maxWidth={"400px"} overflow={"wrap"} color={"#293541"}>
                  {step.content.description}
                </Text>
                <Stack
                  marginTop={"10px"}
                  direction={"row"}
                  width={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button onClick={previous} disabled={isFirst}>
                    <BsFillArrowLeftCircleFill size={"2em"} color={"#02b1b1"} />
                  </Button>
                  <Text fontSize={"lg"} alignSelf={"center"} color={"#293541"}>
                    {index + 1}
                  </Text>
                  <Button onClick={next}>
                    <BsFillArrowRightCircleFill
                      size={"2em"}
                      color={"#02b1b1"}
                    />
                  </Button>
                </Stack>
              </Box>
            </ROnboardingStep>
          );
        }}
      </ROnboardingWrapper>
      <Layout>
        <NextSeo title="World Travelers" />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Button
            id="home"
            position={"fixed"}
            top={{ base: "8%", md: "10%" }}
            left={{ base: "0%", md: "5%" }}
            bg={useColorModeValue("#02b1b1", "#02b1b1")}
            color={"white"}
            rounded={"100%"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              bg: "#F3B46F",
              color: "black",
            }}
            m={5}
            mt={8}
            w={"45px"}
            h={"45px"}
            marginBottom={{ sm: "-15px" }}
            overflow={"hidden"}
            onClick={() => start()}
            zIndex={2}
          >
            <FaQuestion height={"30px"} width={"15px"} />
          </Button>
          <Stack
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <MyCarousel trips={trips} activities={activities} />
          </Stack>
        </Box>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await axios("/trips");
  const trips = await res.data;
  const response = await axios("/activities");
  const activities = await response.data;

  return {
    props: {
      trips: trips,
      activities: activities,
    },
  };
};

export default Home;
