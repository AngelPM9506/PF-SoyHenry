/* eslint-disable react-hooks/rules-of-hooks */
import type { NextPage } from "next";
import { TripCard } from "../../components/TripCard";
import Pagination from "../../components/pagination";
import { Trip } from "src/interfaces/Trip";
import { KeyboardEvent, useState } from "react";
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
  Center,
} from "@chakra-ui/react";
import Layout from "../../components/layout/Layout";
import { BsArrowDownUp } from "react-icons/bs";
import { MdLabelImportantOutline } from "react-icons/md";
import TripsControllers from "src/controllers/trips";
import Loading from "src/components/Loading";
import axios from "axios";
import { BannedAlert } from "src/components/Banned";
import { useUser } from "@auth0/nextjs-auth0";
import { getOrCreateUser } from "src/utils/User";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  trips: Trip[];
}

function Trips({ trips }: Props) {
  const router = useRouter();

  const breakpoints = {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    " 2xl": "96em",
  };

  const [sort, setSort] = useState<string>("desc"); // asc o desc orden
  const [wName, setName] = useState<string>(null); //para ordenar x nombre alfabeticamente
  const [wCity, setWcity] = useState<string>(""); //filtrar x actividad
  const [maxPrice, setMaxPrice] = useState<number>(0); // filtrar x precio
  const [sortBy, setSortBy] = useState<string>("name"); // ordenar x nombre o por precio
  const [input, setInput] = useState<string>("");
  const [inputCity, setInputCity] = useState<string>("");
  const { data, isLoading } = useQuery(
    ["trips", wCity, wName, maxPrice, sort, sortBy],
    //dependencies: React is going to re-render when one of these changes
    () => getTrips(wCity, wName, maxPrice, sort, sortBy)
  );
  const { user, isLoading: userLoading } = useUser();

  const { data: userDb } = useQuery(
    ["userDb", user, userLoading],
    () => !userLoading && user && getOrCreateUser(user)
  );
  //const data = trips;
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage, setTripsPerPage] = useState(8);
  const max = Math.ceil((data ? data.length : trips) / tripsPerPage);
  const [inputPage, setInputPage] = useState(1);

  if (sort === "Sort Order") setSort("desc");
  if (sortBy === "Sort By") setSortBy("name");

  const handleCity = () => {
    setWcity(inputCity);
    setInputCity("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCity();
    }
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
  const handleInputCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const city = value.charAt(0).toUpperCase() + value.slice(1);
    setInputCity(city);
  };
  const handleLoadAll = () => {
    setSort("desc");
    setName(null);
    setWcity("");
    setMaxPrice(0);
    setSortBy("name");
    setInput("");
    setInputCity("");
  };

  if (!userLoading && !user) {
    router.push("/api/auth/login");
    return <div></div>;
  }

  const resetSortsAndFilters = () => {
    setMaxPrice(0);
    setSort("desc");
    setName(null);
    setWcity(""), setSortBy("name");
    setInput("");
    setInputCity("");
  };

  if (!isLoading && userDb && !userDb.data.active) {
    return <BannedAlert />;
  }
  return isLoading ? (
    <Loading />
  ) : (
    <Layout>
      <Heading
        display={{ md: "flex" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        textAlign={"center"}
        mt={50}
        ml={{ md: "120" }}
        marginBottom={"50px"}
      >
        <Heading width={"100%"} color={useColorModeValue("#293541", "white")}>
          All Our Travelers Trips
        </Heading>
        <NextLink href="/trips/create">
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
            m={5}
            w={175}
            marginBottom={{ sm: "-15px" }}
          >
            CREATE NEW TRIP
          </Button>
        </NextLink>
      </Heading>
      <Box
        display={{ md: "flex" }}
        margin={{ md: "20px" }}
        flex-direction="center"
        align-items="center"
        justifyContent={{ md: "space-around" }}
        justifyItems={{ md: "center" }}
      >
        <HStack
          margin={"auto"}
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
          marginTop={{ base: "20px", sm: "10px", md: "0", lg: "0", xl: "0" }}
          margin={"auto"}
          height={"45px"}
          width="250px"
          placeholder="Order by:"
          onChange={(e) => handleSortBy(e)}
        >
          <option value="name">Trips names </option>
          <option value="price">Price</option>
        </Select>
        <Select
          marginTop={{ base: "20px", sm: "10px", md: "0", lg: "0", xl: "0" }}
          margin={"auto"}
          width="160px"
          placeholder={" ↑ ↓ "}
          onChange={(e) => handleSort(e)}
        >
          <option value={"asc"}>ascendent </option>
          <option value={"desc"}>descendent</option>
        </Select>
        <FormControl
          marginTop={{ base: "20px", sm: "10px", md: "0", lg: "0", xl: "0" }}
          margin={"auto"}
          display={"flex"}
          align-items={"center"}
          width={{ base: "50%", sm: "50%", md: "20%", lg: "20%", xl: "20%" }}
          height={"45px"}
          justify-content={"center"}
        >
          <Input
            margin="auto"
            // width="200px"
            marginRight={"20px"}
            placeholder="Type a City ..."
            onKeyDown={(e) => onKeyDown(e)}
            onChange={(e) => handleInputCity(e)}
            width={"1000px"}
          />
          <Button
            margin="auto"
            bg={useColorModeValue("#151f21", "#293541")}
            color={"white"}
            type={"submit"}
            onClick={handleCity}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            width={"80%"}
          >
            Search
          </Button>
        </FormControl>
      </Box>
      <Box display={"grid"} placeItems={"center"}>
        <Button
          bg={useColorModeValue("#02b1b1", "#02b1b1")}
          color={"white"}
          rounded={"md"}
          padding={"20px"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
            bg: "#F3B46F",
            color: "black",
          }}
          width="100px"
          marginTop={"10px"}
          onClick={resetSortsAndFilters}
        >
          RESET
        </Button>
      </Box>
      <SimpleGrid minChildWidth="330px" columns={[2, null, 3]}>
        {data.length != 0 ? (
          data
            .slice(
              (currentPage - 1) * tripsPerPage,
              (currentPage - 1) * tripsPerPage + tripsPerPage
            )
            .filter((t: Trip) => t.active === true)
            .map((t: Trip) => <TripCard key={t.id} props={t} />)
        ) : (
          <Box
            height={"38vh"}
            width={"100%"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Text m={"15px"} textAlign={"center"} fontSize={"40px"}>
              Sorry! There are no trips with the selected condition.
            </Text>
            <Center>
              <Button
                fontSize={"40px"}
                bg={useColorModeValue("#151f21", "#293541")}
                color={"white"}
                type={"submit"}
                height={"60px"}
                p={"20px"}
                m={"25px"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                onClick={handleLoadAll}
              >
                Load all the trips again!
              </Button>
            </Center>
          </Box>
        )}
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
//   const res = await axios("/trips");
//   const trips = await res.data;
//   return {
//     props: {
//       trips: trips,
//     },
//   };
// };

// export const getServerSideProps = async () => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery( await TripsControllers.getTrips({}));
//   const trips = await TripsControllers.getTrips({});
//   return {
//     props: {
//       trips: trips,
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export const getServerSideProps = async () => {
  const res = await axios.get("/trips");
  const trips = await res.data;

  return {
    props: {
      trips: trips,
    },
  };
};
export default Trips;
