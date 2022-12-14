/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Activity } from "src/utils/interface";
import {
  Box,
  Button,
  Center,
  Heading,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ActivityCard } from "../../components/ActivityCard";
import { getActivities } from "src/utils/activities";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { ActivityFilters } from "../../components/ActivityFilters";
import Layout from "src/components/layout/Layout";
import NextLink from "next/link";
import Loading from "src/components/Loading";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import { getOrCreateUser } from "src/utils/User";
import { BannedAlert } from "src/components/Banned";
import { useRouter } from "next/router";
import Pagination from "../../components/pagination";
import { NextSeo } from "next-seo";

interface Props {
  activities: Activity[];
}
const Activities = ({ activities }: Props) => {
  const router = useRouter();
  const [city, setCity] = useState<string>(undefined);
  const [name, setName] = useState<string>(undefined);
  const [maxPrice, setMaxPrice] = useState<number>(undefined);
  const [sort, setSort] = useState<string>("desc");
  const [sortBy, setSortBy] = useState<string>("name");
  const [input, setInput] = useState<string>(undefined);
  let { data, isLoading } = useQuery(
    ["activities", city, name, maxPrice, sort, sortBy], //dependencies: React is going to re-render when one of these changes
    () => getActivities(city, name, maxPrice, sort, sortBy)
  );
  const { user, isLoading: userLoading } = useUser();

  const { data: userDb } = useQuery(
    ["userDb", user, userLoading],
    () => !userLoading && user && getOrCreateUser(user)
  );
  const cities = activities.map((a) => a.city.name);
  const citiesUnique: string[] = Array.from(new Set(cities)).sort(); // remove duplicates, sort alphabetically
  if (city === "All Cities") setCity(undefined);
  if (sort === "Sort Order") setSort("desc");
  if (sortBy === "Sort By") setSortBy("name");
  const handleCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
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

  const handleLoadAll = () => {
    setSort("desc");
    setName(undefined);
    setCity(undefined);
    setMaxPrice(0);
    setSortBy("name");
    setInput(undefined);
  };

  //pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [actPerPage, setActPerPage] = useState(8);
  const max = Math.ceil((data ? data.length : activities) / actPerPage);
  const [inputPage, setInputPage] = useState(1);

  if (!userLoading && !user) {
    router.push("/api/auth/login");
    return <div></div>;
  }
  if (isLoading) return <Loading />;
  if (!isLoading && userDb && !userDb.data.active) {
    return <BannedAlert />;
  }
  data = data?.filter((a: Activity) => a.active === true);
  return (
    <div>
      <Layout>
        <NextSeo title="Activities" />
        <Center>
          <Heading
            pt={"30px"}
            textAlign={"center"}
            width={"1500px"}
            color={useColorModeValue("#293541", "white")}
          >
            All Our Activities
          </Heading>
        </Center>
        <ActivityFilters
          city={city}
          handleCity={handleCity}
          handleInput={handleInput}
          sort={sort}
          handleSort={handleSort}
          sortBy={sortBy}
          handleSortBy={handleSortBy}
          maxPrice={maxPrice}
          handleMaxPrice={handleMaxPrice}
          setMaxPrice={setMaxPrice}
          citiesUnique={citiesUnique}
          input={input}
          setInput={setInput}
          handleLoadAll={handleLoadAll}
        />
        <SimpleGrid minChildWidth="330px" spacing={2}>
          {data.length != 0 ? (
            data
              .slice(
                (currentPage - 1) * actPerPage,
                (currentPage - 1) * actPerPage + actPerPage
              )
              .map((a: any) => <ActivityCard key={a.id} props={a} />)
          ) : (
            <Box
              height={"38vh"}
              width={"100%"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Text
                m={"15px"}
                textAlign={"center"}
                fontSize={{ base: "20px", sm: "25px", md: "30px", lg: "40px" }}
              >
                Sorry! There are no activities with the selected condition.
              </Text>
              <Center>
                <Button
                  fontSize={{
                    base: "20px",
                    sm: "20px",
                    md: "20px",
                    lg: "20px",
                  }}
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
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await axios.get("/activities");
  const activities = await response.data;

  return {
    props: {
      activities: activities,
    },
  };
};

export default Activities;
