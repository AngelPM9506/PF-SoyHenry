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
  useToast,
  Image,
  HStack,
  Box,
  Stack,
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
} from "src/utils/validations";

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

  if (!isLoading && input.planner === "" && userDb?.data.id)
    setInput({ ...input, planner: userDb.data.id });

  const handleCities = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setInputCities(value);
  };

  const handleCitiesSelect = (e: MouseEvent<HTMLButtonElement>) => {
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

  const handleSelect = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const activity = value.split("|")[0];
    const price = Number(value.split("|")[1]) + Number(input.price);
    if (!input.activitiesName.includes(activity)) {
      setInput({
        ...input,
        activitiesName: [...input.activitiesName, activity],
        price: price,
      });
    }
    const errControl = formControl(input);
    const citiesControl = controlCities(input);
    const activitiesControl = controlActivities({
      ...input,
      activitiesName: [...input.activitiesName, activity],
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
      await axios.post("/api/trips", trip);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    await createTrip(input);
    setInput(initialState);
    router.push("/trips");
  };

  const handleDelete = (activity: String) => {
    const activityDelete = activities?.find((a) => a.name === activity);
    setInput({
      ...input,
      activitiesName: input.activitiesName?.filter((a) => a !== activity),
      price: input.price - activityDelete.price,
    });
    const errControl = formControl(input);
    const citiesControl = controlCities(input);
    const activitiesControl = controlActivities({
      ...input,
      activitiesName: input.activitiesName?.filter((a) => a !== activity),
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

  return (
    <Layout>
      <Center marginTop="1%">
        <Heading color="primary">CREATE A NEW TRIP</Heading>
      </Center>
      <form onSubmit={(e) => handleSubmit(e)}>
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
                {errors.name && <p>{errors.name}</p>}
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
                    bg="highlight"
                    color="primary"
                    _hover={{ bg: "danger" }}
                    onClick={(e) => handleCitiesSelect(e)}
                  >
                    +
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
                  {errorCities.cities && <p>{errorCities.cities}</p>}
                </Center>

                <FormLabel paddingLeft="2" htmlFor="initialDate" mt={2}>
                  Initial date
                </FormLabel>
                <Input
                  name="initDate"
                  placeholder="Select the initial date of the trip..."
                  size="md"
                  type="date"
                  onChange={(e) => handleChange(e)}
                />
                {errors.initDate && <p>{errors.initDate}</p>}

                <FormLabel paddingLeft="2" htmlFor="endDate" mt={2}>
                  End date
                </FormLabel>
                <Input
                  name="endDate"
                  placeholder="Select the ending date of the trip..."
                  size="md"
                  type="date"
                  onChange={(e) => handleChange(e)}
                />
                {errors.endDate && <p>{errors.endDate}</p>}
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
                {errors.description && <p>{errors.description}</p>}
              </GridItem>
              <GridItem borderRadius="2xl" colSpan={5}>
                <FormLabel paddingLeft="2" htmlFor="activitiesName" mt={2}>
                  Associated activities
                </FormLabel>
                <Select
                  value="disable"
                  // name="activitiesName"
                  // defaultValue="title"
                  mt={2}
                  icon={<ChevronDownIcon />}
                  onChange={(e) => handleSelect(e)}
                >
                  <option value="">
                    Choose the activities to enjoy on the trip...
                  </option>
                  {activities?.map((a) => {
                    if (input.cities.includes(a.city.name)) {
                      return (
                        <option key={a.id} value={a.name + "|" + a.price}>
                          {a.name + "   $" + a.price}
                        </option>
                      );
                    }
                  })}
                </Select>
                <Center>
                  <SimpleGrid
                    marginTop={"10px"}
                    marginBottom={"5px"}
                    columns={7}
                    spacing={3}
                  >
                    {input.activitiesName?.map((a, index) => {
                      return (
                        <GridItem key={index}>
                          {a}
                          <Button
                            marginLeft="2"
                            onClick={() => handleDelete(a)}
                            height={"25px"}
                            width={"5px"}
                          >
                            X
                          </Button>
                        </GridItem>
                      );
                    })}
                  </SimpleGrid>
                </Center>
              </GridItem>
              <GridItem colSpan={5}>
                {errorActivities.activitiesName && (
                  <p>{errorActivities.activitiesName}</p>
                )}
              </GridItem>
            </Grid>
          </Center>

          <Center marginBottom="2%">
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
            {input.price ? (
              <Button
                mt={"20px"}
                marginLeft="1%"
                bg="highlight"
                color="primary"
                _hover={{ bg: "danger" }}
              >
                {`PAY $${input.price}`}
              </Button>
            ) : null}
          </Center>
        </FormControl>
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
