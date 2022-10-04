import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Link,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
const defaultpic: string =
  "https://drive.google.com/uc?id=1YZhzZFB0nRQuLLzmFVq13upFeZQo5CLd";

export function TripCard({ props }: any) {
  return (
    <Center key={props.id} py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("RGBA(75,100,124,0.41)", "RGBA(75,100,124,0.41)")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        minH="100%"
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"190px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={260}
            width={282}
            objectFit={"cover"}
            src={props.image ? props.image : defaultpic}
            boxShadow={"0px 10px 13px -7px #000000"}
            alt="image card Trip"
          />
        </Box>
        <Stack marginTop={"80px"} height={"80px"} align={"center"}>
          <Heading
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={600}
            textAlign={"center"}
            textTransform={"capitalize"}
            noOfLines={1}
          >
            {props.name}
          </Heading>
        </Stack>
        <VStack direction={"row"} align={"center"} marginTop={"-25px"}>
          <Text fontWeight={400} fontSize={"18px"}>
            From <b>{new Date(props.initDate).toLocaleDateString()}</b> To{" "}
            <b>{new Date(props.endDate).toLocaleDateString()}</b>
          </Text>
        </VStack>
        <VStack direction={"row"} align={"center"}>
          <Text fontWeight={800} fontSize={"xl"} marginBottom="-15px">
            Cities:
          </Text>
          <Text fontWeight={400} fontSize={"xl"} textTransform={"capitalize"} noOfLines={1}>
            {props.citiesOnTrips.map(
              (a: any, i: any) =>
                ` ${a.city.name} ` +
                (i == props.citiesOnTrips.length - 1 ? "" : "-")
            )}
          </Text>
        </VStack>

        <Stack>
          <Text
            marginTop={"10px"}
            textAlign={"center"}
            fontWeight={700}
            fontSize={"xl"}
          >
            US$ {props.price}
          </Text>
        </Stack>
        <Stack marginTop={"5px"} textAlign={"center"} justifyContent={"center"}>
            <Button
              w={"full"}
              mt={5}
              bg={useColorModeValue("#151f21", "#f4f4f4")}
              color={useColorModeValue("#f4f4f4", "#151f21")}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
            <NextLink href={`/trips/${props.id}`}>
            <Link>
              See more Information
              </Link>
              </NextLink>
            </Button>
        </Stack>
      </Box>
    </Center>
  );
}
