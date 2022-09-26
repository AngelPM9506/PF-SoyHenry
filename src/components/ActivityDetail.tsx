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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect } from "react";
import Loading from "src/components/Loading";
import Reviews from "src/components/Reviews";
export default function ActivityDetail({ data, isLoading, error }: any) {
  let { activity: { activitiesOnTrips } } = data;
  useEffect(() => {
    console.log(data);
  });
  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 12 }}
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
            h={{ base: "100%", sm: "400px", lg: "500px" }}
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
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
                width={"100%"}
                overflow={"hidden"}
              >
                {data.activity.description}
              </Text>
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
          <Stack alignItems={"center"} justifyContent={"space-between"}>
            <NextLink href={"/activities"}>
              <Button
                rounded={"lg"}
                w={"50%"}
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
                Go back to All Activities
              </Button>
            </NextLink>
          </Stack>
        </Stack>
      </SimpleGrid>
      {/* Parte para los trips donde esta esta actividad */}
      <section>
        <Tabs isFitted variant={'line'} >
          <TabList mb={'1em'}>
            {activitiesOnTrips && activitiesOnTrips.map((relation: any, i: number) => {
              return (<Tab key={i} >{relation.trip.name}</Tab>);
            })}
          </TabList>
          <TabPanels>
            {activitiesOnTrips && activitiesOnTrips.map((relation: any, i: number) => {
              let { trip: { name, image, description, initDate, endDate, id, price } } = relation;
              return (
                <TabPanel key={relation.trip} width={'max-content'} margin={'10px auto'} padding={'0 20px'}>
                  <SimpleGrid
                    gridTemplateColumns={'40% 60%'}
                    spacing={{ base: 5, md: 4 }}>
                    <Flex justifyContent={'center'}>
                      <Image
                        alt={"Trip image"}
                        src={image}
                        boxSize={'200px'}
                        borderRadius={'50%'}
                      />
                    </Flex>
                    <Stack width={'max-content'}>
                      <Heading fontWeight={900} fontSize={'4xl'} color={'#F3B46F'}>{name}</Heading>
                      <Text>Price of Trip:
                        <Text color={'#F3B46F'} fontWeight={'bold'} as={'span'}> ${price}</Text>
                      </Text>
                      <Text>Duration:
                        <Text color={'#F3B46F'} fontWeight={'bold'} as={'span'}> {initDate.split('T')[0]} </Text>
                        -
                        <Text color={'#F3B46F'} fontWeight={'bold'} as={'span'}> {endDate.split('T')[0]} </Text>
                      </Text>
                      <Stack display={'flex'} flexDirection={'row'} gap={'10px'} alignItems={'center'}>
                        <Text>Description:
                          <Text as={'span'}> {description}</Text>
                        </Text>
                      </Stack>
                      <Stack display={'flex'} flexDirection={'row-reverse'}>
                        <NextLink href={`/trips/${id}`}>
                          <Button width={'max-content'} color={'#293541'} bg={'#02b1b1'}>See more</Button>
                        </NextLink>
                      </Stack>
                    </Stack>
                  </SimpleGrid>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </section>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Reviews feedbacks={data.activity.feedbacks} id={data.id} />
      </Box>
    </Container >
  );
}
