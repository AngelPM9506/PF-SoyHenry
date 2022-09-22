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
import NextLink from "next/link";
import NotFound from "src/pages/404";
import ActivitiesControles from "src/controllers/activities";
import ActivityTable from "src/components/ActivityTable";
import { Activity } from "src/utils/interface";
import { ActivityDashboard } from "src/components/ActivityDashboard";
import { UserDashboard } from "src/components/UserDashboard";
import usersControllers from "src/controllers/users";

function TablesTableRow({
  users,
  activities,
}: {
  activities: Activity[];
  users: UserData[];
}) {
  const { user, error } = useUser();
  const { data: userDb, isLoading } = useQuery(["userDb", user], () =>
    getOrCreateUser(user)
  );
  const [active, setActive] = useState(true);
  const textColor = useColorModeValue("gray.700", "white");
  const handleSection = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).id === "users") return setActive(true);
    setActive(false);
  };
  if (isLoading || !userDb.data) return <div>Loading...</div>;
  if (!userDb.data.isAdmin) return <NotFound />;
  return (
    <>
      <Layout>
        <Box></Box>
        <Box overflowX={{ sm: "scroll", xl: "hidden" }} mt={5} ml={5}>
          <Box p="6px 0px 22px 0px" display={"inline-flex"} gap={10}>
            <Text
              fontSize="xl"
              color={active ? textColor : "gray"}
              fontWeight="bold"
              id="users"
              onClick={(e) => handleSection(e)}
              cursor="pointer"
            >
              Users Dashboard
            </Text>
            <Text
              id="activities"
              fontSize="xl"
              color={!active ? textColor : "gray"}
              fontWeight="bold"
              onClick={(e) => handleSection(e)}
              cursor="pointer"
            >
              Activities Dashboard
            </Text>
          </Box>
          {active ? (
            <UserDashboard users={users} />
          ) : (
            <ActivityDashboard activities={activities} />
          )}
        </Box>
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  //   const queryClient = new QueryClient(); //https://tanstack.com/query/v4/docs/guides/ssr

  const users = JSON.parse(JSON.stringify(await usersControllers.getUsers()));
  const activities = JSON.parse(
    JSON.stringify(await ActivitiesControles.getActivities({}))
  );
  return {
    props: {
      users: users,
      activities: activities,
    },
  };
};
export default TablesTableRow;
