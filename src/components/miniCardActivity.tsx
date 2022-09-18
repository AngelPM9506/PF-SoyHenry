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
import { useQuery } from "react-query";
const url = "https://drive.google.com/uc?id=1_6Nlg2YJEROqakx47LjLzuLjhLifPJ5t";

export default function MiniCardAct({ activity, cities }: any) {
  console.log("1", activity);
  console.log("2", cities);
  return (
    <Center py={12}>
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

// export default function MiniCardAct(activity: any, trip: boolean) {
//   return (
//     <Link href={!trip ? `activities/${activity.id} ` : `trips/${activity.id} `}>
//       <Center py={12}>
//         <Box
//           role={"group"}
//           p={6}
//           maxW={"200px"}
//           w={"full"}
//           bg={useColorModeValue("white", "gray.800")}
//           boxShadow={"2xl"}
//           rounded={"lg"}
//           pos={"relative"}
//           zIndex={1}
//         >
//           <Box
//             rounded={"lg"}
//             mt={-12}
//             pos={"relative"}
//             height={"120px"}
//             _after={{
//               transition: "all .3s ease",
//               content: '""',
//               w: "full",
//               h: "full",
//               pos: "absolute",
//               top: 5,
//               left: 0,
//               backgroundImage: `url({activity.image})`,
//               filter: "blur(15px)",
//               zIndex: -1,
//             }}
//             _groupHover={{
//               _after: {
//                 filter: "blur(20px)",
//               },
//             }}
//           >
//             <Image
//               rounded={"lg"}
//               height={"150px"}
//               width={282}
//               objectFit={"cover"}
//               src={
//                 "https://drive.google.com/uc?id=1YZhzZFB0nRQuLLzmFVq13upFeZQo5CLd"
//               }
//             />
//           </Box>
//           <Stack pt={10} align={"center"}>
//             <Text
//               color={"gray.500"}
//               fontSize={"sm"}
//               textTransform={"uppercase"}
//             >
//               {activity.city || "CITY"}
//             </Text>
//             <Heading fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
//               {activity.name || "ACTIVITY NAME"}
//             </Heading>
//           </Stack>
//         </Box>
//       </Center>
//     </Link>
//   );
// }
