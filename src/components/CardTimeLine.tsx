import { Text, HStack, VStack, Button, Image, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useQuery } from "react-query";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { MdOutlineTripOrigin } from "react-icons/md";

const url =
  "https://res.cloudinary.com/mauro4202214/image/upload/v1663527844/world-travelers/activitydefault_q9aljz.png";

export default function CardTimeLine({ activity, cities }: any) {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        background: "#D1DFE3",
        color: "white",
      }}
      contentArrowStyle={{ borderRight: "7px solid #D1DFE3" }}
      date="20/07/2022"
      iconStyle={{ background: "#293541", color: "#02b1b1" }}
      icon={<MdOutlineTripOrigin />}
    >
      <HStack height={"150px"} width={"100%"} justifyContent={"space-around"}>
        <Image
          src={activity?.image != null ? activity?.image : url}
          alt={activity?.name}
          rounded={"lg"}
          boxShadow={"0px 10px 13px -7px #000000"}
          height={"100%"}
        />
        <VStack align={"center"}>
          <Heading
            font-size={"20px"}
            paddingBottom={"15px"}
            color={"#293541"}
            fontFamily={"body"}
            fontWeight={500}
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
              see more info of this activity
            </Button>
          </NextLink>
        </VStack>
      </HStack>
    </VerticalTimelineElement>
  );
}
