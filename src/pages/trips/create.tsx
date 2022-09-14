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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import UploadImgInput from "src/components/uploadImg";
import { useState } from "react";
import { Trip } from "src/utils/interface";
import { ChangeEvent, FormEvent } from "react";
import Layout from "src/components/layout/Layout";
import { NextPage } from "next";

const CreateTrip: NextPage = () => {
  const [input, setInput] = useState({
    // image: "", How to set input image?
    name: "",
    // cities: [], --> Ojo debe ser un input de búsqueda, traer cities del back
    initDate: "",
    endDate: "",
    description: "",
    tripOnUser: [],
    activities: [],
    // price: '' --> OJO la suma de las actividades seleccionadas
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setInput({ ...input, [name]: value });
  };

  const createTrip = async (trip: Trip) =>
    await fetch("http://localhost:3000/api/trips", {
      method: "POST",
      body: JSON.stringify(trip),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    // createTrip(input);
  };

  return (
    <>
      <Layout>
        <Center marginTop="1%">
          <Heading color="primary">CREATE A NEW TRIP</Heading>
        </Center>

        <FormControl onSubmit={handleSubmit}>
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
                <FormLabel mt={2}>Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Type a name for your trip..."
                  onChange={handleChange}
                />
                <FormErrorMessage>Name errors....</FormErrorMessage>

                <FormLabel mt={2}>Cities</FormLabel>
                <Input
                  name="cities"
                  placeholder="Type the cities you are visiting..."
                  onChange={handleChange}
                />
                <FormErrorMessage>Cities errors....</FormErrorMessage>

                <FormLabel mt={2}>Initial date</FormLabel>
                <Input
                  name="initiDate"
                  placeholder="Select the initial date of the trip..."
                  size="md"
                  type="date"
                  onChange={handleChange}
                />
                <FormErrorMessage>Initial date errors....</FormErrorMessage>

                <FormLabel mt={2}>End date</FormLabel>
                <Input
                  name="endDate"
                  placeholder="Select the ending date of the trip..."
                  size="md"
                  type="date"
                  onChange={handleChange}
                />
                <FormErrorMessage>Ending date errors....</FormErrorMessage>
              </GridItem>
              <GridItem borderRadius="2xl" colSpan={5} bg="blackAlpha.100">
                <FormLabel mt={2} mb="8px">
                  Description
                </FormLabel>
                <Textarea
                  name="description"
                  placeholder="Type a description of your trip..."
                  size="sm"
                  onChange={handleChange}
                />
                <FormErrorMessage>Description errors....</FormErrorMessage>
              </GridItem>
              <GridItem borderRadius="2xl" colSpan={5}>
                <FormLabel mt={2}>Associated activities</FormLabel>
                <Select
                  name="activities"
                  mt={2}
                  icon={<ChevronDownIcon />}
                  placeholder="Choose the activities to enjoy on the trip..."
                  onChange={handleChange}
                />
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
              PAY AND POST YOUR TRIP
            </Button>
          </Center>
        </FormControl>
      </Layout>
    </>
  );
};

export default CreateTrip;
