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
  Text,
  Container,
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckCircleIcon } from "@chakra-ui/icons";
import UploadImgInput from "src/components/uploadImg";
import { useState } from "react";
import { Trip, Activity, City } from "src/utils/interface";
import { ChangeEvent, FormEvent, MouseEvent } from "react";
import Layout from "src/components/layout/Layout";
import axios from "axios";

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
    price: 0,
  };
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
    setInput({
      ...input,
      activities: [...input.activities, activity],
      price: price,
    });
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
              h="80vh"
              w="80vw"
              templateRows="repeat(4, 1fr)"
              templateColumns="repeat(5, 1fr)"
              gap={1}
              margin="2%"
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
                <FormLabel htmlFor="name" mt={2}>
                  Name
                </FormLabel>
                <Input
                  name="name"
                  placeholder="Type a name for your trip..."
                  onChange={(e) => handleChange(e)}
                />
                <FormErrorMessage>Name errors....</FormErrorMessage>

                <FormLabel htmlFor="cities" mt={2}>
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

                <FormLabel htmlFor="initialDate" mt={2}>
                  Initial date
                </FormLabel>
                <Input
                  name="initiDate"
                  placeholder="Select the initial date of the trip..."
                  size="md"
                  type="date"
                  onChange={(e) => handleChange(e)}
                />
                <FormErrorMessage>Initial date errors....</FormErrorMessage>

                <FormLabel htmlFor="endDate" mt={2}>
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
                <FormLabel htmlFor="description" mt={2} mb="8px">
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
                <FormLabel htmlFor="activities" mt={2}>
                  Associated activities
                </FormLabel>
                <Select
                  name="activities"
                  mt={2}
                  icon={<ChevronDownIcon />}
                  placeholder="Choose the activities to enjoy on the trip..."
                  onChange={(e) => handleSelect(e)}
                >
                  {activities?.map((a) => {
                    return (
                      <option key={a.id} value={a.name + "|" + a.price}>
                        {a.name + "   $" + a.price}
                      </option>
                    );
                  })}
                </Select>
                <Container minH="full">
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
                </Container>
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
            >
              {input.price
                ? `PAY ($${input.price}) AND POST YOUR TRIP`
                : `PAY AND POST YOUR TRIP`}
            </Button>
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
