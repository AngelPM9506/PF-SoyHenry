import { useUser } from "@auth0/nextjs-auth0";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Input,
  Link,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { fromPairs } from "lodash";
import React, { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Layout from "src/components/layout/Layout";
import { UserData } from "src/components/UserProfile";
import UserTable from "src/components/UserTable";
import { getOrCreateUser, getUsers } from "src/utils/User";
import NotFound from "src/pages/404.tsx";
import NextLink from "next/link";

function TablesTableRow({ users }) {
  const { user, error } = useUser();
  const { data: userDb, isLoading } = useQuery(["userDb", user], () =>
    getOrCreateUser(user)
  );

  const textColor = useColorModeValue("gray.700", "white");
  const captions = ["user", "admin", "active"];
  if (isLoading || !userDb.data) return <div>Loading...</div>;
  if (!userDb.data.isAdmin) return <NotFound />;
  return (
    <>
      <Layout>
        <Box></Box>
        <Box overflowX={{ sm: "scroll", xl: "hidden" }} mt={5} ml={5}>
          <Box p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Users Dashboard
            </Text>
          </Box>
          <Button
            // eslint-disable-next-line react-hooks/rules-of-hooks
            position={"absolute"}
            right={0}
            mr={10}
            bg={useColorModeValue("#02b1b1", "#02b1b1")}
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
            <NextLink href="/activities/create">
              <Link>Create Activity</Link>
            </NextLink>
          </Button>
          <Table>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400" gap={5}>
                {captions.map((c, i) => {
                  return (
                    <Th
                      color="gray.400"
                      key={i}
                      ps={i === 0 ? "10px" : null}
                      gap={50}
                    >
                      {c}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {users.map((u: UserData) => {
                return <UserTable user={u} key={u.id} />;
              })}
            </Tbody>
          </Table>
        </Box>
      </Layout>
    </>
  );
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
