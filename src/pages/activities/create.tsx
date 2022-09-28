import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Textarea,
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
  useColorModeValue,
  SimpleGrid,
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
import { createActivity } from "src/utils/activities";
import NotFound from "../404";
import Loading from "src/components/Loading";
import { Select as ReactSelect } from "chakra-react-select";
import { NextSeo } from "next-seo";

interface Props {
  activities: Activity[];
  cities: City[];
}

const CreateActivity = ({ activities, cities }: Props) => {
  const { user, isLoading: userLoading } = useUser();
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
  const [isDisabled, setIsDisabled] = useState(true);
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
      setErrors(errControlPrice);
    }
    setInput({ ...input, [name]: value });
    setErrors(errControl);
    if (JSON.stringify(errControl) === "{}") {
      setIsDisabled(false);
    }
  };
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
    const avaForDb = avaValue.map((a) => a.value);
    const createdActivity = await createActivity({
      ...input,
      availability: avaForDb,
      cityName: inputCities,
    });
    if (createdActivity) {
      toast({
        title: "Activity Created",
        description: "We've created your activity",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setInput(initialState);
      setErrors({});
      router.push("/user/admin");
    } else if (!createdActivity) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  if (isLoading || !userDb?.data) return <Loading />;
  if (!userDb?.data.isAdmin) return <NotFound />;
  return (
    <Layout>
     <NextSeo title="Create Activity" />
      <Center marginTop="2%">
        <Heading
          textAlign={[null, null, "center"]}
          fontSize={["xl", "2xl", "3xl", "4xl"]}
          color="primary"
        >
          Create a New Activity
        </Heading>
      </Center>
      <form
        style={{ height: "100vh", marginTop: "1%" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormControl>
          <Center>
            <Grid
              p={5}
              paddingTop={4}
              borderRadius={10}
              marginBottom={"10px"}
              h="90vh"
              w="80vw"
              templateRows="repeat(4, 1fr)"
              templateColumns="300px 1fr 1fr 1fr 1fr"
              gap={1}
            >
              <GridItem
                borderRadius="2xl"
                rowSpan={1}
                colSpan={{ base: 5, md: 5, lg: 1 }}
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
                    boxSize={{ base: "150px", md: "120px", lg: "200px" }}
                  />
                </Box>
                <Center>
                  <Button onClick={(event) => handleClick(event)} mt="20px">
                    Change Activity Image
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
                colSpan={{ base: 4, sm: 5, md: 5, lg: 4 }}
              >
                <FormLabel htmlFor="name" paddingLeft="2" mt={2}>
                  Name
                </FormLabel>
                <Input
                  name="name"
                  placeholder="Type a name for your activity..."
                  onChange={(e) => handleChange(e)}
                />
                <Text m={1} color={"#F3B46F"}>
                  {errors.name}
                </Text>
                <FormLabel htmlFor="price" paddingLeft="2" mt={2}>
                  Price
                </FormLabel>
                <Input
                  name="price"
                  placeholder="Type the activity price in USD..."
                  onChange={(e) => handleChange(e)}
                />
                <Text m={1} color={"#F3B46F"}>
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
                    placeholder="Type the city where the activity takes place..."
                    onChange={(e) => handleCities(e)}
                  />
                  <datalist id="city-choice">
                    {cities
                      ?.filter((c) => !input.city?.includes(c.name))
                      ?.map((c, index) => (
                        <option key={index}> {c.name} </option>
                      ))}
                  </datalist>
                </HStack>
                <SimpleGrid>
                  {!inputCities && (
                    <Text m={1} color={"#F3B46F"}>
                      This field is required
                    </Text>
                  )}
                </SimpleGrid>
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
                      size="md"
                      onChange={(e: any) => handleAvailability(e)}
                      value={avaValue}
                      colorScheme={"blue"}
                      isMulti
                    />
                  </FormControl>
                </Flex>
                {!avaValue.length && (
                  <Text m={1} color={"#F3B46F"}>
                    Availability must be selected
                  </Text>
                )}
              </GridItem>

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
                  borderRadius={10}
                  name="description"
                  placeholder="Type a description for the activity..."
                  size="sm"
                  resize={"none"}
                  onChange={(e) => handleChange(e)}
                />
                <Text m={1} color={"#F3B46F"}>
                  {errors.description}
                </Text>
                <SimpleGrid columns={1}>
                  <Center margin={"2%"}>
                    <Button
                      bg="#02b1b1"
                      color="#293541"
                      _hover={{ bg: "#F3B46F" }}
                      _active={{ bg: "danger" }}
                      type="submit"
                      disabled={isDisabled || !inputCities || !avaValue.length}
                    >
                      CREATE AND POST
                    </Button>
                  </Center>
                </SimpleGrid>
              </GridItem>
            </Grid>
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

  return {
    props: {
      cities: cities,
      activities: activities,
    },
  };
};

export default CreateActivity;
