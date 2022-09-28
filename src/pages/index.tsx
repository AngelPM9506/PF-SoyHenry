import type { NextPage } from "next";
import {
  Stack,
  Box,
  Heading,
  Text,
  Button,
  Center,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import axios from "axios";
import { NextSeo } from "next-seo";
import { BsSoundwave } from "react-icons/bs";
import { useState } from "react";
import NextLink from "next/link";


const LandingPage: NextPage = () => {
  const url =
    "https://res.cloudinary.com/mauro4202214/video/upload/v1663337043/world-travelers/videolandingpagecrop_iklwjv.mp4";
  const [ismuted, setismuted] = useState(false);

  const play = (event: any) => {
    event.target.play();
  };
  return (
    <>
      <NextSeo title="World Travelers" />
    <Box height={"100vh"} width={"100vw"}>
      <ReactPlayer
        loop
        width="100vw"
        height={"100vh"}
        object-fit={"cover"}
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        // zIndex="-1"
        url={url}
        controls={false}
        volume={0.1}
        onMouseMove={play}
        playsinline
        muted={ismuted}
        onMouseOver={(e: any) => e.target.play()}
      />
      <FormControl
        position={"fixed"}
        top={"10px"}
        right={{ base: "-40vw", md: "-45vw" }}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        <BsSoundwave size={"30px"} />
        <Switch id="sound" onClick={() => setismuted(!ismuted)} />
      </FormControl>
      <Box marginTop={{ base: "-500px", md: "-700px" }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight="1.1"
            fontWeight={{ base: "600", md: "800" }}
            fontSize={{ base: "40", md: "100" }}
            textAlign="center"
          >
            <Text
              as="span"
              position="relative"
              color="#293541"
              textShadow="1px 1px #02b1b1"
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "#02b1b1",
                zIndex: -1,
              }}
            >
              Welcome
            </Text>
            <br />
            <Text
              as="span"
              color="#02b1b1"
              textShadow="1px 1px #293541"
              m="1"
              size="3xl"
            >
              WORLD TRAVELERS!
            </Text>
          </Heading>

          <Text
            color={{ base: "#D1DFE3", md: "#293541" }}
            lineHeight="tall"
            textAlign="center"
            fontSize={{ base: "25", md: "40" }}
            fontWeight="400"
            textShadow="1px 1px #D1DFE3"
          >
            Join the most amazing community!
          </Text>
          <Center>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction="column"
              alignItems={"center"}
            >
              {/*eslint-disable-next-line @next/next/no-html-link-for-pages*/}
              <Stack alignItems={"center"}>
                <NextLink href="/api/auth/login">
                  <Button
                    mt={{ base: "60px", md: "10px" }}
                    rounded="full"
                    size={"lg"}
                    width={{ base: "200px", md: "180px" }}
                    height={{ base: "75px", md: "70px" }}
                    fontWeight="700"
                    px={15}
                    color="#293541"
                    fontSize={{ base: "24", md: "34" }}
                    bg="#02b1b1"
                    _hover={{ bg: "#F3B46F", color: "#293541" }}
                  >
                    LOG IN
                  </Button>
                </NextLink>
              </Stack>
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent={"center"}
                bottom="40px"
                position="fixed"
                marginTop={{ base: "30px", md: "100px" }}
              >
                <NextLink href="/contact">
                  <Button
                    mt={{ base: "60px", md: "0px" }}
                    rounded="full"
                    size={"lg"}
                    width={{ base: "110px", md: "180px" }}
                    height={{ base: "35px", md: "65px" }}
                    fontWeight="800"
                    px={15}
                    color="#293541"
                    fontSize={{ base: "18", md: "24" }}
                    bg="RGBA(209,223,227,0.50)"
                    mr={"30px"}
                    _hover={{ bg: "#F3B46F", color: "#293541" }}
                  >
                    Contact Us
                  </Button>
                </NextLink>{" "}
                <a href="/about">
                  <Button
                    mt={{ base: "60px", md: "0px" }}
                    rounded="full"
                    size={"lg"}
                    width={{ base: "110px", md: "180px" }}
                    height={{ base: "35px", md: "65px" }}
                    fontWeight="800"
                    px={15}
                    color="#293541"
                    fontSize={{ base: "18", md: "24" }}
                    bg={"RGBA(209,223,227,0.50)"}
                    _hover={{ bg: "#F3B46F", color: "#293541" }}
                  >
                    About Us
                  </Button>
                </a>
              </Stack>
            </Stack>
          </Center>
        </Stack>
      </Box>
    </Box>
  );
};

export const getServerSideProps = async () => {
  const response = await axios.get("/hello");
  const dataCities = await response.data;
  return {
    props: {
      cities: dataCities,
    },
  };
};

export default LandingPage;
