import {
  Avatar,
  Badge,
  Button,
  Flex,
  Select,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useToast,
  Link,
  Container,
} from "@chakra-ui/react";

import React, { useState } from "react";

import { Activity, Trip } from "src/utils/interface";

import NextLink from "next/link";
import { deleteTrip, editTrip } from "src/utils/trips";
import { ModalTextarea } from "./ModalEditableTextarea";

type Props = {
  trip: Trip;
  activities: Activity[];
};

function TripTable({ trip, activities }: Props) {
  const cities = trip.citiesOnTrips.map((c) => c.city.name);
  //   const citiesUnique: string[] = Array.from(new Set(cities)).sort(); // remove duplicates, sort alphabetically
  //   const currActivities = trip.activitiesOnTrips.map((a) => a.activity.name);
  //   const activitiesUnique: string[] = Array.from(new Set(currActivities)).sort();

  const textColor = useColorModeValue("gray.700", "white");

  const toast = useToast();

  const [data, setData] = useState<Trip>(trip);

  const [changed, setChanged] = useState("false");
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "active") {
      return setData({
        ...data,
        active: e.target.value === "true" ? true : false,
      });
    }
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async () => {
    await editTrip({
      ...data,
    });
    return toast({
      title: "Successful change",
      description: "State changed successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = async () => {
    await deleteTrip(data.id);
    return toast({
      title: "Successful delete",
      description: "trip deleted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Tr key={changed}>
        <Td minWidth={{ base: "300px", sm: "200px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Avatar
              src={data.image as string}
              w="50px"
              borderRadius="12px"
              me="18px"
            />
            <Flex direction="column">
              <NextLink href={`/trips/${data.id}`}>
                <Link>
                  <Text
                    fontSize="sm"
                    color={textColor}
                    fontWeight="bold"
                    minWidth="100%"
                  >
                    {data.name}
                  </Text>
                </Link>
              </NextLink>
              {data.citiesOnTrips.map((c) => {
                return (
                  <Text
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="normal"
                    key={c.city.id}
                  >
                    {c.city.name}
                  </Text>
                );
              })}
            </Flex>
          </Flex>
        </Td>
        <Td pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Avatar
              src={data.planner.avatar as string}
              w="50px"
              borderRadius="12px"
              me="18px"
            />
            <Flex direction="column">
              <NextLink href={`/user/${data.plannerId}`}>
                <Link>
                  <Text
                    fontSize="sm"
                    color={textColor}
                    fontWeight="bold"
                    minWidth="100%"
                  >
                    {data.planner.name}
                  </Text>
                </Link>
              </NextLink>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {data.planner.mail}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td pl="10px">
          {data.activitiesOnTrips.map((a) => {
            return (
              <Flex direction="column" key={a.activityId}>
                <NextLink href={`/activities/${a.activityId}`}>
                  <Link>
                    <Text
                      fontSize="sm"
                      color={textColor}
                      fontWeight="bold"
                      ml={4}
                      w={79}
                    >
                      {a.activity.name}
                    </Text>
                  </Link>
                </NextLink>
              </Flex>
            );
          })}

          {/* <FormControl>
            <ReactSelect
              id="activity"
              name="activity"
              options={allActFormated}
              closeMenuOnSelect={false}
              size="sm"
              onChange={(e: any) => handleActivities(e)}
              value={value}
              colorScheme={"blue"}
              isMulti
            />
          </FormControl>
        */}
        </Td>
        <Td>
          <Flex direction="column" textAlign={"center"}>
            <Text
              w={79}
              fontSize="sm"
              color={textColor}
              fontWeight="bold"
              borderColor={textColor}
              border="solid 1px"
              borderRadius={10}
              p={2}
            >
              {data.price}
            </Text>
          </Flex>
        </Td>
        <Td>
          <Badge
            bg={data.active === true ? "green.400" : "#e63946"}
            color={data.active === true ? "white" : "#e63946"}
            borderRadius="8px"
          >
            <Flex direction="column">
              <Select
                fontSize="sm"
                color="white"
                fontWeight="bold"
                name={"active"}
                value={data.active.toString()}
                borderColor={"transparent"}
                onChange={(e) => handleChange(e)}
                w={100}
              >
                <option value={"true"}>Active</option>
                <option value={"false"}>Inactive</option>
              </Select>
            </Flex>
          </Badge>
        </Td>
        {/* <Td>
        <Flex direction="column">
          <FormControl>
            <ReactSelect
              id="availability"
              name="availability"
              options={availability}
              closeMenuOnSelect={false}
              size="sm"
              onChange={(e: any) => handleAvailability(e)}
              value={value}
              colorScheme={"blue"}
              isMulti
            />
          </FormControl>
        </Flex>
      </Td> */}
        <Td>
          <Flex direction="column">
            {/* <Textarea
            fontSize="sm"
            color="black"
            name={"description"}
            value={data.description}
            onChange={(e) => handleChange(e)}
            bg={"white"}
          /> */}
            <ModalTextarea
              title={"Description"}
              name={"description"}
              value={data.description}
              handler={setData}
            />
          </Flex>
        </Td>

        <Td>
          <Button
            bg={useColorModeValue("#151f21", "#f4f4f4")}
            color={useColorModeValue("#f4f4f4", "#151f21")}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={() => handleEdit()}
          >
            <Text
              fontSize="md"
              color={useColorModeValue("#f4f4f4", "#151f21")}
              fontWeight="bold"
              cursor="pointer"
            >
              Save
            </Text>
          </Button>
        </Td>
        <Td>
          <Button
            bg={"red"}
            color={"#151f21"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={() => handleDelete()}
          >
            <Text
              fontSize="md"
              color={"white"}
              fontWeight="bold"
              cursor="pointer"
            >
              Delete
            </Text>
          </Button>
        </Td>
      </Tr>
    </>
  );
}

export default TripTable;
