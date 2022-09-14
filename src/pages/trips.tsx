import type { NextPage } from "next";
import { TripCard } from "../components/TripCard";
import Pagination from "../components/pagination";
import { Trip } from "src/interfaces/Trip";
import { useState } from "react";
import {
  SimpleGrid,
  Box,
  Select,
  Stack,
  Input,
  Button,
  useColorModeValue,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";

interface Props {
  trips: Trip[];
}

export default function Trips({ trips }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage, setTripsPerPage] = useState(8);
  const max = Math.ceil(trips.length / tripsPerPage);
  const [inputPage, setInputPage] = useState(1);

  return trips.length === 0 ? (
    <div>
      <h1>There are no trips yet! </h1>
    </div>
  ) : (
    <Box>
      <Heading textAlign={"center"} margin={"40px"}>
        All our travelers trips
      </Heading>
      <Box
        display="flex"
        margin="20px"
        flex-direction="center"
        align-items="center"
        justifyContent={"space-around"}
      >
        <HStack spacing="10px">
          <Text>Max price: </Text>
          <Input width="80px" textAlign={"center"} placeholder="$" />
        </HStack>

        <Select width="250px" placeholder="Order alphabetically">
          <option value="names asc">names A - Z </option>
          <option value="names desc">names Z - A</option>
        </Select>
        <Select width="250px" placeholder="Order by price">
          <option value="names asc">ascendent </option>
          <option value="names desc">descendent</option>
        </Select>
        <HStack spacing="10px">
          <Input width="250px" placeholder="Type a city or an activity ..." />
          <Button
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Search
          </Button>
        </HStack>
      </Box>
      <SimpleGrid minChildWidth="330px" columns={[2, null, 3]}>
        {trips
          .slice(
            (currentPage - 1) * tripsPerPage,
            (currentPage - 1) * tripsPerPage + tripsPerPage
          )
          .map((t) => (
            <TripCard key={t.id} props={t} />
          ))}
      </SimpleGrid>
      <Pagination
        inputPage={inputPage}
        setInputPage={setInputPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        max={max}
      />
    </Box>
  );
}
export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/trips");
  const trips = await res.json();
  return {
    props: {
      trips: trips,
    },
  };
};
