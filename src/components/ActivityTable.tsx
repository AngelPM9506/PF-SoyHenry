import {
  Avatar,
  Badge,
  Button,
  Code,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Td,
  Text,
  Textarea,
  Tr,
  useColorModeValue,
  useToast,
  Link,
} from "@chakra-ui/react";
import {
  Select as ReactSelect,
  useChakraSelectProps,
} from "chakra-react-select";
import React, { SetStateAction, useEffect, useState } from "react";
import { deleteActivity, editActivity } from "src/utils/activities";
import { Activity } from "src/utils/interface";
import { updateUser } from "src/utils/User";
import { UserData } from "./UserProfile";
import NextLink from "next/link";
import { ModalTextarea } from "./ModalEditableTextarea";
type Props = {
  activity: Activity;
};

function ActivityTable({ activity }: Props) {
  const textColor = useColorModeValue("gray.700", "white");

  const toast = useToast();
  const avaFormated = activity.availability.map((d) => ({
    value: d,
    label: d,
  }));
  const [data, setData] = useState({ ...activity });
  const [value, setValue] = useState(avaFormated);
  const [changed, setChanged] = useState("false");
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      active: e.target.value === "true" ? true : false,
    });
  };

  const handleAvailability = (
    option: SetStateAction<{ value: string; label: string }[]>
  ) => {
    setValue(option);
  };

  const availability = [
    { value: "Monday", label: "Monday", color: "#FF8B00" },
    { value: "Tuesday", label: "Tuesday", color: "#FF8B00" },
    { value: "Wednesday", label: "Wednesday", color: "#FF8B00" },
    { value: "Thursday", label: "Thursday", color: "#FF8B00" },
    { value: "Friday", label: "Friday", color: "#FF8B00" },
    { value: "Saturday", label: "Saturday", color: "#FF8B00" },
    { value: "Sunday", label: "Sunday", color: "#FF8B00" },
  ];

  const handleEdit = async () => {
    const avaValue = value.map((a) => a.value);
    await editActivity({ ...data, availability: avaValue });
    return toast({
      title: "Successful change",
      description: "State changed successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = async () => {
    await deleteActivity(data.id);
    return toast({
      title: "Successful delete",
      description: "Activity deleted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Tr key={changed}>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar
            src={activity.image as string}
            w="50px"
            borderRadius="12px"
            me="18px"
          />
          <Flex direction="column">
            <NextLink href={`/activities/${activity.id}`}>
              <Link>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                >
                  {activity.name}
                </Text>
              </Link>
            </NextLink>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {activity.city.name}, {activity.city.country}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          <Input
            w={100}
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            name={"price"}
            value={data.price}
            onChange={(e) => handleChange(e)}
          />
        </Flex>
      </Td>
      <Td>
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
      </Td>
      <Td>
        <Badge
          bg={data.active === true ? "green.400" : "#e63946"}
          color={data.active === true ? "white" : "#e63946"}
          fontSize="16px"
          p="3px 10px"
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
              onChange={(e) => handleActive(e)}
            >
              <option value={"true"}>Active</option>
              <option value={"false"}>Inactive</option>
            </Select>
          </Flex>
        </Badge>
      </Td>
      <Td>
        <Flex direction="column">
          {/* <Textarea
            fontSize="sm"
            color="black"
            name={"description"}
            value={data.description}
            onChange={(e) => handleChange(e)}
            bg={"white"}
          ></Textarea> */}
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
            Edit
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
  );
}

export default ActivityTable;
