/* eslint-disable react-hooks/rules-of-hooks */
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Textarea,
  Select,
  Button,
  Grid,
  SimpleGrid,
  GridItem,
  Center,
  List,
  ListItem,
  ListIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Image,
  HStack,
  Text,
  useDisclosure,
  Box,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Trip, Activity, City, Errors } from "src/utils/interface";
import { ChangeEvent, FormEvent, MouseEvent, useRef } from "react";
import Layout from "src/components/layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import {
  formControl,
  controlCities,
  controlActivities,
  valActDateFormat,
} from "src/utils/validations";
// import sendMail from "src/utils/mail";
import { upPrice } from "src/components/Carousel";
import NextLink from "next/link";

interface Props {
  activities: Activity[];
  cities: City[];
  trips: Trip[];
}

const CreateTrip = ({ activities, cities, trips }: Props) => {
  const { user, error } = useUser();

  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );

  const url =
    "https://res.cloudinary.com/mauro4202214/image/upload/v1663527844/world-travelers/activitydefault_q9aljz.png";

  const initialState: Trip = {
    name: "",
    cities: [],
    initDate: "",
    endDate: "",
    description: "",
    activitiesName: [],
    planner: "",
    price: 0,
    image: null,
  };

  const toast = useToast();
  const router = useRouter();

  const [input, setInput] = useState(initialState);
  const [inputCities, setInputCities] = useState("");
  const [image, setImage] = useState<string | ArrayBuffer>();
  const [file, setFile] = useState<File>();
  const [nameFile, setNameFile] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [errorCities, setErrorCities] = useState<any>({});
  const [errorActivities, setErrorActivities] = useState<any>({});
  const hiddenFileInput = useRef(null);
  const [disable, setDisable] = useState(true);
  const [actDate, setActDate] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const arrWorkingDays = (availability: string[]) => {
    const arr: number[] = [];
    availability.forEach((d) => {
      if (d === "Monday") arr.push(1);
      if (d === "Tuesday") arr.push(2);
      if (d === "Wednesday") arr.push(3);
      if (d === "Thursday") arr.push(4);
      if (d === "Friday") arr.push(5);
      if (d === "Saturday") arr.push(6);
      if (d === "Sunday") arr.push(0);
    });
    return arr;
  };

  if (!isLoading && input.planner === "" && userDb?.data.id)
    setInput({ ...input, planner: userDb.data.id });

  const handleCities = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setInputCities(value);
  };

  const handleActDate = ({ target: { value } }: any) => {
    setActDate(value);
    setIsDisabled(false);
    const errActDate = valActDateFormat(value);
    if (errActDate) {
      setErrorActivities(errActDate);
    }
  };

  const handleCitiesSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputCities !== "") {
      setInput({ ...input, cities: [...input.cities, inputCities] });
      const errControl = formControl(input);
      const citiesControl = controlCities({
        ...input,
        cities: [...input.cities, inputCities],
      });
      const activitiesControl = controlActivities(input);
      if (
        JSON.stringify(errControl) === "{}" &&
        JSON.stringify(citiesControl) === "{}" &&
        JSON.stringify(activitiesControl) === "{}"
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
      setErrorCities(citiesControl);
      setErrorActivities(activitiesControl);
      setErrors(errControl);
      setInputCities("");
    }
  };

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({ ...input, [name]: value });
    const errControl = formControl({ ...input, [name]: value }, trips);
    const citiesControl = controlCities(input);
    const activitiesControl = controlActivities(input);
    if (
      JSON.stringify(errControl) === "{}" &&
      JSON.stringify(citiesControl) === "{}" &&
      JSON.stringify(activitiesControl) === "{}"
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setErrorCities(citiesControl);
    setErrorActivities(activitiesControl);
    setErrors(errControl);
  };

  const handleSelect = (act: Activity) => {
    const activity = act.name;
    const price = Number(act.price) + Number(input.price);
    const foundAct = input.activitiesName.find((act) => act.name === activity);
    if (!foundAct) {
      setInput({
        ...input,
        activitiesName: [
          ...input.activitiesName,
          { name: activity, actDate: actDate },
        ],
        price: price,
      });
    }
    const errControl = formControl(input);
    const citiesControl = controlCities(input);
    const activitiesControl = controlActivities({
      ...input,
      activitiesName: [
        ...input.activitiesName,
        { name: activity, actDate: actDate },
      ],
      price: price,
    });
    if (
      JSON.stringify(errControl) === "{}" &&
      JSON.stringify(citiesControl) === "{}" &&
      JSON.stringify(activitiesControl) === "{}"
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setErrorCities(citiesControl);
    setErrorActivities(activitiesControl);
    setErrors(errControl);
  };

  function previewFiles(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
      setInput({
        ...input,
        image: reader.result,
      });
    };
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files[0];
    setNameFile(file.name);
    setFile(file);
    previewFiles(file);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    hiddenFileInput.current.click();
  };

  const createTrip = async (trip: Trip) => {
    try {
      let resp = await axios.post("/api/trips", trip);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tripCreated = await createTrip(input);
    setInput(initialState);
    await axios
      .post("/api/mail", {
        mail: userDb.data.mail,
        subject: `Trip ${input.name} has been create successfuly thanks to use WORLD TRAVELERS`,
        message: `Your Trip: ${input.name} has been create successfuly thanks to use WORLD TRAVELERS`,
        html: {
          title: "Trip created successfuly",
          actionName: input.name,
          text: `Your Trip ${input.name} has been created`,
          url: `/trips/${tripCreated.id}`,
          urlMsg: "See your trip here",
        },
      })
      .catch((error) => console.log(error));
    router.push(`/trips/${tripCreated.id}`);
  };

  const handleDelete = (activity: String) => {
    const activityDelete = activities?.find((a) => a.name === activity);
    setInput({
      ...input,
      activitiesName: input.activitiesName?.filter((a) => a.name !== activity),
      price: input.price - activityDelete.price,
    });
    const errControl = formControl(input);
    const citiesControl = controlCities(input);
    const activitiesControl = controlActivities({
      ...input,
      activitiesName: input.activitiesName?.filter((a) => a.name !== activity),
      price: input.price - activityDelete.price,
    });
    if (
      JSON.stringify(errControl) === "{}" &&
      JSON.stringify(citiesControl) === "{}" &&
      JSON.stringify(activitiesControl) === "{}"
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setErrorCities(citiesControl);
    setErrorActivities(activitiesControl);
    setErrors(errControl);
  };

  const handleDeleteCity = (city: String) => {
    setInput({
      ...input,
      cities: input.cities?.filter((c) => c !== city),
    });
    const errControl = formControl(input);
    const citiesControl = controlCities({
      ...input,
      cities: input.cities?.filter((c) => c !== city),
    });
    const activitiesControl = controlActivities(input);
    if (
      JSON.stringify(errControl) === "{}" &&
      JSON.stringify(citiesControl) === "{}" &&
      JSON.stringify(activitiesControl) === "{}"
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setErrorCities(citiesControl);
    setErrorActivities(activitiesControl);
    setErrors(errControl);
  };

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayTwo />);

  return (
    <Layout>
      <Center marginTop="1%">
        <Heading color="primary">CREATE A NEW TRIP</Heading>
      </Center>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box h={"3xl"}>
          <FormControl>
            <Center>
              <Grid
                marginBottom={"10px"}
                h="80vh"
                w="80vw"
                templateRows="repeat(4, 1fr)"
                templateColumns="300px 1fr 1fr 1fr 1fr"
                gap={1}
              >
                <GridItem
                  borderRadius="2xl"
                  rowSpan={1}
                  colSpan={1}
                  bg="none"
                  alignContent="center"
                  alignSelf="center"
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Image
                      borderRadius={"2xl"}
                      src={`${image}`}
                      fallbackSrc="https://via.placeholder.com/150"
                      alt="img"
                      boxSize="200px"
                    />
                  </Box>
                  <Center>
                    <Button onClick={(event) => handleClick(event)} mt="20px">
                      Change Trip Image
                    </Button>
                    <Input
                      type="file"
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                      accept="image/png, image/jpeg, image/gif, image/jpg, image/jfif"
                      onChange={(e) => handleImage(e)}
                    />
                  </Center>
                </GridItem>
                <GridItem borderRadius="2xl" colSpan={4} bg="blackAlpha.100">
                  <FormLabel htmlFor="name" paddingLeft="2" mt={2}>
                    Name
                  </FormLabel>
                  <Input
                    name="name"
                    placeholder="Type a name for your trip..."
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.name && (
                    <Text m={1} color={"#F3B46F"}>
                      {errors.name}
                    </Text>
                  )}
                  <FormLabel paddingLeft="2" htmlFor="cities" mt={2}>
                    Cities
                  </FormLabel>
                  <HStack>
                    <Input
                      list="cities-choices"
                      name="cities"
                      value={inputCities}
                      marginRight={"20px"}
                      placeholder="Type the cities you are visiting..."
                      onChange={(e) => handleCities(e)}
                    />
                    <datalist id="cities-choices">
                      {cities
                        ?.filter((c) => !input.cities?.includes(c.name))
                        ?.map((c, index) => (
                          <option key={index}> {c.name} </option>
                        ))}
                    </datalist>
                    <Button
                      marginLeft={"10px"}
                      mt={1}
                      width={"80px"}
                      fontSize={"xs"}
                      onClick={(e) => handleCitiesSelect(e)}
                    >
                      ADD CITY
                    </Button>
                  </HStack>
                  <Center>
                    <HStack marginTop={"5px"}>
                      {input.cities.length != 0 ? (
                        input.cities.map((c, index) => {
                          return (
                            <Box marginLeft={"10px"} key={index}>
                              {c}
                              <Button
                                marginLeft="2"
                                onClick={() => handleDeleteCity(c)}
                                height={"25px"}
                                width={"5px"}
                              >
                                X
                              </Button>
                            </Box>
                          );
                        })
                      ) : (
                        <Box height={"40px"}></Box>
                      )}
                    </HStack>
                    {errorCities.cities && (
                      <Text m={1} color={"#F3B46F"}>
                        {errorCities.cities}
                      </Text>
                    )}
                  </Center>

                  <FormLabel paddingLeft="2" htmlFor="initialDate" mt={2}>
                    Initial date
                  </FormLabel>
                  <Input
                    name="initDate"
                    placeholder="Select the initial date of the trip..."
                    size="md"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.initDate && (
                    <Text m={1} color={"#F3B46F"}>
                      {errors.initDate}
                    </Text>
                  )}

                  <FormLabel paddingLeft="2" htmlFor="endDate" mt={2}>
                    End date
                  </FormLabel>
                  <Input
                    min={new Date().toISOString().split("T")[0]}
                    name="endDate"
                    placeholder="Select the ending date of the trip..."
                    size="md"
                    type="date"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.endDate && (
                    <Text m={1} color={"#F3B46F"}>
                      {errors.endDate}
                    </Text>
                  )}
                </GridItem>

                <GridItem borderRadius="2xl" colSpan={5} bg="blackAlpha.100">
                  <FormLabel
                    paddingLeft="2"
                    htmlFor="description"
                    mt={2}
                    mb="8px"
                  >
                    Description
                  </FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Type a description of your trip..."
                    size="sm"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.description && (
                    <Text m={1} color={"#F3B46F"}>
                      {errors.description}
                    </Text>
                  )}
                </GridItem>
                <GridItem borderRadius="2xl" colSpan={5}>
                  <FormLabel paddingLeft="2" htmlFor="activitiesName" mt={2}>
                    Associated activities
                  </FormLabel>

                  <Button
                    ml="4"
                    disabled={input.initDate === "" || input.endDate === ""}
                    onClick={() => {
                      setOverlay(<OverlayTwo />);
                      onOpen();
                    }}
                  >
                    Click to open the Associated Activities
                  </Button>
                  <Modal
                    size={"5xl"}
                    isCentered
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    {overlay}
                    <ModalContent>
                      <ModalHeader>Select the activities</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Box display={"flex"} flexDirection={"row"}>
                          <Center>
                            <SimpleGrid columns={7} spacing={1}>
                              {activities?.map((act) => {
                                if (input.cities.includes(act.city.name)) {
                                  return (
                                    <Box
                                      key={act.id}
                                      role={"group"}
                                      p={2}
                                      width={"100%"}
                                      bg={useColorModeValue(
                                        "white",
                                        "gray.800"
                                      )}
                                      boxShadow={"2xl"}
                                      rounded={"lg"}
                                      zIndex={1}
                                      margin={2}
                                    >
                                      <Center>
                                        <Image
                                          rounded={"md"}
                                          height={"80px"}
                                          width={"80px"}
                                          objectFit={"cover"}
                                          src={
                                            act?.image != null
                                              ? act?.image.toString()
                                              : url
                                          }
                                          alt={act?.name}
                                        />
                                      </Center>

                                      <Stack
                                        pt={1}
                                        display={"flex"}
                                        alignItems={"center"}
                                      >
                                        <Text
                                          noOfLines={1}
                                          textAlign={"center"}
                                          fontSize={"md"}
                                          fontFamily={"body"}
                                          fontWeight={70}
                                        >
                                          {act?.name}
                                        </Text>
                                        <Box
                                          display={"flex"}
                                          flexDirection={"row"}
                                          alignItems={"center"}
                                        >
                                          <Text
                                            p={1}
                                            fontWeight={70}
                                            fontSize={"md"}
                                          >
                                            {`$${act?.price}`}
                                          </Text>
                                          <Text
                                            textDecoration={"line-through"}
                                            color={"#F3B46F"}
                                          >
                                            {`$${upPrice(act?.price)}`}
                                          </Text>
                                        </Box>
                                        <GridItem>
                                          <FormLabel fontSize={"xs"}>
                                            Choose a date
                                          </FormLabel>
                                          {/* <>
                                            {console.log(
                                              arrWorkingDays(act.availability)
                                            )}
                                          </> */}
                                          <Input
                                            size={"xs"}
                                            type={"date"}
                                            min={input.initDate}
                                            max={input.endDate}
                                            onChange={(e) => handleActDate(e)}
                                          />
                                        </GridItem>
                                        <GridItem>
                                          {errorActivities && (
                                            <Text m={1} color={"#F3B46F"}>
                                              {errorActivities.date}
                                            </Text>
                                          )}
                                        </GridItem>
                                        <Box
                                          display={"flex"}
                                          flexDirection={"row"}
                                          alignItems={"center"}
                                          justifyContent={"space-between"}
                                        >
                                          <NextLink
                                            href={`/activities/${act.id}`}
                                          >
                                            <Button margin={1} size={"xs"}>
                                              +Info
                                            </Button>
                                          </NextLink>
                                          <Button
                                            disabled={isDisabled}
                                            margin={1}
                                            onClick={() => {
                                              handleSelect(act);
                                              setIsDisabled(true);
                                            }}
                                            size={"xs"}
                                          >
                                            Add
                                          </Button>
                                        </Box>
                                      </Stack>
                                    </Box>
                                  );
                                }
                              })}
                            </SimpleGrid>
                          </Center>
                        </Box>
                        <Center>
                          <SimpleGrid
                            marginTop={"10px"}
                            marginBottom={"5px"}
                            columns={7}
                            spacing={3}
                          >
                            {input.activitiesName?.map((a, index) => {
                              return (
                                <>
                                  <GridItem key={index}>
                                    {a.name}
                                    <Button
                                      marginLeft="2"
                                      onClick={() => handleDelete(a.name)}
                                      height={"25px"}
                                      width={"5px"}
                                    >
                                      X
                                    </Button>
                                  </GridItem>
                                </>
                              );
                            })}
                          </SimpleGrid>
                        </Center>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </GridItem>
                <GridItem colSpan={5}>
                  {errorActivities.activitiesName && (
                    <Text m={1} color={"#F3B46F"}>
                      {errorActivities.activitiesName}
                    </Text>
                  )}
                </GridItem>
              </Grid>
            </Center>

            <Center marginTop={"28"} marginBottom="2%">
              <Button
                mt={"20px"}
                bg="highlight"
                color="primary"
                _hover={{ bg: "danger" }}
                type="submit"
                disabled={disable}
                onClick={() =>
                  toast({
                    title: "Trip Created",
                    description: "We've created your trip",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  })
                }
              >
                CREATE AND POST
              </Button>
            </Center>
          </FormControl>
        </Box>
      </form>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const response = await axios("/activities");
  const activities = await response.data;
  const res = await axios("/cities");
  const cities = await res.data;
  const data = await axios("/trips");
  const trips = await data.data;
  return {
    props: {
      activities: activities,
      cities: cities,
      trips: trips,
    },
  };
};

export default CreateTrip;
