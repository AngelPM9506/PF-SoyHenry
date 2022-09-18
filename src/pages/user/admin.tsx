import { useUser } from "@auth0/nextjs-auth0";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Input,
  Select,
  Table,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { UserData } from "src/components/UserProfile";
import { getOrCreateUser, getUsers } from "src/utils/User";

function TablesTableRow({ users }) {
  //   const { user, error } = useUser();
  //   const { data: userDb, isLoading } = useQuery(["userDb", user], () =>
  //     getOrCreateUser(user)
  //   );
  console.log(users);
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return users.map((u: UserData) => {
    return (
      <Table key={u.id}>
        <Tr>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
              <Avatar src={u.avatar} w="50px" borderRadius="12px" me="18px" />
              <Flex direction="column">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                >
                  {u.name}
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {u.mail}
                </Text>
              </Flex>
            </Flex>
          </Td>

          <Td>
            <Flex direction="column">
              <Select
                fontSize="sm"
                color="gray.400"
                fontWeight="normal"
                name={"active"}
                value={u.active}
              >
                <option>true</option>
                <option>false</option>
              </Select>
            </Flex>
          </Td>
          <Td>
            <Flex direction="column">
              <Select
                fontSize="sm"
                color="gray.400"
                fontWeight="normal"
                name={"active"}
                value={u.isAdmin}
              >
                <option>true</option>
                <option>false</option>
              </Select>
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
        ;
      </Table>
    );
  });
}

export const getServerSideProps = async () => {
  //   const queryClient = new QueryClient(); //https://tanstack.com/query/v4/docs/guides/ssr

  const users = await getUsers();

  return {
    props: {
      users: users,
    },
  };
};
export default TablesTableRow;
