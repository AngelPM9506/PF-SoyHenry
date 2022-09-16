import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
} from "@chakra-ui/react";
import Activities from "src/pages/activities";

// export default function MiniCardAct(activity: any) {
//   return (
//     <Center py={12}>
//       <Box
//         role={"group"}
//         p={6}
//         maxW={"330px"}
//         w={"full"}
//         bg={useColorModeValue("white", "gray.800")}
//         boxShadow={"2xl"}
//         rounded={"lg"}
//         pos={"relative"}
//         zIndex={1}
//       >
//         <Box
//           rounded={"lg"}
//           mt={-12}
//           pos={"relative"}
//           height={"230px"}
//           _after={{
//             transition: "all .3s ease",
//             content: '""',
//             w: "full",
//             h: "full",
//             pos: "absolute",
//             top: 5,
//             left: 0,
//             backgroundImage: `url({activity.image})`,
//             filter: "blur(15px)",
//             zIndex: -1,
//           }}
//           _groupHover={{
//             _after: {
//               filter: "blur(20px)",
//             },
//           }}
//         >
//           <Image
//             rounded={"lg"}
//             height={230}
//             width={282}
//             objectFit={"cover"}
//             src={activity.image}
//           />
//         </Box>
//         <Stack pt={10} align={"center"}>
//           <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
//             {activity.city.name}
//           </Text>
//           <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
//             {activity.name}
//           </Heading>
//         </Stack>
//       </Box>
//     </Center>
//   );
// }

export default function MiniCardAct(activity: any, trip: boolean) {
  return (
    <Link href={!trip ? `activities/${activity.id} ` : `trips/${activity.id} `}>
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"200px"}
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
            height={"120px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url({activity.image})`,
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
              height={"150px"}
              width={282}
              objectFit={"cover"}
              src={
                "https://drive.google.com/uc?id=1YZhzZFB0nRQuLLzmFVq13upFeZQo5CLd"
              }
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              {activity.city || "CITY"}
            </Text>
            <Heading fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
              {activity.name || "ACTIVITY NAME"}
            </Heading>
          </Stack>
        </Box>
      </Center>
    </Link>
  );
}
