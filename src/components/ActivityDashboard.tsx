import {
  Box,
  Button,
  Center,
  Flex,
  Input,
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
import { Activity } from "src/utils/interface";
import { ActivityTable } from "./ActivityTable";
import Link from "next/link";
import Pagination from "./pagination";
export const ActivityDashboard = ({
  activities,
}: {
  activities: Activity[];
}) => {
  const captions = [
    "activity",
    "price",
    "availability",
    "active",
    "description",
    "reviews",
    "save changes",
  ];
  const cities = activities.map((a) => a.city.name);
  const citiesUnique: string[] = Array.from(new Set(cities)).sort(); // remove duplicates, sort alphabetically
  const background = useColorModeValue("#02b1b1", "#02b1b1");
  const textColor = useColorModeValue("gray.700", "white");
  const [data, setData] = useState(activities);
  const [city, setCity] = useState(undefined);
  const [sort, setSort] = useState<string>(undefined);
  const [availability, setAvailability] = useState(undefined);
  const [active, setActive] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage, setActivitiesPerPage] = useState(5);
  const max = Math.ceil(data.length / activitiesPerPage);
  const [inputPage, setInputPage] = useState(1);

  const handleActivitiesPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivitiesPerPage(Number(e.target.value));
  };
  const handleCities = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    if (!e.target.value) setAvailability(undefined);
    if (availability) {
      return setData(
        e.target.value
          ? activities.filter(
              (c) =>
                c.city.name === city &&
                activities.filter((a) =>
                  a.availability.includes(e.target.value)
                )
            )
          : activities
      );
    }
    setData(
      e.target.value
        ? activities.filter((a) => a.city.name === e.target.value)
        : activities
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
  const handleAvailability = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAvailability(e.target.value);
    if (!e.target.value) setActive(undefined);
    if (city) {
      return setData(
        e.target.value
          ? activities.filter(
              (a) =>
                a.availability.includes(e.target.value) && a.city.name === city
            )
          : activities.filter((a) => a.city.name === city)
      );
    }
    return setData(
      e.target.value
        ? activities.filter((a) => a.availability.includes(e.target.value))
        : activities
    );
  };

  const handleActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "true") {
      return setData(
        city
          ? data.filter((a) => a.active === true && a.city.name === city)
          : data.filter((a) => a.active === true)
      );
    }
    if (e.target.value === "false") {
      return setData(
        city
          ? data.filter((a) => a.active === false && a.city.name === city)
          : data.filter((a) => a.active === false)
      );
    }
    setData(city ? data.filter((a) => a.city.name === city) : activities);
  };
  return (
    <Box>
      <Flex
        alignItems={{ base: "center", xl: "right" }}
        justifyContent={{ base: "center", xl: "right" }}
      >
        <Link href="/activities/create" passHref>
          <a>
            <Button
              bg={background}
              mb={5}
              mt={5}
              color={"white"}
              rounded={"md"}
              padding={"20px"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                bg: "#F3B46F",
                color: "black",
              }}
            >
              Create Activity
            </Button>
          </a>
        </Link>
      </Flex>
      <Flex
        textAlign={"center"}
        gap={5}
        mb={5}
        mt={5}
        key={availability}
        direction={{ base: "column", xl: "row" }}
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
          value={availability}
          onChange={(e) => handleAvailability(e)}
          placeholder={"Filter by Availability"}
        >
          <option value={"Monday"}>Monday</option>
          <option value={"Tuesday"}>Tueday</option>
          <option value={"Wednesday"}>Wednesday</option>
          <option value={"Thursday"}>Thursday</option>
          <option value={"Friday"}>Friday</option>
          <option value={"Saturday"}>Saturday</option>
          <option value={"Sunday"}>Sunday</option>
        </Select>
      </Flex>
      <Table>
        <Thead>
          <Tr my=".8rem" pl="0px" color={textColor}>
            {captions.map((c, i) => {
              return (
                <Th
                  color={textColor}
                  key={i}
                  ps={i === 0 ? "10px" : null}
                  pl={30}
                >
                  {c}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody key={activitiesPerPage}>
          {data
            .slice(
              (currentPage - 1) * activitiesPerPage,
              (currentPage - 1) * activitiesPerPage + activitiesPerPage
            )
            .map((a: Activity) => {
              return <ActivityTable activity={a} key={a.id} />;
            })}
        </Tbody>
      </Table>
      <Center>
        <Flex direction="column">
          <Select
            value={activitiesPerPage}
            name={"activitiesPerPage"}
            onChange={(e) => handleActivitiesPerPage(e)}
            mt={5}
            w={130}
            ml={16}
          >
            <option value={5}>5 Results</option>
            <option value={10}>10 Results</option>
            <option value={20}>20 Results</option>
            <option value={50}>50 Results</option>
          </Select>
          <Pagination
            inputPage={inputPage}
            setInputPage={setInputPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            max={max}
          />
        </Flex>
      </Center>
    </Box>
  );
};
