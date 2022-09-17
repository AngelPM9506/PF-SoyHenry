import {
  Box,
  chakra,
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
  VisuallyHidden,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { MinusIcon } from "@chakra-ui/icons";
import MiniCardAct from "./miniCardActivity";
import { City } from "src/utils/interface";
import { Key } from "react";
import { QueryFunctionContext, useQuery } from "react-query";
import { Trip } from "src/interfaces/Trip";

interface Props {
  id: QueryFunctionContext<string[], any>;
  cities: City[];
}

export default function TripDetail({ data, isLoading, error }: any) {
  const iday = data.initDate.slice(0, 10).split("").reverse().join("");
  const eday = data.endDate.slice(0, 10).split("").reverse().join("");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"Trip image"}
            src={
              data.image
                ? data.image
                : "https://drive.google.com/uc?id=1YZhzZFB0nRQuLLzmFVq13upFeZQo5CLd"
            }
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {data.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={"bold"}
              marginTop={"20px"}
              fontSize={"2xl"}
            >
              $ {data.price}
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
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {data.description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Details
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Initial date: {iday}</ListItem>
                  <ListItem>Ending date:{eday}</ListItem>
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
                          <ListIcon as={MinusIcon} color="#F3B46F" /> No cities
                          asocieted to this trip
                        </ListItem>
                      )}
                    </List>
                  </ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Activities
              </Text>
              <SimpleGrid columns={3} spacing={2}>
                {data.activitiesOnTrips.length != 0 ? (
                  data.activitiesOnTrips.map((activity: any) => (
                    <MiniCardAct
                      activity={activity.activity}
                      cities={data.citiesOnTrips}
                    />
                  ))
                ) : (
                  <Text> No Activities found</Text>
                )}
              </SimpleGrid>
            </Box>
          </Stack>
          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
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

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
          ></Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
