import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Trip, Activity } from "src/utils/interface";
import {
  Box,
  Heading,
  Image,
  Text,
  Center,
  useColorModeValue,
  Stack,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import { settings } from "src/utils/AvatarCarousel";
import { User } from "../utils/interface";

interface Props {
  users: User[];
}

export const AvatarCarousel = (props: any) => {
  const defaultpic: string =
    "https://res.cloudinary.com/mauro4202214/image/upload/v1663331567/world-travelers/favicon.ico_c8ryjz.png";

  return (
    <Box>
      <Text
        fontSize={{ base: "16px", lg: "18px" }}
        color={useColorModeValue("#F3B46F", "#F3B46F")}
        fontWeight={"500"}
        textTransform={"uppercase"}
        textAlign={"left"}
        ml={"10px"}
        mb={"30px"}
        height={"10px"}
      >
        Meet the Travelers that are already in this trip !
      </Text>
      <Box ml={"20px"}>
        <AvatarGroup size="lg" max={3} spacing={-2}>
          <Avatar
            border={"none"}
            name="Ryan Florence"
            src="https://bit.ly/ryan-florence"
          />
          <Avatar
            border={"none"}
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
          />
          <Avatar
            border={"none"}
            name="Kent Dodds"
            src="https://bit.ly/kent-c-dodds"
          />
          <Avatar
            border={"none"}
            name="Prosper Otemuyiwa"
            src="https://bit.ly/prosper-baba"
          />
          <Avatar
            border={"none"}
            name="Christian Nwamba"
            src="https://bit.ly/code-beast"
          />
        </AvatarGroup>
      </Box>
    </Box>
  );

  //   return (
  //     <>
  //       <Box p={5} mt={"20px"}>
  //         <Heading textAlign={"center"}>Users </Heading>
  //       </Box>
  //       <Box width={"100%"} justifyContent={"center"} align={"center"}>
  //         <Stack width={"80%"}>
  //           <Slider {...settings}>
  //             {props?.map((a) => {
  //               return (
  //                 <Center p={8} py={12} key={a.id}>
  //                   <Box
  //                     role={"group"}
  //                     p={6}
  //                     maxW={"330px"}
  //                     w={"full"}
  //                     rounded={"lg"}
  //                     pos={"relative"}
  //                     zIndex={1}
  //                   >
  //                     <Box
  //                       rounded={"lg"}
  //                       mt={-12}
  //                       pos={"relative"}
  //                       height={"230px"}
  //                       _after={{
  //                         transition: "all .3s ease",
  //                         content: '""',
  //                         w: "full",
  //                         h: "full",
  //                         pos: "absolute",
  //                         top: 5,
  //                         left: 0,
  //                         filter: "blur(15px)",
  //                         zIndex: -1,
  //                       }}
  //                       _groupHover={{
  //                         _after: {
  //                           filter: "blur(20px)",
  //                         },
  //                       }}
  //                     >
  //                       <Image
  //                         rounded={"100%"}
  //                         height={230}
  //                         width={282}
  //                         objectFit={"cover"}
  //                         src={a.image ? a.image : defaultpic}
  //                       />
  //                       <Text>Nombre</Text>
  //                     </Box>
  //                   </Box>
  //                 </Center>
  //               );
  //             })}
  //           </Slider>
  //         </Stack>
  //       </Box>
  //     </>
  //   );

  // return (
  //   <>
  //     <Box p={5} mt={"5px"}>
  //       <Text
  //         fontSize={{ base: "16px", lg: "18px" }}
  //         color={useColorModeValue("#F3B46F", "#F3B46F")}
  //         fontWeight={"500"}
  //         textTransform={"uppercase"}
  //         textAlign={"center"}
  //         ml={"10px"}
  //         mb={"5px"}
  //         height={"10px"}
  //       >
  //         Meet the Travelers that are already in this trip !
  //       </Text>
  //     </Box>
  //     <Box
  //       height={"160px"}
  //       width={"100%"}
  //       justifyContent={"center"}
  //       align={"center"}
  //     >
  //       <Stack width={"75%"} height={"100%"}>
  //         <Slider {...settings}>
  //           <Center marginBottom={"15px"} key={"1"}>
  //             <Box
  //               role={"group"}
  //               height={"100%"}
  //               maxW={"330px"}
  //               w={"full"}
  //               rounded={"lg"}
  //               pos={"relative"}
  //               zIndex={1}
  //             >
  //               <Box
  //                 rounded={"lg"}
  //                 pos={"relative"}
  //                 _after={{
  //                   transition: "all .3s ease",
  //                   content: '""',
  //                   w: "full",
  //                   h: "full",
  //                   pos: "absolute",
  //                   top: 5,
  //                   left: 0,
  //                   filter: "blur(15px)",
  //                   zIndex: -1,
  //                 }}
  //                 _groupHover={{
  //                   _after: {
  //                     filter: "blur(20px)",
  //                   },
  //                 }}
  //               >
  //                 <Image
  //                   rounded={"100%"}
  //                   height={"80px"}
  //                   width={"80px"}
  //                   objectFit={"cover"}
  //                   src={defaultpic}
  //                 />
  //                 <Text>Mauro</Text>
  //               </Box>
  //             </Box>
  //           </Center>
  //           <Center key={"1"}>
  //             <Box
  //               role={"group"}
  //               height={"100%"}
  //               maxW={"330px"}
  //               w={"full"}
  //               rounded={"lg"}
  //               pos={"relative"}
  //               zIndex={1}
  //             >
  //               <Box
  //                 rounded={"lg"}
  //                 pos={"relative"}
  //                 _after={{
  //                   transition: "all .3s ease",
  //                   content: '""',
  //                   w: "full",
  //                   h: "full",
  //                   pos: "absolute",
  //                   top: 5,
  //                   left: 0,
  //                   filter: "blur(15px)",
  //                   zIndex: -1,
  //                 }}
  //                 _groupHover={{
  //                   _after: {
  //                     filter: "blur(20px)",
  //                   },
  //                 }}
  //               >
  //                 <Image
  //                   rounded={"100%"}
  //                   height={"80px"}
  //                   width={"80px"}
  //                   objectFit={"cover"}
  //                   src={defaultpic}
  //                 />
  //                 <Text>Jony</Text>
  //               </Box>
  //             </Box>
  //           </Center>
  //           <Center key={"1"}>
  //             <Box
  //               role={"group"}
  //               height={"100%"}
  //               maxW={"330px"}
  //               w={"full"}
  //               rounded={"lg"}
  //               pos={"relative"}
  //               zIndex={1}
  //             >
  //               <Box
  //                 rounded={"lg"}
  //                 pos={"relative"}
  //                 _after={{
  //                   transition: "all .3s ease",
  //                   content: '""',
  //                   w: "full",
  //                   h: "full",
  //                   pos: "absolute",
  //                   top: 5,
  //                   left: 0,
  //                   filter: "blur(15px)",
  //                   zIndex: -1,
  //                 }}
  //                 _groupHover={{
  //                   _after: {
  //                     filter: "blur(20px)",
  //                   },
  //                 }}
  //               >
  //                 <Image
  //                   rounded={"100%"}
  //                   height={"80px"}
  //                   width={"80px"}
  //                   objectFit={"cover"}
  //                   src={defaultpic}
  //                 />
  //                 <Text>Agus</Text>
  //               </Box>
  //             </Box>
  //           </Center>
  //           <Center key={"1"}>
  //             <Box
  //               role={"group"}
  //               height={"100%"}
  //               maxW={"330px"}
  //               w={"full"}
  //               rounded={"lg"}
  //               pos={"relative"}
  //               zIndex={1}
  //             >
  //               <Box
  //                 rounded={"lg"}
  //                 pos={"relative"}
  //                 _after={{
  //                   transition: "all .3s ease",
  //                   content: '""',
  //                   w: "full",
  //                   h: "full",
  //                   pos: "absolute",
  //                   top: 5,
  //                   left: 0,
  //                   filter: "blur(15px)",
  //                   zIndex: -1,
  //                 }}
  //                 _groupHover={{
  //                   _after: {
  //                     filter: "blur(20px)",
  //                   },
  //                 }}
  //               >
  //                 <Image
  //                   rounded={"100%"}
  //                   height={"80px"}
  //                   width={"80px"}
  //                   objectFit={"cover"}
  //                   src={defaultpic}
  //                 />
  //                 <Text>Ale</Text>
  //               </Box>
  //             </Box>
  //           </Center>
  //           <Center key={"1"}>
  //             <Box
  //               role={"group"}
  //               height={"100%"}
  //               maxW={"330px"}
  //               w={"full"}
  //               rounded={"lg"}
  //               pos={"relative"}
  //               zIndex={1}
  //             >
  //               <Box
  //                 rounded={"lg"}
  //                 pos={"relative"}
  //                 _after={{
  //                   transition: "all .3s ease",
  //                   content: '""',
  //                   w: "full",
  //                   h: "full",
  //                   pos: "absolute",
  //                   top: 5,
  //                   left: 0,
  //                   filter: "blur(15px)",
  //                   zIndex: -1,
  //                 }}
  //                 _groupHover={{
  //                   _after: {
  //                     filter: "blur(20px)",
  //                   },
  //                 }}
  //               >
  //                 <Image
  //                   rounded={"100%"}
  //                   height={"80px"}
  //                   width={"80px"}
  //                   objectFit={"cover"}
  //                   src={defaultpic}
  //                 />
  //                 <Text>Migue</Text>
  //               </Box>
  //             </Box>
  //           </Center>
  //           <Center key={"1"}>
  //             <Box
  //               role={"group"}
  //               height={"100%"}
  //               maxW={"330px"}
  //               w={"full"}
  //               rounded={"lg"}
  //               pos={"relative"}
  //               zIndex={1}
  //             >
  //               <Box
  //                 rounded={"lg"}
  //                 pos={"relative"}
  //                 _after={{
  //                   transition: "all .3s ease",
  //                   content: '""',
  //                   w: "full",
  //                   h: "full",
  //                   pos: "absolute",
  //                   top: 5,
  //                   left: 0,
  //                   filter: "blur(15px)",
  //                   zIndex: -1,
  //                 }}
  //                 _groupHover={{
  //                   _after: {
  //                     filter: "blur(20px)",
  //                   },
  //                 }}
  //               >
  //                 <Image
  //                   rounded={"100%"}
  //                   height={"80px"}
  //                   width={"80px"}
  //                   objectFit={"cover"}
  //                   src={defaultpic}
  //                 />
  //                 <Text>Santino</Text>
  //               </Box>
  //             </Box>
  //           </Center>
  //           <Center key={"1"}>
  //             <Box
  //               role={"group"}
  //               height={"100%"}
  //               maxW={"330px"}
  //               w={"full"}
  //               rounded={"lg"}
  //               pos={"relative"}
  //               zIndex={1}
  //             >
  //               <Box
  //                 rounded={"lg"}
  //                 pos={"relative"}
  //                 _after={{
  //                   transition: "all .3s ease",
  //                   content: '""',
  //                   w: "full",
  //                   h: "full",
  //                   pos: "absolute",
  //                   top: 5,
  //                   left: 0,
  //                   filter: "blur(15px)",
  //                   zIndex: -1,
  //                 }}
  //                 _groupHover={{
  //                   _after: {
  //                     filter: "blur(20px)",
  //                   },
  //                 }}
  //               >
  //                 <Image
  //                   rounded={"100%"}
  //                   height={"80px"}
  //                   width={"80px"}
  //                   objectFit={"cover"}
  //                   src={defaultpic}
  //                 />
  //                 <Text>Alejo</Text>
  //               </Box>
  //             </Box>
  //           </Center>
  //         </Slider>
  //       </Stack>
  //     </Box>
  //   </>
  // );
};
