import { useUser } from "@auth0/nextjs-auth0";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

import React, { useState } from "react";
import { useQuery } from "react-query";
import Layout from "src/components/layout/Layout";
import { UserData } from "src/components/UserProfile";

import { getOrCreateUser } from "src/utils/User";

import NotFound from "src/pages/404";

import ActivitiesControles from "src/controllers/activities";

import { Activity, CityInDB, Trip } from "src/utils/interface";
import { ActivityDashboard } from "src/components/ActivityDashboard";
import { UserDashboard } from "src/components/UserDashboard";
import usersControllers from "src/controllers/users";
import { TripDashboard } from "src/components/TripDashboard";
import TripsControllers from "src/controllers/trips";

import Loading from "src/components/Loading";

import { getCities } from "src/utils/cities";

function TablesTableRow({
  users,
  activities,
  trips,
}: {
  activities: Activity[];
  users: UserData[];
  trips: Trip[];
  cities?: CityInDB[];
}) {
  const { user } = useUser();
  const { data: userDb, isLoading } = useQuery(["userDb", user], () =>
    getOrCreateUser(user)
  );
  const [active, setActive] = useState("users");

  const textColor = useColorModeValue("gray.700", "white");

  const handleSection = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).id === "users") return setActive("users");
    if ((e.target as HTMLElement).id === "activities")
      return setActive("activities");
    if ((e.target as HTMLElement).id === "trips") return setActive("trips");
  };

  if (isLoading || !userDb?.data) return <Loading />;

  if (!userDb.data.isAdmin) return <NotFound />;

  return (
    <>
      <Layout>
        <Box overflowX={{ sm: "scroll", xl: "hidden" }} mt={5} ml={5}>
          <Box p="6px 0px 22px 0px" display={"inline-flex"} gap={10}>
            <Text
              fontSize="xl"
              color={active === "users" ? textColor : "gray"}
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
              color={active === "activities" ? textColor : "gray"}
              fontWeight="bold"
              onClick={(e) => handleSection(e)}
              cursor="pointer"
            >
              Activities Dashboard
            </Text>
            <Text
              fontSize="xl"
              color={active === "trips" ? textColor : "gray"}
              fontWeight="bold"
              id="trips"
              onClick={(e) => handleSection(e)}
              cursor="pointer"
            >
              Trips Dashboard
            </Text>
          </Box>
          {active === "users" && <UserDashboard users={users} />}
          {active === "activities" && (
            <ActivityDashboard activities={activities} />
          )}
          {active === "trips" && (
            <TripDashboard trips={trips} activities={activities} />
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
  const trips = JSON.parse(JSON.stringify(await TripsControllers.getTrips({})));
  const cities = await getCities();
  return {
    props: {
      users: users,
      activities: activities,
      trips: trips,
      cities: cities,
    },
  };
};
export default TablesTableRow;
