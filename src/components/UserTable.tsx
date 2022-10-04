import {
  Avatar,
  Badge,
  Button,
  Flex,
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
import React, { useState } from "react";
import { updateUser } from "src/utils/User";
import { UserData } from "./UserProfile";
import NextLink from "next/link";
import { ModalTextarea } from "./ModalEditableTextarea";

function UserTable({ user }: UserData) {
  const textColor = useColorModeValue("gray.700", "white");
  const toast = useToast();
  const [data, setData] = useState(user);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "keyWords") {
      return setData({
        ...data,
        keyWords: e.target.value,
      });
    }
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

  return (
    <Tr key={user.id}>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={user.avatar} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <NextLink href={`/user/${user.id}`}>
              <Link>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                >
                  {user.name}
                </Text>
              </Link>
            </NextLink>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {user.mail}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Flex direction={"column"}>
          <Input
            name={"keyWords"}
            placeholder="Beach, Mountains, Europe, South America"
            _placeholder={{ color: "gray.500" }}
            onChange={(e) => handleChange(e)}
            value={data.keyWords}
            type="text"
          />
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          {/* <Textarea
            fontSize="sm"
            color="black"
            name={"description"}
            value={data.description}
            borderColor={"black"}
            onChange={(e) => handleChange(e)}
            bg={"white"}
          ></Textarea> */}
          <ModalTextarea
            title={"Description"}
            name="description"
            value={data.description}
            handler={setData}
          />
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={data.isAdmin === true ? "green.400" : "#e63946"}
          color={data.isAdmin === true ? "white" : "#e63946"}
          fontSize="16px"
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
              w={100}
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
              w={100}
            >
              <option value={"true"}>Active</option>
              <option value={"false"}>Inactive</option>
            </Select>
          </Flex>
        </Badge>
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
    </Tr>
  );
}

export default UserTable;
