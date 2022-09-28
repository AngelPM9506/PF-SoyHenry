import { Text, HStack, VStack, Button, Image, Heading, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { useQuery } from "react-query";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { MdOutlineTripOrigin } from "react-icons/md";

const url =
	"https://res.cloudinary.com/mauro4202214/image/upload/v1663527844/world-travelers/activitydefault_q9aljz.png";

export default function CardTimeLine({ activity, actDate, cities }: any) {

	const breakpoints = {
		sm: '30em',
		md: '48em',
		lg: '62em',
		xl: '80em',
		'2xl': '96em',
	}


	const date = actDate.slice(0, 10).split("-").reverse().join("/");
	return (
		<VerticalTimelineElement
			className="vertical-timeline-element--work"
			contentStyle={{
				background: "#D1DFE3",
				color: "white",
			}}
			contentArrowStyle={{ borderRight: "7px solid #D1DFE3" }}
			date={date}
			iconStyle={{ background: "#293541", color: "#02b1b1" }}
			icon={<MdOutlineTripOrigin />}
		>
			<HStack flexDir={{base: "column", sm: "column", md: "row", lg:"row", xl: "row", '2xl': "row"}} height={"170px"} width="100%" justifyContent={"space-around"} mt="20px">
				<Image
					src={activity?.image != null ? activity?.image : url}
					alt={activity?.name}
					rounded={"lg"}
					boxShadow={"0px 10px 13px -7px #000000"}
					height={"80%"}
				/>
				<VStack align={"center"}>
					<Heading
						fontSize={['15px', '15px', '30px', '50px']}
						paddingBottom={"15px"}
						color={"#293541"}
						fontFamily={"body"}
						fontWeight={500}
						mt="10px"
					>
						{activity?.name}
					</Heading>

					{cities?.map((c: any) => {
						if (c.city.id === activity?.cityId) {
							return (
								<Text
									key={c.city.name}
									font-size={"15px"}
									paddingBottom={"15px"}
									color={"#293541"}
								>
									{c.city.name}
								</Text>
							);
						}
					})}
					<NextLink href={`/activities/${activity.id}`}>
						<Button bg={"#02b1b1"} color={"#293541"}>
							More Info
						</Button>
					</NextLink>
				</VStack>
			</HStack>
		</VerticalTimelineElement>
	);
}
