/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  HStack,
  VStack,
  Button,
  Image,
  Heading,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { useQuery } from "react-query";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { MdOutlineTripOrigin } from "react-icons/md";

const url =
  "https://res.cloudinary.com/mauro4202214/image/upload/v1663527844/world-travelers/activitydefault_q9aljz.png";

export default function CardTimeLine({ activity, actDate, cities }: any) {
  const breakpoints = {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  };
  const datedisorder = actDate.slice(0, 10).split("-");
  let datei = [];
  datei.push(datedisorder[2]);
  datei.push(datedisorder[1]);
  datei.push(datedisorder[0]);
  const date = datei.join("/");

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        background: "#D1DFE3",
        color: useColorModeValue("#293541", "#F3B46F"),
      }}
      contentArrowStyle={{ borderRight: "7px solid #D1DFE3" }}
      date={date}
      iconStyle={{ background: "#293541", color: "#02b1b1" }}
      icon={<MdOutlineTripOrigin />}
    >
      <HStack
        flexDir={{
          base: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
          "2xl": "row",
        }}
        height="max-content"
        width={{ md: "100%" }}
        justifyContent={"space-around"}
        mt="20px"
      >
        <Image
          src={activity?.image != null ? activity?.image : url}
          alt={activity?.name}
          rounded={"lg"}
          boxShadow={"0px 10px 13px -7px #000000"}
          height={"60%"}
          width={{ base: "80%", md: "60%" }}
        />
        <VStack align={"center"}>
          <Heading
            fontSize={["15px", "15px", "30px", "50px"]}
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
          <Link href={`/activities/${activity.id}`} passHref>
            <a>
              <Button bg={"#02b1b1"} color={"#293541"}>
                More Info
              </Button>
            </a>
          </Link>
        </VStack>
      </HStack>
    </VerticalTimelineElement>
  );
}
