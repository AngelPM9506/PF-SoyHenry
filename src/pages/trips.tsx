import type { NextPage } from "next";
import { TripCard } from "../components/TripCard";
import { Trip } from "src/interfaces/Trip";
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
} from "@chakra-ui/react";
// import {
//   Previous,
//   Paginator,
//   PageGroup,
//   Page,
//   Next,
//   generatePages,
// } from "chakra-paginator";

// import { useEffect, useState } from "react";
// import {
//   BsFillArrowLeftSquareFill,
//   BsFillArrowRightSquareFill,
// } from "react-icons/bs";

interface Props {
  trips: Trip[];
}

export default function Trips({ trips }: Props) {
  // const itemLimit = 9;
  // const [pagesQuantity, setPagesQuantity] = useState(0);
  // const [curPage, setCurPage] = useState(0);

  // const handlePageChange = (page: number) => {
  //   setCurPage(page);
  // };

  // useEffect(() => {
  //   const pagesTotal = Math.ceil(trips.length / itemLimit);
  //   setPagesQuantity(pagesTotal);
  // }, [trips.length]);

  // const normalStyles = {
  //   bg: "white",
  // };

  // const activeStyles = {
  //   bg: "#293541",
  // };

  return trips.length === 0 ? (
    <div>
      <h1>There are no trips yet! </h1>
    </div>
  ) : (
    <Box>
      <Heading textAlign={"center"}> All our travelers trips</Heading>
      <Box
        display="flex"
        margin="20px"
        flex-direction="center"
        align-items="center"
        justifyContent={"space-around"}
      >
        <Select width="250px" placeholder="Order alphabetically">
          <option value="names asc">names A - Z </option>
          <option value="names desc">names Z - A</option>
        </Select>
        <Select width="250px" placeholder="Order by travelers">
          <option value="travelers asc">ascendent </option>
          <option value="travelers desc">descendent</option>
        </Select>
        <HStack spacing="10px">
          <Input width="250px" placeholder="Type a city ..." />
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
      <SimpleGrid minChildWidth="330px" spacing={2}>
        {trips.map((t) => (
          <TripCard
            key={t.id}
            props={t}
            // curPage={curPage}
            // itemLimit={itemLimit}
          />
        ))}
      </SimpleGrid>
      {/* <Paginator
        onPageChange={handlePageChange}
        pagesQuantity={pagesQuantity}
        isDisabled={false}
      >
        <Previous bg="white">
          <BsFillArrowLeftSquareFill />
        </Previous>
        <PageGroup>
          {generatePages(pagesQuantity)?.map((page) => (
            <Page
              key={`paginator_page_${page}`}
              page={page}
              normalStyles={normalStyles}
              activeStyles={activeStyles}
            />
          ))}
        </PageGroup>
        <Next bg="white">
          <BsFillArrowRightSquareFill />
        </Next>
      </Paginator> */}
    </Box>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/trips"); //chequear que endPoint eligen los chicos en Api
  const trips = await res.json();
  return {
    props: {
      trips: trips,
    },
  };
};
