import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Textarea,
  Select,
  Button,
  FormErrorMessage,
  Grid,
  GridItem,
  Center,
  List,
  ListItem,
  ListIcon,
  Container,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckCircleIcon } from "@chakra-ui/icons";
import UploadImgInput from "src/components/uploadImg";
import { useState } from "react";
import { Trip, Activity, City } from "src/utils/interface";
import { ChangeEvent, FormEvent, MouseEvent } from "react";
import Layout from "src/components/layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {
  activities: Activity[];
  cities: City[];
}

const CreateTrip = ({ activities, cities }: Props) => {
  const initialState: Trip = {
    // image: "", How to set input image?
    name: "",
    cities: [],
    initDate: "",
    endDate: "",
    description: "",
    tripOnUser: [],
    activities: [],
    planner: "cl81ovgaz0000lgujhtrdzufs",
    price: 0,
  };

  const toast = useToast();
  const router = useRouter();

  const [input, setInput] = useState(initialState);

  const [inputCities, setInputCities] = useState("");

  const handleCities = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setInputCities(value);
  };

  const handleCitiesSelect = (e: MouseEvent<HTMLButtonElement>) => {
    setInput({ ...input, cities: [...input.cities, inputCities] });
    setInputCities("");
  };

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({ ...input, [name]: value });
  };

  const handleSelect = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const activity = value.split("|")[0];
    const price = Number(value.split("|")[1]) + Number(input.price);
    if (!input.activities.includes(activity)) {
      setInput({
        ...input,
        activities: [...input.activities, activity],
        price: price,
      });
    }
  };

  const createTrip = async (trip: Trip) => {
    try {
      await axios.post("http://localhost:3000/api/trips", trip);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTrip(input);
    setInput(initialState);
    router.push("/trips");
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
              marginBottom="5%"
              h="80vh"
              w="80vw"
              templateRows="repeat(4, 1fr)"
              templateColumns="repeat(5, 1fr)"
              gap={1}
            >
              <GridItem
                borderRadius="2xl"
                rowSpan={1}
                colSpan={1}
                bg="background"
              >
                <UploadImgInput />
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
                <FormErrorMessage>Name errors....</FormErrorMessage>

                <FormLabel paddingLeft="2" htmlFor="cities" mt={2}>
                  Cities
                </FormLabel>
                <Input
                  list="cities-choices"
                  name="cities"
                  value={inputCities}
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
                <Button onClick={(e) => handleCitiesSelect(e)}>+</Button>
                <Center>
                  <List spacing={3}>
                    {input.cities?.map((c, index) => {
                      return <ListItem key={index}>{c}</ListItem>;
                    })}
                  </List>
                </Center>
                <FormErrorMessage>Cities errors....</FormErrorMessage>

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
                <FormErrorMessage>Initial date errors....</FormErrorMessage>

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
                <FormErrorMessage>Ending date errors....</FormErrorMessage>
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
                <FormErrorMessage>Description errors....</FormErrorMessage>
              </GridItem>
              <GridItem borderRadius="2xl" colSpan={5}>
                <FormLabel paddingLeft="2" htmlFor="activities" mt={2}>
                  Associated activities
                </FormLabel>
                <Select
                  name="activities"
                  defaultValue="title"
                  mt={2}
                  icon={<ChevronDownIcon />}
                  onChange={(e) => handleSelect(e)}
                >
                  <option value="title" disabled>
                    Choose the activities to enjoy on the trip...
                  </option>
                  {activities?.map((a) => {
                    return (
                      <option key={a.id} value={a.name + "|" + a.price}>
                        {a.name + "   $" + a.price}
                      </option>
                    );
                  })}
                </Select>

                <Center>
                  <List spacing={3}>
                    {input.activities?.map((a, index) => {
                      return (
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} />
                          {a}
                        </ListItem>
                      );
                    })}
                  </List>
                </Center>

                <FormErrorMessage>
                  Activities Select errors....
                </FormErrorMessage>
              </GridItem>
            </Grid>
          </Center>
          <Center marginBottom="2%">
            <Button
              mt={5}
              bg="highlight"
              color="primary"
              _hover={{ bg: "danger" }}
              type="submit"
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
                marginLeft="1%"
                mt={5}
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
  const response = await fetch("http://localhost:3000/api/activities");
  const activities = await response.json();
  const res = await fetch("http://localhost:3000/api/cities");
  const cities = await res.json();

  return {
    props: {
      activities: activities,
      cities: cities,
    },
  };
};

export default CreateTrip;
