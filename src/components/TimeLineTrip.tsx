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

export const TimeLine = ({ data }: any) => {
	const router = useRouter()

	const payTrip = async () => {
		// console.log(data)
		const response = await axios.post('/api/payment/paypal', {
			id: data.id,
			description: data.name,
			price: data.price
		})

		router.push(response.data.links[1].href)
	}

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
					>
						Pay and Join the trip!
					</Button>
				{/* <NextLink href={"/pasarella"}>
				</NextLink> */}
			</Stack>
		</Stack>
	);
};
