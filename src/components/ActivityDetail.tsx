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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import Loading from "src/components/Loading";
import Reviews from "src/components/Reviews";
import { TripDescription } from "./TripDescription";

export default function ActivityDetail({
  data,
  isLoading,
  error,
  mutatesubmit,
  mutateedit,
  mutatedelete,
}: any) {
  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  const [feedBacks, setFeedBacks] = useState(data.activity.feedbacks);

  const tripscards = data.activity.activitiesOnTrips.filter(
    (t: any) => t.trip.active === true
  );
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        mt={"24"}
        mb={"10px"}
        maxHeight={"max-content"}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"Trip image"}
            src={
              data.activity.image
                ? data.activity.image
                : "https://drive.google.com/uc?id=1YZhzZFB0nRQuLLzmFVq13upFeZQo5CLd"
            }
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "80%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack
          alignItems={"left"}
          justifyContent={"space-between"}
          spacing={{ base: 6, md: 10 }}
        >
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              color={useColorModeValue("#F3B46F", "#F3B46F")}
            >
              {data.activity.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={"bold"}
              marginTop={"20px"}
              fontSize={"2xl"}
            >
              $ {data.activity.price}
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
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("#F3B46F", "#F3B46F")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Description
              </Text>
              <TripDescription>{data.activity.description}</TripDescription>
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
              <Box display={"flex"}>
                <List gap={10} display={"inline-flex"}>
                  <ListItem>
                    City:
                    <Text
                      color={useColorModeValue("gray.500", "gray.400")}
                      fontSize={"2xl"}
                      fontWeight={"300"}
                    >
                      {data.activity.city.name}
                    </Text>
                  </ListItem>
                  <ListItem>
                    Country:
                    <Text
                      color={useColorModeValue("gray.500", "gray.400")}
                      fontSize={"2xl"}
                      fontWeight={"300"}
                    >
                      {data.activity.city.country}
                    </Text>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
      {data.activity.activitiesOnTrips.length > 0 && (
        <Box
          display={"flex"}
          flexDir={"column"}
          mt={"20px"}
          mb={"30px"}
          bg={"RGBA(209,223,227,0.25)"}
          rounded={"xl"}
          padding={"10px"}
          alignItems={"center"}
        >
          <Text
            width={"90%"}
            textAlign={"left"}
            fontWeight={"400"}
            fontSize={{ base: "2xl", sm: "2xl", lg: "3xl" }}
            mb={"20px"}
            color={useColorModeValue("#F3B46F", "#F3B46F")}
          >
            Trips that includes this activity:
          </Text>
          <Tabs isFitted variant={"line"} width={"90%"}>
            <TabList mb={"1em"}>
              {tripscards &&
                tripscards.map((relation: any, i: number) => {
                  return <Tab key={i}>{relation.trip.name}</Tab>;
                })}
            </TabList>
            <TabPanels width={"90%"}>
              {data.activity.activitiesOnTrips &&
                data.activity.activitiesOnTrips.map(
                  (relation: any, i: number) => {
                    let {
                      trip: { name, image, initDate, endDate, id, price },
                    } = relation;
                    return (
                      <TabPanel
                        key={relation.trip}
                        width={"max-content"}
                        margin={"20px auto"}
                        padding={"0 20px"}
                      >
                        <Stack direction={{ base: "column", md: "row" }}>
                          <Flex justifyContent={"center"}>
                            <NextLink href={`/trips/${id}`}>
                              <Image
                                alt={"Trip image"}
                                src={image}
                                boxSize={{ base: "150px", md: "150px" }}
                                borderRadius={"50%"}
                              />
                            </NextLink>
                          </Flex>
                          <Stack width={"max-content"}>
                            <Heading
                              fontWeight={600}
                              fontSize={"4xl"}
                              color={"#F3B46F"}
                              textAlign={"center"}
                            >
                              {name}
                            </Heading>
                            <Text>
                              Price of Trip:
                              <Text
                                color={"#F3B46F"}
                                fontWeight={"bold"}
                                as={"span"}
                              >
                                {" "}
                                ${price}
                              </Text>
                            </Text>
                            <Text>
                              Duration:
                              <Text
                                color={"#F3B46F"}
                                fontWeight={"bold"}
                                as={"span"}
                              >
                                {" "}
                                {initDate.split("T")[0]}{" "}
                              </Text>
                              -
                              <Text
                                color={"#F3B46F"}
                                fontWeight={"bold"}
                                as={"span"}
                              >
                                {" "}
                                {endDate.split("T")[0]}{" "}
                              </Text>
                            </Text>
                          </Stack>
                        </Stack>
                      </TabPanel>
                    );
                  }
                )}
            </TabPanels>
          </Tabs>
        </Box>
      )}
      <Box
        mt={"0px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Reviews
          feedbacks={feedBacks}
          id={data.id}
          mutatesubmit={mutatesubmit}
          mutateedit={mutateedit}
          mutatedelete={mutatedelete}
        />
      </Box>
    </Container>
  );
}
