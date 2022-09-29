/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Divider,
  AspectRatio,
} from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import { City, User } from "src/utils/interface";
import { Key, useEffect } from "react";
import { QueryFunctionContext, useQuery } from "react-query";
import { TimeLine } from "./TimeLineTrip";
import { TripDescription } from "./TripDescription";
import { AvatarCarousel } from "./carouselAvatars";
import LoadingWithoutLayout from "src/components/LoadingWithoutLayout";
import MapView from "src/components/DynamicMap";
import { useUser } from "@auth0/nextjs-auth0";
import { getOrCreateUser } from "src/utils/User";
import { useRouter } from "next/router";

interface Props {
  id: QueryFunctionContext<string[], any>;
  cities: City[];
}
interface Users {
  users: User[];
}

export default function TripDetail({ data, isLoading, error }: any) {
  const { user } = useUser();
  const router = useRouter();

  const { data: userDb } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );

  const location =
    "https://drive.google.com/uc?id=1w5WnrjO9EbDHxa8B7h9oedYuk0SgQWBL";
  const iday = data.initDate.slice(0, 10).split("-").reverse().join("/");
  const eday = data.endDate.slice(0, 10).split("-").reverse().join("/");

  if (isLoading || !userDb || !user) return <LoadingWithoutLayout />;
  if (data.plannerId !== userDb.data.id && data.active === false)
    router.push("/404");
  if (error) return <div>{error.message}</div>;
  return (
    <Container maxW={"7xl"}>
      <VStack
        bg={useColorModeValue("#D1DFE3", "#4b647c")}
        boxShadow={"2xl"}
        rounded={"2xl"}
        margin={"20px"}
        mt={"40px"}
        height={"max-content"}
      >
        <Heading
          mt={"10px"}
          mb={"10px"}
          lineHeight={1.1}
          fontWeight={600}
          color={useColorModeValue("#293541", "white")}
          fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            height={"40px"}
            width={"40px"}
            marginRight={"10px"}
            src={location}
            alt={"icon"}
          />
          {data.name}
        </Heading>
        <Divider
          orientation="horizontal"
          width={"100%"}
          borderWidth={"1.5px"}
          color={"#293541"}
        />
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          height={"min-content"}
          w={"90%"}
          mt={"10px"}
        >
          <Flex>
            <Stack
              width={"100%"}
              paddingRight={"10px"}
              paddingLeft={"10px"}
              alignItems={"top"}
              justifyContent={"flex-start"}
            >
              <AspectRatio w="100%" h="100%">
                {data.citiesOnTrips[0].city.latitude &&
                data.citiesOnTrips[0].city.latitude ? (
                  <MapView
                    cities={data.citiesOnTrips.map((c: any) => c.city)}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </AspectRatio>
            </Stack>
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Text
                color={useColorModeValue("gray.900", "#02b1b1")}
                fontWeight={"bold"}
                marginTop={"20px"}
                fontSize={"2xl"}
              >
                Price: $ {data.price}
              </Text>
            </Box>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack alignItems={"left"} spacing={{ base: 4, sm: 6 }}>
                <TripDescription>{data.description}</TripDescription>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("#F3B46F", "#F3B46F")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Details
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Initial date: {iday}</ListItem>
                    <ListItem>Ending date: {eday}</ListItem>
                    <ListItem>
                      Cities:
                      <List>
                        {data.citiesOnTrips.length != 0 ? (
                          data.citiesOnTrips.map((c: any, index: Key) => (
                            <ListItem key={index}>
                              <ListIcon as={MinusIcon} color="#F3B46F" />
                              {c.city.name}
                            </ListItem>
                          ))
                        ) : (
                          <ListItem>
                            <ListIcon as={MinusIcon} color="#F3B46F" /> No
                            cities asocieted to this trip
                          </ListItem>
                        )}
                      </List>
                    </ListItem>
                  </List>
                </SimpleGrid>
              </Box>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            ></Stack>
          </Stack>
        </SimpleGrid>
        <Box
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          marginLeft={"10px"}
        >
          <Box width={"100%"} mt={"10px"} mb={"10px"}>
            {/* <Divider
              orientation="horizontal"
              width={"80%"}
              borderWidth={"1.5px"}
              color={"#293541"}
            /> */}
            <Box>
              <AvatarCarousel props={data.tripOnUser} />
            </Box>
            {/* <Divider
              orientation="horizontal"
              width={"80%"}
              borderWidth={"1.5px"}
              color={"#293541"}
            /> */}
          </Box>

          <TimeLine data={data} />
        </Box>
      </VStack>
    </Container>
  );
}

{
  /* <Text
			  fontSize={{ base: "16px", lg: "18px" }}
			  color={useColorModeValue("#F3B46F", "#F3B46F")}
			  fontWeight={"500"}
			  textTransform={"uppercase"}
			  mb={"4"}
			  ml={"20px"}
			  pb={"3px"}
			>
			  Activities
			</Text> */
}
{
  /* <SimpleGrid ml={"20px"} mr={"20px"} columns={5} spacing={2}>
			  {data.activitiesOnTrips.length != 0 ? (
				data.activitiesOnTrips.map((activity: any, i: number) => (
				  <MiniCardAct
				  Key={i}
					activity={activity.activity}
					cities={data.citiesOnTrips}
				  />
				))
			  ) : (
				<Text> No Activities found</Text>
			  )}
			</SimpleGrid> */
}
// </Box>
{
  /* <Stack width={"100vw"} align={"center"}>
			<StackDivider
			  borderColor={useColorModeValue("gray.200", "gray.600")}
			/>
			<Box
			  bgColor={"#02b1b1"}
			  height={"60px"}
			  width={"230px"}
			  rounded={"lg"}
			  padding={"8px"}
			  boxShadow={"0px 5px   white"}
			>
			  <Text textAlign={"center"} fontWeight={"bold"} fontSize={"2xl"}>
				Trip's itinerary
			  </Text>
			</Box>
			<TimeLine />
			<Stack alignItems={"center"} justifyContent={"center"}>
			  <Button
				rounded={"lg"}
				w={"100%"}
				pb={"2px"}
				mb={"10px"}
				mt={4}
				size={"lg"}
				py={"7"}
				bg={useColorModeValue("gray.900", "gray.50")}
				color={useColorModeValue("white", "gray.900")}
				textTransform={"uppercase"}
				_hover={{
				  transform: "translateY(2px)",
				  boxShadow: "lg",
				}}
			  >
				Pay and Join the trip!
			  </Button>
			</Stack>
		  </Stack> */
}
//       </VStack>
//     </Container>
//   );
// }
