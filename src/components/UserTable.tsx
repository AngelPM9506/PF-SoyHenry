import {
  Avatar,
  Badge,
  Button,
  Flex,
  Input,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { UserData } from "./UserProfile";

function UserTable(user: UserData) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

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
        <Flex direction="column">
          <Text fontSize="md" ml={1} mb={2} color={textColor} fontWeight="bold">
            Active
          </Text>
          <Input
            fontSize="sm"
            color="gray.400"
            fontWeight="normal"
            name={"active"}
            width={"15%"}
            value={user.active}
          />
        </Flex>
      </Td>
      {/* <Td>
      <Badge
        bg={status === "Online" ? "green.400" : bgStatus}
        color={status === "Online" ? "white" : colorStatus}
        fontSize="16px"
        p="3px 10px"
        borderRadius="8px"
      >
        {status}
      </Badge>
    </Td> */}
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {/* {date} */}
        </Text>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover">
          <Text
            fontSize="md"
            color="gray.400"
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

export default TablesTableRow;
