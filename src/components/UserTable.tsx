import {
  Avatar,
  Badge,
  Button,
  Flex,
  Input,
  Select,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { updateUser } from "src/utils/User";
import { UserData } from "./UserProfile";

function UserTable({ user }: UserData) {
  const textColor = useColorModeValue("gray.700", "white");
  const toast = useToast();
  const [data, setData] = useState(user);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value === "true" ? true : false,
    });
  };

  const handleEdit = async () => {
    await updateUser(data);
    return toast({
      title: "Successful change",
      description: "State changed successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  console.log(data.active);
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={user.avatar} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {user.name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {user.mail}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={data.isAdmin === true ? "green.400" : "#e63946"}
          color={data.isAdmin === true ? "white" : "#e63946"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          <Flex direction="column">
            <Select
              fontSize="sm"
              color="white"
              fontWeight="bold"
              name={"isAdmin"}
              value={data.isAdmin}
              borderColor={"transparent"}
              onChange={(e) => handleChange(e)}
            >
              <option value={"true"}>True</option>
              <option value={"false"}>False</option>
            </Select>
          </Flex>
        </Badge>
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
              value={data.active}
              borderColor={"transparent"}
              onChange={(e) => handleChange(e)}
            >
              <option value={"true"}>Active</option>
              <option value={"false"}>Inactive</option>
            </Select>
          </Flex>
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {/* {date} */}
        </Text>
      </Td>
      <Td>
        <Button
          mt={8}
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
    </Tr>
  );
}

export default UserTable;
