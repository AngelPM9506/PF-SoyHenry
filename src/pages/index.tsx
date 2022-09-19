import type { NextPage } from "next";
import { Stack, Box, Heading, Text, Button, Center } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { useState } from "react";

const landingPage: NextPage = () => {
  const [isplaying, setPlaying] = useState(false);
  const url =
    "https://res.cloudinary.com/mauro4202214/video/upload/v1663337043/world-travelers/videolandingpagecrop_iklwjv.mp4";

  return (
    <>
      <ReactPlayer
        loop
        width="100vw"
        height="100%"
        object-fit={"cover"}
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="-1"
        url={url}
        controls={false}
        volume={0.3}
        onMouseMove={(e) => e.target.play()}
        // onMouseOver={(e) => e.target.play()}
      />
      <Box marginTop="-50%">
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={800}
            fontSize={100}
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
              Welcome to,
            </Text>
            <br />
            <Text as="span" color="#02b1b1" textShadow="1px 1px #293541" m="1">
              WORLD TRAVELERS!
            </Text>
          </Heading>

          <Text
            color="#293541"
            lineHeight="tall"
            textAlign="center"
            fontSize="40"
            fontWeight="800"
            textShadow="1px 1px #D1DFE3"
          >
            The most amazing community of travelers!
          </Text>
          <Center>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              {/*eslint-disable-next-line @next/next/no-html-link-for-pages*/}
              <a href="/api/auth/login">
                <Button
                  rounded="full"
                  size="lg"
                  fontWeight="800"
                  px={15}
                  color="#293541"
                  fontSize="24"
                  bg="#02b1b1"
                  _hover={{ bg: "#F3B46F", color: "#293541" }}
                >
                  LOG IN
                </Button>
              </a>
            </Stack>
          </Center>
        </Stack>
      </Box>
    </>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/hello");
  const dataCities = await response.json();
  return {
    props: {
      cities: dataCities,
    },
  };
};

export default landingPage;
