import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  Box,
  HStack,
  Input,
  Text,
  Button,
  useColorModeValue,
  Stack,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { CityInDB } from "src/utils/interface";
import { Grid } from "antd";
export type ActivityFilter = {
  city: string;
  sort: string;
  sortBy: string;
  maxPrice: number;
  citiesUnique: string[];
  input: string;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  handleCity: any;
  handleSort: any;
  handleSortBy: any;
  handleMaxPrice: any;
  handleInput: any;
  setInput: Dispatch<SetStateAction<string>>;
  handleLoadAll: any;
};
export const ActivityFilters = ({
  city,
  sort,
  sortBy,
  maxPrice,
  setMaxPrice,
  citiesUnique,
  handleCity,
  handleSort,
  handleSortBy,
  handleMaxPrice,
  handleInput,
  input,
  setInput,
  handleLoadAll,
}: ActivityFilter) => {
  return (
    <SimpleGrid
      margin="20px"
      mt={10}
      columns={{ base: 1, md: 3, lg: 5 }}
      columnGap={3}
      rowGap={6}
    >
      <GridItem>
        <HStack
          margin={"auto"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={200}
          spacing="10px"
        >
          <Select
            width={200}
            placeholder="Filter By City"
            value={city}
            onChange={(e) => handleCity(e)}
          >
            {citiesUnique.map((c: string, i: number) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </HStack>
      </GridItem>
      <GridItem>
        <HStack
          width={200}
          margin={"auto"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing="10px"
        >
          <Select width={200} value={sort} onChange={(e) => handleSort(e)}>
            <option value={"asc"}>Sort Order: Ascending</option>
            <option value={"desc"}>Sort Order: Descending</option>
          </Select>
        </HStack>
      </GridItem>
      <GridItem>
        <HStack
          margin={"auto"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing="10px"
        >
          <Select width={200} value={sortBy} onChange={(e) => handleSortBy(e)}>
            <option value={"name"}>Sort By: Name</option>
            <option value={"price"}>Sort By: Price</option>
          </Select>
        </HStack>
      </GridItem>
      <GridItem>
        <HStack
          width={200}
          margin={"auto"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing="10px"
        >
          <form onSubmit={(e) => handleMaxPrice(e)}>
            <Input
              width={"100%"}
              textAlign={"left"}
              placeholder="Max price: $"
              onChange={(e) => handleInput(e)}
              value={input}
              key={maxPrice}
            />
          </form>
          <Button
            margin="auto"
            bg={useColorModeValue("#151f21", "#293541")}
            color={"white"}
            type={"submit"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            width={"45%"}
            onClick={(e) => handleMaxPrice(e)}
          >
            Search
          </Button>
        </HStack>
      </GridItem>
      <GridItem>
        <HStack
          width={200}
          margin={"auto"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing="10px"
        >
          <Button
            margin="auto"
            bg={useColorModeValue("#151f21", "#02b1b1")}
            color={"white"}
            type={"submit"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            width={"45%"}
            onClick={handleLoadAll}
          >
            Reset
          </Button>
        </HStack>
      </GridItem>
    </SimpleGrid>
  );
};
