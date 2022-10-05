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
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { SetStateAction, useState } from "react";
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
import NextLink from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getDay from "date-fns/getDay";
import { chakra } from "@chakra-ui/react";
import { BannedAlert } from "src/components/Banned";
import Loading from "src/components/Loading";
import { cursorTo } from "readline";
import { Select as ReactSelect } from "chakra-react-select";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";

interface Props {
  activities: Activity[];
  cities: City[];
  trips: Trip[];
}

const MyDataPicker = chakra(DatePicker);

const CreateTrip = ({ activities, cities, trips }: Props) => {
  const toast = useToast();
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  cities = cities.filter((c) => c.activity.length > 0);
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );
  let options: any = [];
  cities.map((c) => {
    let selectObject = { value: c.name, label: c.name, name: c.name };
    options.push(selectObject);
  });
  const url =
    "https://res.cloudinary.com/mauro4202214/image/upload/v1663527844/world-travelers/activitydefault_q9aljz.png";

  const initialState: Trip = {
    name: "",
    cities: [],
    initDate: "",
    endDate: "",
    description: "",
    activitiesName: [],
    planner: {},
    price: 0,
    image: null,
  };

  const [input, setInput] = useState(initialState);
  let citieFormated = input.cities.map((c) => ({ value: c, label: c }));
  // const [inputCities, setInputCities] = useState("");
  const [inputCities, setinputCities] = useState(citieFormated);
  const [image, setImage] = useState<string | ArrayBuffer>();
  const [file, setFile] = useState<File>();
  const [nameFile, setNameFile] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [errorCities, setErrorCities] = useState<any>({});
  const [errorActivities, setErrorActivities] = useState<any>({});
  const hiddenFileInput = useRef(null);
  const [disable, setDisable] = useState(true);
  const [actDate, setActDate] = useState("");
  const [isDisabled, setIsDisabled] = useState([]);
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

  const ableDays = (date: any, availability: string[]) => {
    const availableDays = arrWorkingDays(availability);
    const day = date.getDay(date);
    return availableDays.includes(day);
  };

  if (!isLoading && input.planner === "" && userDb?.data.id)
    setInput({ ...input, planner: userDb.data.id });

  // const handleCities = ({
  //   target: { value },
  // }: ChangeEvent<HTMLInputElement>) => {
  //   setInputCities(value);
  // };

  const handleActDate = (date: any, id: string) => {
    setActDate(date);
    setIsDisabled((prevState) => [...prevState, id]);
    const errActDate = valActDateFormat(date);
    if (errActDate) {
      setErrorActivities(errActDate);
    }
  };

  // const handleCitiesSelect = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   // if (inputCities !== "") {
  //   //   setInput({ ...input, cities: [...input.cities, inputCities] });
  //   //   const errControl = formControl(input);
  //   //   const citiesControl = controlCities({
  //   //     ...input,
  //   //     cities: [...input.cities, inputCities],
  //   //   });
  //     const activitiesControl: any = controlActivities(input);
  //     if (
  //       JSON.stringify(errControl) === "{}" &&
  //       JSON.stringify(citiesControl) === "{}" &&
  //       JSON.stringify(activitiesControl) === "{}"
  //     ) {
  //       setDisable(false);
  //     } else {
  //       setDisable(true);
  //     }
  //     setErrorCities(citiesControl);
  //     setErrorActivities(activitiesControl);
  //     setErrors(errControl);
  //     setInputCities("");
  //   }
  // };

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
      setIsDisabled([]);
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
    trip.planner = userDb.data.id;
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
    try {
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
    } catch (error) {
      console.log(error);
    }
    if (tripCreated) {
      toast({
        title: "Trip Created",
        description: "We've created your trip",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push(`/user/my-trips`);
    } else {
      toast({
        title: "Trip not created",
        description: "We could not create your trip",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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

  if (!userLoading && !user) {
    router.push("/api/auth/login");
    return <div></div>;
  }
  if (isLoading) return <Loading />;
  if (!isLoading && userDb && !userDb.data.active) return <BannedAlert />;
  if (isLoading) return <Loading />;

  const breakpoints = {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    " 2xl": "96em",
  };

  const handleCities2 = (option: any) => {
    // const citiesSelected = e.map((c:any) => c)
    setinputCities(option);
    const citiesSelected = option.map((o: any) => o.value);
    setInput({ ...input, cities: citiesSelected });
    // const citiesSelected = [...e.target.options].filter((c:any) => c.selected).map((x:any) => x.value)
    // setInput({...input,
    //    cities: citiesSelected
    //   })
  };
  return (
    <Layout>
      <NextSeo title="Create Trip" />
      <Center marginTop="2%">
        <Heading
          textAlign={[null, null, "center"]}
          fontSize={["xl", "2xl", "3xl", "4xl"]}
          color={useColorModeValue("#293541", "white")}
        >
          Create a New Trip
        </Heading>
      </Center>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          minH={"3xl"}
          h={"max-content"}
          marginBottom={{ base: "0px", lg: "80px" }}
        >
          <FormControl height={"max-content"}>
            <Center>
              <Grid
                marginBottom={"0px"}
                h={{ base: "max-content", lg: "80vh" }}
                w="80vw"
                templateRows={{ base: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
                templateColumns="300px 1fr 1fr 1fr 1fr"
                gap={1}
              >
                <GridItem
                  display={{ md: "grid" }}
                  placeItems={"center"}
                  height={"100%"}
                  borderRadius="2xl"
                  rowSpan={1}
                  colSpan={{ base: 5, md: 1 }}
                  bg={useColorModeValue(
                    "RGBA(75,100,124,0.41)",
                    "RGBA(75,100,124,0.41)"
                  )}
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
                      marginTop={{ base: "20px", md: 0 }}
                    />
                  </Box>
                  <Center>
                    <Button
                      onClick={(event) => handleClick(event)}
                      mt="20px"
                      marginBottom={{ base: "0px", md: 0 }}
                    >
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
                <GridItem
                  borderRadius="2xl"
                  colSpan={{ base: 5, md: 4 }}
                  bg={useColorModeValue(
                    "RGBA(75,100,124,0.41)",
                    "RGBA(75,100,124,0.41)"
                  )}
                  padding={"10px 20px"}
                  paddingBottom={"20px"}
                >
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
                  <Flex direction="column" mb="30px">
                    <FormLabel
                      paddingLeft="2"
                      htmlFor="description"
                      mt={1}
                      mb="8px"
                    >
                      Cities
                    </FormLabel>
                    <FormControl>
                      <ReactSelect
                        id="cities"
                        name="cities"
                        options={options}
                        closeMenuOnSelect={false}
                        size="md"
                        onChange={(e: any) => handleCities2(e)}
                        value={inputCities}
                        colorScheme={"blue"}
                        isMulti
                      />
                    </FormControl>
                  </Flex>
                  <Flex direction="column" mb="-25px"></Flex>
                  <Center>
                    {!input.cities.length && (
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

                <GridItem
                  borderRadius="2xl"
                  colSpan={{ base: 5, md: 5 }}
                  bg={useColorModeValue(
                    "RGBA(75,100,124,0.41)",
                    "RGBA(75,100,124,0.41)"
                  )}
                  padding={"10px 20px"}
                  paddingBottom={"20px"}
                >
                  <FormLabel
                    paddingLeft="2"
                    htmlFor="description"
                    mt={2}
                    mb="8px"
                  >
                    Description
                  </FormLabel>
                  <Textarea
                    resize={"none"}
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
                <GridItem
                  borderRadius="2xl"
                  colSpan={5}
                  textAlign={{ base: "left", md: "left" }}
                  height={"max-content"}
                  width={"100%"}
                >
                  <FormLabel
                    htmlFor="activitiesName"
                    mt={1}
                    textAlign={{ base: "left", md: "left" }}
                  >
                    Associated activities: <br />
                    <SimpleGrid
                      columns={3}
                      bg={useColorModeValue(
                        "RGBA(75,100,124,0.41)",
                        "RGBA(75,100,124,0.41)"
                      )}
                      width={"100%"}
                      rounded={"10px"}
                    >
                      {input.activitiesName.map((a) => (
                        <Box key="a.name" padding={"10px"}>
                          <Text
                            noOfLines={1}
                            overflow-wrap="break-word"
                            key={a.name}
                            textTransform={"capitalize"}
                          >
                            - {a.name}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </FormLabel>
                  <Button
                    ml="4"
                    disabled={input.initDate === "" || input.endDate === ""}
                    onClick={() => {
                      setOverlay(<OverlayTwo />);
                      onOpen();
                    }}
                  >
                    Click to select activities dates
                  </Button>
                  <Modal
                    size={"5xl"}
                    isCentered
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    {overlay}
                    <ModalContent
                      marginTop={
                        activities.filter((a) =>
                          input.cities.includes(a.city.name)
                        ).length > 4
                          ? "200px"
                          : "50px"
                      }
                    >
                      <ModalHeader
                        textAlign={{ base: "center", md: "left" }}
                        marginTop={{ base: "220px", sm: "200px", md: "0" }}
                      >
                        Select the activities
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Box display={"flex"} flexDirection={"row"}>
                          <Center>
                            <SimpleGrid
                              columns={{ base: 3, md: 6 }}
                              spacing={1}
                            >
                              {activities
                                ?.filter((a) => a.active === true)
                                .map((act, i) => {
                                  if (
                                    input.cities.includes(act.city.name) &&
                                    act.active === true
                                  ) {
                                    const id = act.id;
                                    return (
                                      <Box
                                        key={act.id}
                                        role={"group"}
                                        p={2}
                                        width={"100%"}
                                        bg={useColorModeValue(
                                          "RGBA(75,100,124,0.41)",
                                          "RGBA(75,100,124,0.41)"
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
                                          flex-wrap="wrap"
                                          width={"100%"}
                                          overflow={"hidden"}
                                        >
                                          <Text
                                            noOfLines={1}
                                            textAlign={"center"}
                                            fontSize={"md"}
                                            fontFamily={"body"}
                                            fontWeight={70}
                                            overflow-wrap="break-word"
                                          >
                                            {act?.name}
                                          </Text>
                                          <Box
                                            key={act.name}
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
                                          </Box>
                                          <GridItem>
                                            <FormLabel fontSize={"xs"}>
                                              Choose a date
                                            </FormLabel>
                                            <MyDataPicker
                                              _hover={{ cursor: "pointer" }}
                                              dateFormat="yyyy/mm/ddd"
                                              onChange={(date) => {
                                                let D = new Date(
                                                  date.toString()
                                                );
                                                handleActDate(
                                                  `${D.toISOString().slice(
                                                    0,
                                                    10
                                                  )}`,
                                                  id
                                                );
                                              }}
                                              filterDate={(date) =>
                                                ableDays(date, act.availability)
                                              }
                                              placeholderText={
                                                input.activitiesName
                                                  .find(
                                                    (a: any) =>
                                                      a.name ===
                                                      act.name.toString()
                                                  )
                                                  ?.actDate.slice(0, 10)
                                                  ? input.activitiesName
                                                      .find(
                                                        (a: any) =>
                                                          a.name ===
                                                          act.name.toString()
                                                      )
                                                      ?.actDate.slice(0, 10)
                                                  : "Choose a date"
                                              }
                                              withPortal
                                              portalId="root"
                                              width={"100%"}
                                              borderRadius={"md"}
                                              minDate={new Date(input.initDate)}
                                              maxDate={new Date(input.endDate)}
                                            />
                                          </GridItem>
                                          {/* <GridItem>
                                          {errorActivities && (
                                            <Text m={1} color={"#F3B46F"}>
                                              {errorActivities.date}
                                            </Text>
                                          )}
                                        </GridItem> */}
                                          <Box
                                            key={act.id + act.name}
                                            display={"flex"}
                                            flexDirection={"row"}
                                            alignItems={"center"}
                                            justifyContent={"space-between"}
                                          >
                                            <Link
                                              href={`/activities/${act.id}`}
                                              passHref
                                            >
                                              <a target={"_blank"}>
                                                <Button margin={1} size={"xs"}>
                                                  +Info
                                                </Button>
                                              </a>
                                            </Link>
                                            <Button
                                              id={id}
                                              disabled={
                                                !isDisabled.includes(id)
                                              }
                                              margin={1}
                                              onClick={() => {
                                                handleSelect(act);
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
                        <Center width={"100%"}>
                          <SimpleGrid
                            flex-wrap="wrap"
                            columns={6}
                            justify-content="space-around"
                            marginTop={"10px"}
                            marginBottom={"5px"}
                            width={"100%"}
                          >
                            {input.activitiesName?.map((a, index) => {
                              return (
                                <>
                                  <GridItem
                                    key={index}
                                    margin="20px"
                                    placeItems={"center"}
                                  >
                                    {a.name}
                                    <Button
                                      display="block"
                                      key={a.name}
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
                  <GridItem ml={"13px"} colSpan={5}>
                    {errorActivities.activitiesName && (
                      <Text m={1} color={"#F3B46F"}>
                        {errorActivities.activitiesName}
                      </Text>
                    )}
                  </GridItem>
                  <Center marginTop={2} height={"max-content"}>
                    <Button
                      ml={{ md: "300px", lg: "0" }}
                      bg="highlight"
                      color="primary"
                      _hover={{ bg: "danger" }}
                      type="submit"
                      disabled={disable}
                    >
                      CREATE AND POST
                    </Button>
                  </Center>
                </GridItem>
              </Grid>
            </Center>
          </FormControl>
        </Box>
      </form>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const response = await axios("/activities?byName=true");
  const activities = await response.data;
  const res = await axios("/cities?byName=true");
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
