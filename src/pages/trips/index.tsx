import type { NextPage } from "next";
import { TripCard } from "../../components/TripCard";
import Pagination from "../../components/pagination";
import { Trip } from "src/interfaces/Trip";
import { useState } from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { getTrips } from "src/utils/trips";

import {
  SimpleGrid,
  Box,
  Select,
  Stack,
  Input,
  Button,
  useColorModeValue,
  Heading,
  HStack,
  Text,
  Link,
  FormControl,
} from "@chakra-ui/react";
import Layout from "../../components/layout/Layout";
import { BsArrowDownUp } from "react-icons/bs";
import { MdLabelImportantOutline } from "react-icons/md";

interface Props {
  trips: Trip[];
}

function Trips({ trips }: Props) {
  const [sort, setSort] = useState<string>("desc"); // asc o desc orden
  const [wName, setName] = useState<string>(null); //para ordenar x nombre alfabeticamente
  const [wActivity, setActivity] = useState<string>(""); //filtrar x actividad
  const [maxPrice, setMaxPrice] = useState<number>(0); // filtrar x precio
  const [sortBy, setSortBy] = useState<string>("name"); // ordenar x nombre o por precio
  const [input, setInput] = useState<string>("");
  const [inputAct, setInputAct] = useState<string>("");
  const { data } = useQuery(
    ["trips", wActivity, wName, maxPrice, sort, sortBy], //dependencies: React is going to re-render when one of these changes
    () => getTrips(wActivity, wName, maxPrice, sort, sortBy)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage, setTripsPerPage] = useState(8);
  const max = Math.ceil((data ? data.length : trips) / tripsPerPage);
  const [inputPage, setInputPage] = useState(1);

  if (sort === "Sort Order") setSort("desc");
  if (sortBy === "Sort By") setSortBy("name");

  const handleActivity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivity(inputAct);
  };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleMaxPrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMaxPrice(parseInt(input));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleInputActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAct(e.target.value);
  };

  return !data ? (
    <div>
      <h1>There are no trips yet! </h1>
    </div>
  ) : (
    <Layout>
      <Heading
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        textAlign={"center"}
        margin={"40px"}
        marginBottom={"50px"}
      >
        <Text
          width={"1500px"}
          fontFamily={"Trebuchet MS"}
          color={useColorModeValue("#293541", "white")}
        >
          ALL OUR TRAVELERS TRIPS
        </Text>
        <Button
          bg={useColorModeValue("#02b1b1", "#02b1b1")}
          color={"white"}
          marginRight={"55px"}
          rounded={"md"}
          padding={"20px"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
            bg: "#F3B46F",
            color: "black",
          }}
        >
          <Link href="/trips/create">Create new Trip</Link>
        </Button>
      </Heading>
      <Box
        display="flex"
        margin="20px"
        flex-direction="center"
        align-items="center"
        justifyContent={"space-around"}
        justifyItems={"center"}
      >
        <HStack
          height={"45px"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing="10px"
        >
          <Text>Max price: </Text>
          <form onSubmit={(e) => handleMaxPrice(e)}>
            <Input
              width="80px"
              textAlign={"left"}
              placeholder="$"
              onChange={(e) => handleInput(e)}
              value={input}
              key={maxPrice}
            />
          </form>
        </HStack>

        <Select
          height={"45px"}
          width="250px"
          placeholder="Order by:"
          onChange={(e) => handleSortBy(e)}
        >
          <option value="name">Trips names </option>
          <option value="price">Price</option>
        </Select>
        <Select
          width="160px"
          placeholder={" ↑ ↓ "}
          onChange={(e) => handleSort(e)}
        >
          <option value={"asc"}>ascendent </option>
          <option value={"desc"}>descendent</option>
        </Select>
        <FormControl
          display={"flex"}
          align-items={"center"}
          width={"20%"}
          height={"45px"}
          justify-content={"center"}
          onSubmit={(e) => handleActivity}
        >
          <Input
            width="200px"
            marginRight={"20px"}
            placeholder="Type an activity ..."
            onChange={(e) => setInputAct(e.target.value)}
          />
          <Button
            bg={useColorModeValue("#151f21", "#293541")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Search
          </Button>
        </FormControl>
      </Box>
      <SimpleGrid minChildWidth="330px" columns={[2, null, 3]}>
        {data
          .slice(
            (currentPage - 1) * tripsPerPage,
            (currentPage - 1) * tripsPerPage + tripsPerPage
          )
          .map((t: Trip) => (
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
    </Layout>
  );
}
// export const getServerSideProps = async () => {
//   const res = await fetch("http://localhost:3000/api/trips");
//   const trips = await res.json();
//   return {
//     props: {
//       trips: trips,
//     },
//   };
// };

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["trips"], await getTrips());
  const trips = await getTrips();
  return {
    props: {
      trips: trips,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Trips;
