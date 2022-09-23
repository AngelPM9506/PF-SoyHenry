import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Trip } from "src/utils/interface";
import {
  Box,
  Heading,
  Image,
  Text,
  Center,
  useColorModeValue,
  Stack,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "src/utils/TripAvatarCarouselSettings";
import NextLink from "next/link";

interface Props {
  myCreatedActiveTrips: Trip[];
}

const TripAvatarCarousel: any = ({ myCreatedActiveTrips }: Props) => {
  const logo: string =
    "https://drive.google.com/file/d/1ti7xmFJWKOqUUNcuV2TEpMCb56NAaMU3/view";
  return (
    <Box
      height={{ sm: "100px", md: "10rem" }}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack width={"25%"}>
        <Slider {...settings}>
          {myCreatedActiveTrips?.map((trip) => {
            return (
              <Box key={trip.id} p={2} rounded={"full"}>
                <Box
                  rounded={"full"}
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
                  <NextLink href={`/trips/${trip.id}`}>
                    <Center>
                      <Avatar
                        cursor={"pointer"}
                        name={trip.name}
                        rounded={"full"}
                        height={"70%"}
                        width={"70%"}
                        size={"lg"}
                        objectFit={"cover"}
                        src={trip.image ? trip.image.toString() : logo}
                      />
                    </Center>
                  </NextLink>
                  <Text textAlign={"center"} inlineSize={"xs"} fontSize={"xs"}>
                    {trip.name}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Slider>
      </Stack>
    </Box>
  );
};

export default TripAvatarCarousel;
