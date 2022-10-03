import { useUser } from "@auth0/nextjs-auth0";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Layout from "src/components/layout/Layout";
import { UserData } from "src/components/UserProfile";

import { getOrCreateUser, updateUser } from "src/utils/User";

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

import { editActivity } from "src/utils/activities";

import { NextSeo } from "next-seo";


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
				<NextSeo title="Admin Panel" />
				<Box overflowX={{ base: "scroll", xl: "initial" }} mt={12} ml={5} p={7}>
					<Flex
						textAlign={{ base: "center", xl: "left" }}
						p="6px 0px 22px 0px"
						direction={{ base: "column", xl: "row" }}
						gap={{ base: 3, xl: 10 }}
					>
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
					</Flex>
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
