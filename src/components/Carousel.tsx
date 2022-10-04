/* eslint-disable react-hooks/rules-of-hooks */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Trip, Activity, Feedback } from "src/utils/interface";
import {
  Box,
  Heading,
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
import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import Image from "next/image";
import { chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  trips: Trip[];
  activities: Activity[];
}

const Img = chakra(Image);

const MyCarousel = ({ trips, activities }: Props) => {
  const router = useRouter();

  const defaultpic: string =
    "https://res.cloudinary.com/mauro4202214/image/upload/v1663331567/world-travelers/defaultimagetrip_j90ewc.png";

  const activeTrips = trips.filter((trip) => trip.active === true);

  const lastTrips = activeTrips?.slice(-12);
  const lastActivities = activities?.slice(-12);

  const [tripsCarousel, setTripsCarousel] = useState<Trip[]>(lastTrips);
  const [activitiesCarousel, setActivitiesCarousel] =
    useState<Activity[]>(lastActivities);

  const averageRating = (feedbacks: Feedback[]) => {
    let total = 0;
    if (feedbacks.length === 0) return 0;
    feedbacks.forEach((feedback) => {
      total += feedback.rating;
    });
    return Math.ceil(total / feedbacks.length);
  };

  if (tripsCarousel.length !== 0 && activitiesCarousel.length !== 0) {
    return (
      <>
        <Box p={5} mt={"20px"}>
          <Heading textAlign={"center"} id="toptrips">
            Trending Trips
          </Heading>
        </Box>
        <Box
          width={"95vw"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack id="masinfo" width={"80%"}>
            <Slider {...settings}>
              {tripsCarousel.map((t, index) => {
                return (
                  <Center p={8} py={12} key={t.id}>
                    <Box
                      role={"group"}
                      p={6}
                      minWidth={"250px"}
                      minHeight={"380px"}
                      w={"full"}
                      bg={useColorModeValue(
                        "RGBA(75,100,124,0.41)",
                        "RGBA(75,100,124,0.41)"
                      )}
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
                        <Img
                          alt="Trip Image"
                          rounded={"lg"}
                          layout="fill"
                          height={230}
                          width={282}
                          objectFit={"cover"}
                          src={t.image ? t.image.toString() : defaultpic}
                        />
                      </Box>
                      <Stack pt={4} align={"center"}>
                        <Heading
                          textTransform={"capitalize"}
                          noOfLines={1}
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
                        </Stack>
                      </Stack>
                      <Wrap justify={"center"}>
                        <Box display={"flex"} flexDirection={"column"}>
                          <Text fontSize={"sm"}>Planner</Text>
                          <WrapItem>
                            <NextLink href={`/user/${t.planner.id}`}>
                              <Avatar
                                cursor={"pointer"}
                                name={t.planner.name}
                                src={t.planner ? t.planner.avatar : defaultpic}
                              />
                            </NextLink>
                            <Link href={`trips/${t.id}`} passHref>
                              <a>
                                <Button
                                  marginLeft={"50px"}
                                  bg={useColorModeValue("#D1DFE3", "#293541")}
                                  color={useColorModeValue("#293541", "white")}
                                  rounded={"md"}
                                  _hover={{
                                    transform: "translateY(-2px)",
                                    boxShadow: "lg",
                                    bg: useColorModeValue("#293541", "#D1DFE3"),
                                    color: useColorModeValue(
                                      "white",
                                      "#293541"
                                    ),
                                  }}
                                >
                                  +Info
                                </Button>
                              </a>
                            </Link>
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
          <Heading textAlign={"center"} id="topAct">
            Trending Activities
          </Heading>
        </Box>
        <Box
          paddingBottom={"30px"}
          width={"95vw"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack width={"80%"}>
            <Slider {...settings}>
              {activitiesCarousel.map((a) => {
                return (
                  <Center p={8} py={12} key={a.id}>
                    <Box
                      role={"group"}
                      p={6}
                      minW={"250px"}
                      minH={"435px"}
                      w={"full"}
                      bg={useColorModeValue(
                        "RGBA(75,100,124,0.41)",
                        "RGBA(75,100,124,0.41)"
                      )}
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
                        <Img
                          alt="Trip Image"
                          rounded={"lg"}
                          layout="fill"
                          height={230}
                          width={282}
                          objectFit={"cover"}
                          src={a.image ? a.image.toString() : defaultpic}
                        />
                      </Box>
                      <Stack pt={5} align={"center"}>
                        <Heading
                          textTransform={"capitalize"}
                          noOfLines={1}
                          fontSize={"2xl"}
                          fontFamily={"body"}
                          fontWeight={500}
                        >
                          {a.name}
                        </Heading>
                        <Text fontWeight={200} fontSize={"lg"}>
                          {a.city.name}
                        </Text>
                        <Stack direction={"row"} align={"center"}>
                          <Text fontWeight={800} fontSize={"xl"}>
                            {`$${a.price}`}
                          </Text>
                        </Stack>
                        <Stack direction={"row"} align={"center"}>
                          <Box display={"flex"} flexDirection={"column"}>
                            {a.feedbacks.length > 0 && (
                              <StarRatings
                                rating={averageRating(a.feedbacks)}
                                starRatedColor={useColorModeValue(
                                  "#293541",
                                  "#F3B46F"
                                )}
                                numberOfStars={5}
                                starDimension={"20px"}
                                starSpacing={"3px"}
                                name="rating"
                              />
                            )}
                            <Link href={`/activities/${a.id}`}>
                              <a>
                                <Button
                                  marginTop={"10px"}
                                  bg={useColorModeValue("#D1DFE3", "#293541")}
                                  color={useColorModeValue("#293541", "white")}
                                  rounded={"md"}
                                  _hover={{
                                    transform: "translateY(-2px)",
                                    boxShadow: "lg",
                                    bg: useColorModeValue("#293541", "#D1DFE3"),
                                    color: useColorModeValue(
                                      "white",
                                      "#293541"
                                    ),
                                  }}
                                  id="masinfoact"
                                >
                                  +Info
                                </Button>
                              </a>
                            </Link>
                          </Box>
                        </Stack>
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
  }
};

export default MyCarousel;
