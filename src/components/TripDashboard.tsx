import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Link,
  Select,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Activity, Trip } from "src/utils/interface";

import Pagination from "./pagination";

import TripTable from "./TripTable";
export const TripDashboard = ({
  trips,
  activities,
}: {
  trips: Trip[];
  activities: Activity[];
}) => {
  const captions = [
    "trip",
    "planner",
    "activities",
    "price",
    "active",
    "description",
    "save changes",
    "delete",
  ];

  const background = useColorModeValue("#02b1b1", "#02b1b1");
  const textColor = useColorModeValue("gray.700", "white");
  const [data, setData] = useState(trips);
  const [city, setCity] = useState(undefined);
  const [sort, setSort] = useState<string>(undefined);
  const [activity, setActivity] = useState(undefined);
  const [active, setActive] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage, setTripsPerPage] = useState(5);
  const max = Math.ceil(data.length / tripsPerPage);
  const [inputPage, setInputPage] = useState(1);
  const cities = trips.flatMap((t) => t.citiesOnTrips.map((c) => c.city.name));
  const citiesUnique: string[] = Array.from(new Set(cities)).sort(); // remove duplicates, sort alphabetically
  const actOnTrips = trips.flatMap((t) =>
    t.activitiesOnTrips.map((a) => a.activity.name)
  );
  const activitiesUnique: string[] = Array.from(new Set(actOnTrips)).sort();

  const handleTripsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTripsPerPage(Number(e.target.value));
  };
  const handleCities = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setActive(undefined);
    setActivity(undefined);
    return setData(
      e.target.value
        ? trips.filter((t) =>
            t.citiesOnTrips
              .map((c) => c.city.name)
              .find((c) => c === e.target.value)
          )
        : trips
    );
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    if (e.target.value === "asc") {
      return setData(data.sort((a, b) => a.price - b.price));
    }
    if (e.target.value === "desc") {
      return setData(data.sort((a, b) => b.price - a.price));
    }
  };
  const handleActivities = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivity(e.target.value);
    if (city) {
      return setData(
        e.target.value
          ? trips.filter(
              (t) =>
                t.activitiesOnTrips
                  .map((a) => a.activity.name)
                  .find((a) => a === e.target.value) &&
                t.citiesOnTrips.map((c) => c.city.name).find((c) => c === city)
            )
          : trips.filter((t) =>
              t.citiesOnTrips.map((c) => c.city.name).find((c) => c === city)
            )
      );
    }
    return setData(
      e.target.value
        ? trips.filter((t) =>
            t.activitiesOnTrips
              .map((a) => a.activity.name)
              .find((a) => a === e.target.value)
          )
        : trips
    );
  };

  const handleActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "true") {
      return setData(
        city
          ? trips.filter(
              (t) =>
                t.citiesOnTrips.find((c) => c.city.name === city) &&
                t.active === true
            )
          : trips.filter((a) => a.active === true)
      );
    }
    if (e.target.value === "false") {
      return setData(
        city
          ? trips.filter(
              (t) =>
                t.citiesOnTrips.find((c) => c.city.name === city) &&
                t.active === false
            )
          : trips.filter((a) => a.active === false)
      );
    }
    setData(
      city
        ? trips.filter((t) =>
            t.citiesOnTrips.map((c) => c.city.name).find((c) => c === city)
          )
        : trips
    );
  };
  return (
    <>
      <Flex
        textAlign={"center"}
        key={activity}
        direction={{ base: "column", xl: "row" }}
        gap={5}
        mb={5}
        mt={5}
      >
        <Select
          width={250}
          value={sort}
          onChange={(e) => handleSort(e)}
          placeholder={"Sort by Price"}
        >
          <option value={"asc"}>Ascending</option>
          <option value={"desc"}>Descending</option>
        </Select>
        <Select
          width={250}
          placeholder="Filter By City"
          value={city}
          onChange={(e) => handleCities(e)}
        >
          {citiesUnique.map((c: string, i: number) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Select
          width={250}
          value={active}
          onChange={(e) => handleActive(e)}
          placeholder={"Filter by Active"}
        >
          <option value={"true"}>Active</option>
          <option value={"false"}>Inactive</option>
        </Select>
        <Select
          width={250}
          placeholder="Filter By Activity"
          value={activity}
          onChange={(e) => handleActivities(e)}
        >
          {activitiesUnique.map((a: string, i: number) => (
            <option key={i} value={a}>
              {a}
            </option>
          ))}
        </Select>
      </Flex>
      <Table>
        <Thead>
          <Tr my=".8rem" color={textColor}>
            {captions.map((c, i) => {
              return (
                <Th color={textColor} key={i} ps={i === 0 ? "10px" : null}>
                  {c}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody key={tripsPerPage}>
          {data
            .slice(
              (currentPage - 1) * tripsPerPage,
              (currentPage - 1) * tripsPerPage + tripsPerPage
            )
            .map((t: Trip, i: number) => {
              return <TripTable trip={t} key={t.id} activities={activities} />;
            })}
        </Tbody>
      </Table>
      <Center>
        <Flex direction="column">
          <Pagination
            inputPage={inputPage}
            setInputPage={setInputPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            max={max}
          />
          <Select
            value={tripsPerPage}
            name={"tripsPerPage"}
            onChange={(e) => handleTripsPerPage(e)}
            mt={5}
            w={130}
            ml={16}
          >
            <option value={5}>5 Results</option>
            <option value={10}>10 Results</option>
            <option value={20}>20 Results</option>
            <option value={50}>50 Results</option>
          </Select>
        </Flex>
      </Center>
    </>
  );
};
