import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Textarea,
  Select,
  Button,
  Grid,
  GridItem,
  Center,
  useToast,
  Image,
  Text,
  Box,
  HStack,
  Flex,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { SetStateAction, useState } from "react";
import { Activity, City, Errors } from "src/utils/interface";
import { ChangeEvent, FormEvent, MouseEvent, useRef } from "react";
import Layout from "src/components/layout/Layout";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import { formControlActivity } from "src/utils/validations";
import { createActivity, getActivities } from "src/utils/activities";
import { getCities } from "src/utils/cities";
import NotFound from "../404";
import ActivitiesControles from "src/controllers/activities";
import Loading from "src/components/Loading";
import { Select as ReactSelect } from "chakra-react-select";

interface Props {
  activities: Activity[];
  cities: City[];
}

const CreateActivity = ({ activities, cities }: Props) => {
  const { user } = useUser();
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );
  const initialState: Activity = {
    name: "",
    cityName: "",
    availability: [],
    description: "",
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
  const hiddenFileInput = useRef(null);
  const availability = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];
  const avaFormated = input.availability.map((a) => ({ value: a, label: a }));
  const [avaValue, setValue] = useState(avaFormated);
  const handleCities = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setInputCities(value);
  };

  // const handleCitiesSelect = (e: MouseEvent<HTMLButtonElement>) => {
  //   setInput({ ...input, cityName: inputCities });
  //   // setInputCities("");
  // };

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const errControl = formControlActivity(
      { ...input, [name]: value },
      activities
    );

    if (name === "price") {
      const price = parseInt(value);
      const errControlPrice = formControlActivity(
        { ...input, price: price },
        activities
      );
      setInput({ ...input, price: price });
      return setErrors(errControlPrice);
    }
    setInput({ ...input, [name]: value });
    setErrors(errControl);
  };
  console.log(input.availability);
  const handleAvailability = (
    option: SetStateAction<{ value: string; label: string }[]>
  ) => {
    setValue(option);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).length) return;
    const avaForDb = avaValue.map((a) => a.value);
    await createActivity({
      ...input,
      availability: avaForDb,
      cityName: inputCities,
    });
    setInput(initialState);
    setErrors({});
    router.push("/activities");
  };

  const handleDeleteAv = (c: any) => {
    setInput({
      ...input,
      availability: input.availability.filter((a: any) => a != c),
    });
  };
  if (isLoading || !userDb?.data) return <Loading />;
  if (!userDb?.data.isAdmin) return <NotFound />;
  return (
    <Container maxH={"100%"} maxW={"100%"}>
      <Layout>
        <Center marginTop="1%">
          <Heading color="primary">CREATE A NEW ACTIVITY</Heading>
        </Center>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl>
            <Center>
              <Grid
                marginBottom="10px"
                h="130vh"
                w="90vw"
                templateRows="repeat(4, 1fr)"
                templateColumns="300px 1fr 1fr 1fr 1fr"
                gap={1}
              >
                <GridItem
                  borderRadius="2xl"
                  rowSpan={1}
                  colSpan={1}
                  bg="none"
                  alignContent={"center"}
                  alignSelf="center"
                  mb={250}
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    mr={20}
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
                    <Button
                      onClick={(event) => handleClick(event)}
                      mt="20px"
                      mr={20}
                    >
                      Change Activity Image
                    </Button>
                    <Input
                      type="file"
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                      accept="image/png, image/jpeg, image/gif, image/jpg, image/jfif"
                      onChange={(e) => handleImage(e)}
                    />
                    <Text color={"red"} fontWeight={700}>
                      {errors.image}
                    </Text>
                  </Center>
                </GridItem>
                <GridItem
                  borderRadius="2xl"
                  colSpan={4}
                  bg="blackAlpha.100"
                  p={5}
                  mt={10}
                  mb={5}
                  mr={10}
                  pr={10}
                >
                  <FormLabel htmlFor="name" paddingLeft="2" mt={2}>
                    Name
                  </FormLabel>
                  <Input
                    name="name"
                    placeholder="Type a name for your activity..."
                    onChange={(e) => handleChange(e)}
                    isRequired={true}
                    size={"lg"}
                  />
                  <Text color={"red"} fontWeight={700}>
                    {errors.name}
                  </Text>
                  <FormLabel htmlFor="price" paddingLeft="2" mt={2}>
                    Price
                  </FormLabel>
                  <Input
                    name="price"
                    placeholder="Price of the activity in USD"
                    onChange={(e) => handleChange(e)}
                    isRequired={true}
                    size="lg"
                  />
                  <Text color={"red"} fontWeight={700}>
                    {errors.price}
                  </Text>
                  <FormLabel paddingLeft="2" htmlFor="city" mt={2}>
                    City
                  </FormLabel>
                  <HStack>
                    <Input
                      list="city-choice"
                      name="cityName"
                      value={inputCities}
                      placeholder="Type the city of the activity..."
                      onChange={(e) => handleCities(e)}
                      isRequired
                      size={"lg"}
                    />
                    <datalist id="city-choice">
                      {cities
                        ?.filter((c) => !input.city?.includes(c.name))
                        ?.map((c, index) => (
                          <option key={index}> {c.name} </option>
                        ))}
                    </datalist>
                  </HStack>
                  <Flex direction="column" mb="30px">
                    <FormLabel
                      paddingLeft="2"
                      htmlFor="description"
                      mt={1}
                      mb="8px"
                    >
                      Availability
                    </FormLabel>
                    <FormControl>
                      <ReactSelect
                        id="availability"
                        name="availability"
                        options={availability}
                        closeMenuOnSelect={false}
                        size="lg"
                        onChange={(e: any) => handleAvailability(e)}
                        value={avaValue}
                        colorScheme={"blue"}
                        isMulti
                      />
                    </FormControl>
                  </Flex>
                  <GridItem borderRadius="2xl" colSpan={5}>
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
                      placeholder="Type a description of the activity..."
                      size="lg"
                      onChange={(e) => handleChange(e)}
                      isRequired
                      minH={200}
                    />
                    <Text color={"red"} fontWeight={700}>
                      {errors.description}
                    </Text>
                  </GridItem>
                  <Box mt={50}>
                    <Center marginBottom="2%">
                      <Button
                        bg="highlight"
                        color="primary"
                        _hover={{ bg: "danger" }}
                        type="submit"
                        onClick={() =>
                          !Object.values(errors).length
                            ? toast({
                                title: "Activity Created",
                                description: "We've created the activity",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                              })
                            : toast({
                                title: "Error",
                                description: "Wrong data, check your responses",
                                status: "error",
                                duration: 3000,
                                isClosable: true,
                              })
                        }
                      >
                        CREATE AND POST
                      </Button>
                    </Center>
                  </Box>
                </GridItem>
              </Grid>
            </Center>
          </FormControl>
        </form>
      </Layout>
    </Container>
  );
};

export const getServerSideProps = async () => {
  const response = await axios("/activities");
  const activities = await response.data;
  const res = await axios("/cities");
  const cities = await res.data;

  return {
    props: {
      cities: cities,
      activities: activities,
    },
  };
};

export default CreateActivity;
