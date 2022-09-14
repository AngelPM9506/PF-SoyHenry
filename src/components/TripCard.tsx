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
} from "@chakra-ui/react";

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
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"300px"}
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
          />
        </Box>
        <Stack pt={10} height={"120px"} align={"center"}>
          <Heading
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={600}
            textAlign={"center"}
          >
            {props.name}
          </Heading>
        </Stack>
        <Stack direction={"row"} align={"center"}>
          <Text fontWeight={400} fontSize={"xl"}>
            Duration: from {props.initDate.slice(0, 10)} to{" "}
            {props.endDate.slice(0, 10)}
          </Text>
        </Stack>
        {/* <Text fontWeight={800} fontSize={"xl"}>
              N of Travelers: {props.tripOnUser.length}
            </Text>
            <Text fontWeight={800} fontSize={"xl"}>
              Activities: {props.activities.map((a: any) => a.name)}
            </Text> */}

        <Stack>
          <Text fontWeight={700} fontSize={"xl"}>
            $ {props.price}
          </Text>
        </Stack>
        <Link href={`/trips/${props.id}`}> See more info of this trip </Link>
        <Button
          w={"full"}
          mt={8}
          bg={useColorModeValue("#151f21", "gray.900")}
          color={"white"}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          <Link href={`/pasarella`}> Join the Trip! </Link>
        </Button>
      </Box>
    </Center>
  );
}
