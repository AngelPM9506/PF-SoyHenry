import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";
import { Activity } from "src/utils/interface";
import { upPrice } from "src/components/Carousel";
import NextLink from "next/link";

interface Props {
  associatedAct: Activity[];
}

const url =
  "https://res.cloudinary.com/mauro4202214/image/upload/v1663527844/world-travelers/activitydefault_q9aljz.png";

export const ModalActivities = ({ associatedAct }: Props) => {
  return (
    <Center>
      {associatedAct &&
        associatedAct.map((act) => (
          <Box
            key={act.id}
            role={"group"}
            p={6}
            maxW={"330px"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={1}
            margin={2}
          >
            <Image
              rounded={"md"}
              height={"100px"}
              width={"100px"}
              objectFit={"cover"}
              src={act?.image != null ? act?.image.toString() : url}
              alt={act?.name}
            />

            <Stack pt={2} display={"flex"} alignItems={"center"}>
              <Text fontSize={"md"} fontFamily={"body"} fontWeight={100}>
                {act?.name}
              </Text>
              <Text fontWeight={100} fontSize={"lg"}>
                {`$${act?.price}`}
              </Text>
              <Text textDecoration={"line-through"} color={"#F3B46F"}>
                {`$${upPrice(act?.price)}`}
              </Text>
              <NextLink href={`/activities/${act.id}`}>
                <Button size={"xs"}>+Info</Button>
              </NextLink>
              <Button size={"sm"}>Add</Button>
            </Stack>
          </Box>
        ))}
    </Center>
  );
};

export default ModalActivities;
