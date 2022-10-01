/* eslint-disable react-hooks/rules-of-hooks */
import {
  Badge,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { Trip } from "src/utils/interface";
import { UserData } from "./UserProfile";
import AvatarCarousel from "./AvatarCarousel";
import AvaCarousel from "./AvaCarousel";

interface Props {
  userDetail: UserData;
  trips: Trip[];
}

export const UserDetail = ({ userDetail, trips }: Props) => {
  const user = userDetail;

  const logo: string =
    "https://drive.google.com/file/d/1ti7xmFJWKOqUUNcuV2TEpMCb56NAaMU3/view";
  const tikTok: string =
    "https://pngfolio.com/images/all_img/copy/1631443365tiktok-icon.png";
  const instagram: string =
    "https://www.adverthia.com/wp-content/uploads/2020/02/instagram-logo-png-transparent-background-1024x1024-1.png";
  const facebook: string =
    "https://i0.wp.com/www.dpabogados.com/wp-content/uploads/2016/09/facebook-logo-png-transparent-background.png?fit=1600%2C1600&ssl=1";

  const defaulHashtags: string[] = ["trips", "traveling", "friends"];
  const arrInterests: string[] = user.keyWords
    ? user.keyWords.split(",")
    : defaulHashtags;

  const myCreatedActiveTrips: Trip[] = trips?.filter(
    (trip) => trip.planner.id === user?.id && trip.active === true
  );

  const tripsTravJoined: Trip[] = trips
    ?.map((trip) => trip.tripOnUser)
    .flat()
    .map((trip) => trip.trip)
    .filter((trip) => trip.plannerId !== user?.id);

  return (
    <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Center pt={6}>
        <Heading>Meet the traveler</Heading>
      </Center>
      <Center>
        <Stack
          direction={{ base: "column", md: "column", lg: "row" }}
          spacing={4}
          p={6}
          width={"100vw"}
          height={{ base: "auto", md: "auto", lg: "auto" }}
          justifyContent={"center"}
        >
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Stack
              borderWidth="1px"
              borderRadius="lg"
              w={{ sm: "100%", md: "540px" }}
              height={{ sm: "100%", md: "100%" }}
              direction={{ base: "column", md: "row" }}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              padding={4}
            >
              <Flex justifyContent={"center"} flex={1}>
                <Image
                  alt="image user"
                  borderRadius={"xl"}
                  objectFit="cover"
                  boxSize={{ sm: "50%", md: "100%", lg: "100%" }}
                  src={user?.avatar ? user.avatar.toString() : logo}
                />
              </Flex>
              <Stack
                flex={1}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={1}
                pt={2}
              >
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {user && user?.name}
                </Heading>
                <Text
                  textAlign={"center"}
                  color={useColorModeValue("gray.700", "gray.400")}
                  px={3}
                >
                  {user && user?.description}
                </Text>
                <Stack
                  align={"center"}
                  justify={"center"}
                  direction={"row"}
                  mt={6}
                >
                  {arrInterests?.map((int, index) => {
                    return (
                      <Badge
                        key={index}
                        px={2}
                        py={1}
                        bg={useColorModeValue("gray.50", "gray.800")}
                        fontWeight={"400"}
                      >
                        {`#${int.toLowerCase()}`}
                      </Badge>
                    );
                  })}
                </Stack>

                <Center>
                  <Stack
                    width={"100%"}
                    mt={"1rem"}
                    direction={"row"}
                    padding={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    {user?.urlTikTok && (
                      <a href={user.urlTikTok} target="_blank" rel="noreferrer">
                        <Image
                          boxSize="40px"
                          objectFit="cover"
                          src={tikTok}
                          alt="tikTok-icon"
                        />
                      </a>
                    )}
                    {user?.urlInstagram && (
                      <a
                        href={user?.urlInstagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          boxSize="40px"
                          objectFit="cover"
                          src={instagram}
                          alt="instagram-icon"
                        />
                      </a>
                    )}
                    {user?.urlFaceBook && (
                      <a
                        href={user?.urlFaceBook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          boxSize="40px"
                          objectFit="cover"
                          src={facebook}
                          alt="facebook-icon"
                        />
                      </a>
                    )}
                  </Stack>
                </Center>
              </Stack>
            </Stack>
          </Box>
          <Box display={"flex"} justifyContent={"center"} flexDir={"column"}>
            <Text
              textAlign={"center"}
              color={useColorModeValue("#293541", "#F3B46F")}
              fontSize={"xl"}
              fontFamily={"body"}
              p={2}
            >
              Trips created by this traveler
            </Text>
            <Box display={"flex"} justifyContent={"center"}>
              <AvatarCarousel trips={myCreatedActiveTrips} />
            </Box>
            <Text
              textAlign={"center"}
              color={useColorModeValue("#293541", "#F3B46F")}
              fontSize={"xl"}
              fontFamily={"body"}
              p={2}
            >
              Trips traveler joined
            </Text>
            <Box display={"flex"} justifyContent={"center"}>
              <AvaCarousel trips={tripsTravJoined} />
            </Box>
          </Box>
        </Stack>
      </Center>
    </Stack>
  );
};

export default UserDetail;
