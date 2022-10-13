import {
  Image,
  Flex,
  Text,
  Center,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import Layout from "./layout/Layout";
export default function Loading() {
  return (
    <>
      <Stack
        height={"75vh"}
        direction={"column"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Center bg="none">
          <Image
            h={["150px", "150px", "200px"]}
            src={
              "https://res.cloudinary.com/santino/image/upload/v1665663116/worldTravelers/Loading_qxacon.gif"
            }
            alt="loading"
          />
        </Center>
        <Center>
          <Text
            color={useColorModeValue("#293541", "#F3B46F")}
            fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "5xl" }}
            fontWeight="bold"
            fontFamily={"poppins"}
            fontStyle={"italic"}
            textAlign={"center"}
            textShadow={"2px 2px 2px #000000"}
          >
            Loading...
          </Text>
        </Center>
      </Stack>
    </>
  );
}