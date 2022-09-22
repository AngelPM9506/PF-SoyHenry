import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdOutlineTripOrigin } from "react-icons/md";
import {
	HStack,
	Image,
	Link,
	Text,
	VStack,
	Button,
	Stack,
	Box,
	StackDivider,
	useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import CardTimeLine from "./CardTimeLine";
import axios from "axios";
import { useRouter } from 'next/router'
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import { useRef, useEffect, useState} from "react";
import usersControllers from "src/controllers/users";
import searchUser from "src/utils/searchUserOnTrip";

export const TimeLine = ({ data }: any) => {
	const router = useRouter()
	const { user, error } = useUser();
	const [userOnTrip, setUserOnTrip] = useState(false);
	

	const { data: userDb, isLoading } = useQuery(
	  ["userDb", user],
	  () => user && getOrCreateUser(user)
	);

	const payTrip = async () => {
		// console.log(data)
		const response = await axios.post('/api/payment/paypal', {
			id: data.id,
			description: data.name,
			price: data.price,
			userID: userDb?.data.id
		})

		router.push(response.data.links ? response.data.links[1].href : '/trips')
	}

	useEffect(() => {
		async function a() {
			const bool = await searchUser(data.id, userDb?.data.id);
			setUserOnTrip(bool)
		}
		a();
	}, [data.id, userDb])

	return (
		<Stack width={"100%"} align={"center"}>
			<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />
			<Box
				bgColor={"#02b1b1"}
				height={"60px"}
				width={"230px"}
				rounded={"lg"}
				padding={"8px"}
				boxShadow={"0px 5px   white"}
			>
				<Text textAlign={"center"} fontWeight={"bold"} fontSize={"2xl"}>
					Trips itinerary
				</Text>
			</Box>
			<VerticalTimeline>
				{data.activitiesOnTrips.length != 0 ? (
					data.activitiesOnTrips.map((activity: any) => (
						<CardTimeLine
							key={activity.id}
							activity={activity.activity}
							cities={data.citiesOnTrips}
						/>
					))
				) : (
					<Text> No Activities found</Text>
				)}

				<VerticalTimelineElement
					className="vertical-timeline-element--work"
					iconStyle={{ background: "#293541", color: "#02b1b1" }}
					icon={<MdOutlineTripOrigin />}
				/>
			</VerticalTimeline>
			<Stack alignItems={"center"} justifyContent={"center"}>
					<Button
						rounded={"lg"}
						w={"100%"}
						pb={"2px"}
						mb={"10px"}
						mt={"0px"}
						size={"lg"}
						py={"8"}
						bg={useColorModeValue("gray.900", "gray.50")}
						color={useColorModeValue("white", "gray.900")}
						textTransform={"uppercase"}
						fontSize={"xl"}
						onClick={() => payTrip()}
						_hover={{
							transform: "translateY(-2px)",
							boxShadow: "lg",
							bg: "#F3B46F",
							color: "#293541",
						}}
						disabled={userOnTrip}
					>
						Pay and Join the trip!
					</Button>
			</Stack>
		</Stack>
	);
};
