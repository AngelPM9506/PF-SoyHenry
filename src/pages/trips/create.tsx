import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Textarea,
  Select,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import UploadImgInput from "src/components/uploadImg";
import { useState } from "react";
import Layout from "src/components/layout/Layout";

const CreateTrip = () => {
  const [input, setInput] = useState({
    // image: "", How to set input image?
    name: "",
    cities: "",
    initialDate: "",
    endDate: "",
    description: "",
    activities: [],
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setInput({ ...input, [name]: value });
  };

  return (
    <Container>
      <Heading>Create a new trip</Heading>

      <FormControl>
        <UploadImgInput />

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
          name="initialDate"
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

        <Select
          name="activities"
          mt={2}
          icon={<ChevronDownIcon />}
          placeholder="Choose the activities to enjoy on the trip..."
          onChange={handleChange}
        />
        <FormErrorMessage>Activities Select errors....</FormErrorMessage>

        <Button mt={5} colorScheme="teal" type="submit">
          PAY AND POST YOUR TRIP
        </Button>
      </FormControl>
    </Container>
  );
};

export default CreateTrip;
