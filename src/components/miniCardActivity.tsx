import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useQuery } from "react-query";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { MdOutlineTripOrigin } from "react-icons/md";

const url = "https://drive.google.com/uc?id=1_6Nlg2YJEROqakx47LjLzuLjhLifPJ5t";

export default function MiniCardAct({ activity, cities }: any) {
  return (
    <Center>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Image
          rounded={"lg"}
          height={"160px"}
          width={"200px"}
          objectFit={"cover"}
          src={activity?.image != null ? activity?.image : url}
          alt={activity?.name}
        />

        <Stack pt={10} align={"center"}>
          {cities?.map((c) => {
            if (c.city.id === activity?.cityId) {
              return (
                <Text
                  color={"gray.500"}
                  fontSize={"sm"}
                  textTransform={"uppercase"}
                >
                  {c.city.name}
                </Text>
              );
            }
          })}
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {activity?.name}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
}
