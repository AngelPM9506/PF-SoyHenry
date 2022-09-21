/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Trip, Activity } from "src/utils/interface";
import {
  Box,
  Heading,
  Image,
  Text,
  Center,
  useColorModeValue,
  Stack,
  Button,
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import { settings } from "src/utils/SettingsCarousel";
import NextLink from "next/link";

interface Props {
  trips: Trip[];
  activities: Activity[];
}

const MyCarousel = ({ trips, activities }: Props) => {
  const defaultpic: string =
    "https://res.cloudinary.com/mauro4202214/image/upload/v1663331567/world-travelers/defaultimagetrip_j90ewc.png";

  const lastTrips = trips?.reverse().slice(0, 13);
  const lastActivities = activities?.reverse().slice(0, 13);

  const useColorMode = useColorModeValue("white", "gray.800");

  const upPrice = (price: number) => {
    return Math.floor(price + (price * 30) / 100);
  };

  return (
    <>
      <Box p={5} mt={"20px"}>
        <Heading textAlign={"center"}>Trending Trips</Heading>
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack width={"80%"}>
          <Slider {...settings}>
            {lastTrips?.map((t) => {
              return (
                <Center p={8} py={12} key={t.id}>
                  <Box
                    role={"group"}
                    p={6}
                    maxW={"330px"}
                    w={"full"}
                    bg={useColorModeValue("#D1DFE3", "blackAlpha.400")}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={1}
                  >
                    <Box
                      rounded={"lg"}
                      mt={-12}
                      pos={"relative"}
                      height={"230px"}
                      _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        filter: "blur(15px)",
                        zIndex: -1,
                      }}
                      _groupHover={{
                        _after: {
                          filter: "blur(20px)",
                        },
                      }}
                    >
                      <Image
                        alt="image"
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={t.image ? t.image.toString() : defaultpic}
                      />
                    </Box>
                    <Stack pt={4} align={"center"}>
                      <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                      >
                        {t.name}
                      </Heading>
                      <Stack direction={"row"} align={"center"}>
                        <Text fontWeight={800} fontSize={"xl"}>
                          {`$${t.price}`}
                        </Text>
                        <Text textDecoration={"line-through"} color={"#F3B46F"}>
                          {`$${upPrice(t.price)}`}
                        </Text>
                      </Stack>
                      <NextLink href={`/trips/${t.id}`}>
                        <Button>+Info</Button>
                      </NextLink>
                    </Stack>
                    <Wrap>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                      >
                        <Text fontSize={"sm"}>Planner</Text>
                        <WrapItem>
                          <NextLink href={`/user/${t.planner.id}`}>
                            <Avatar
                              cursor={"pointer"}
                              name="Trip Planner"
                              src={t.planner ? t.planner.avatar : defaultpic}
                            />
                          </NextLink>
                        </WrapItem>
                      </Box>
                    </Wrap>
                  </Box>
                </Center>
              );
            })}
          </Slider>
        </Stack>
      </Box>
      <Box p={5} mt={"20px"}>
        <Heading textAlign={"center"}>Trending Activities</Heading>
      </Box>
      <Box
        height={"550px"}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack width={"80%"}>
          <Slider {...settings}>
            {lastActivities?.map((a) => {
              return (
                <Center p={8} py={12} key={a.id}>
                  <Box
                    role={"group"}
                    p={6}
                    maxW={"330px"}
                    w={"full"}
                    bg={useColorModeValue("#D1DFE3", "blackAlpha.400")}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={1}
                  >
                    <Box
                      rounded={"lg"}
                      mt={-12}
                      pos={"relative"}
                      height={"230px"}
                      _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        filter: "blur(15px)",
                        zIndex: -1,
                      }}
                      _groupHover={{
                        _after: {
                          filter: "blur(20px)",
                        },
                      }}
                    >
                      <Image
                        alt="image"
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={a.image ? a.image.toString() : defaultpic}
                      />

                      <Stack p={2} direction={"row"} justifyContent="center">
                        <Text fontWeight={200} fontSize={"lg"}>
                          {a.city.name}
                        </Text>
                      </Stack>
                    </Box>
                    <Stack pt={10} align={"center"}>
                      <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                      >
                        {a.name}
                      </Heading>
                      <Stack direction={"row"} align={"center"}>
                        <Text fontWeight={800} fontSize={"xl"}>
                          {`$${a.price}`}
                        </Text>
                        <Text textDecoration={"line-through"} color={"#F3B46F"}>
                          {`$${upPrice(a.price)}`}
                        </Text>
                      </Stack>
                      <NextLink href={`/activities/${a.id}`}>
                        <Button>+Info</Button>
                      </NextLink>
                    </Stack>
                  </Box>
                </Center>
              );
            })}
          </Slider>
        </Stack>
      </Box>
    </>
  );
};

export default MyCarousel;
