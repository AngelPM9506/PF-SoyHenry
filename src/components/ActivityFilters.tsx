import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  Box,
  HStack,
  Input,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CityInDB } from "src/utils/interface";
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
}: ActivityFilter) => {
  return (
    <Box
      display="flex"
      margin="20px"
      flex-direction="center"
      align-items="center"
      justifyContent={"space-around"}
      mt={10}
    >
      <Select
        width={250}
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
      <Select width={250} value={sort} onChange={(e) => handleSort(e)}>
        <option value={"asc"}>Sort Order: Ascending</option>
        <option value={"desc"}>Sort Order: Descending</option>
      </Select>
      <Select width={200} value={sortBy} onChange={(e) => handleSortBy(e)}>
        <option value={"name"}>Sort By: Name</option>
        <option value={"price"}>Sort By: Price</option>
      </Select>
      <HStack>
        <p>Max Price:</p>
        <form onSubmit={(e) => handleMaxPrice(e)}>
          <Input
            width="120px"
            textAlign={"left"}
            placeholder="$"
            onChange={(e) => handleInput(e)}
            value={input}
            key={maxPrice} //when max price changes after clicking the reset button, the input UI is going to re-render too and reflect the changes
          />
        </form>
        <Button
          mt={8}
          bg={useColorModeValue("#151f21", "#f4f4f4")}
          color={useColorModeValue("#f4f4f4", "#151f21")}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          type="submit"
          onClick={(e) => handleMaxPrice(e)}
        >
          Search
        </Button>
      </HStack>
    </Box>
  );
};
