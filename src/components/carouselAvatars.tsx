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
  VStack,
} from "@chakra-ui/react";
import { settings } from "src/utils/AvatarCarousel";
import NextLink from "next/link";

export const AvatarCarousel = (props: any) => {
  const defaultpic: string =
    "https://res.cloudinary.com/mauro4202214/image/upload/v1663331567/world-travelers/favicon.ico_c8ryjz.png";

  return (
    <>
      <Box p={5} mt={"5px"}>
        <Text
          fontSize={{ base: "16px", lg: "18px" }}
          color={useColorModeValue("#F3B46F", "#F3B46F")}
          fontWeight={"500"}
          textTransform={"uppercase"}
          textAlign={"center"}
          ml={"10px"}
          mb={"5px"}
          height={"10px"}
        >
          Meet the Travelers that are already in this trip !
        </Text>
      </Box>
      {props.length < 1 ? (
        <Box width={"100%"} textAlign={"center"} fontSize={"lg"} mb={"30px"}>
          No travelers on this trip yet, join and be the first one!
        </Box>
      ) : (
        <Box
          height={"160px"}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack width={"75%"} height={"100%"}>
            <Slider {...settings}>
              {props.props.map((a: any) => {
                return (
                  <Center marginBottom={"15px"} key={a.user.id}>
                    <Box
                      role={"group"}
                      p={6}
                      maxW={"330px"}
                      w={"full"}
                      rounded={"lg"}
                      pos={"relative"}
                      zIndex={1}
                    >
                      <VStack
                        rounded={"lg"}
                        pos={"relative"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
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
                        <NextLink href={`/user/${a.user.id}`}>
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            flexDirection={"column"}
                            cursor={"pointer"}
                          >
                            <Image
                              height={"80px"}
                              width={"80px"}
                              rounded={"100%"}
                              objectFit={"cover"}
                              src={a.user.avatar ? a.user.avatar : defaultpic}
                              alt={a.user.name}
                            />
                            <Text textAlign={"center"} width={"max-content"}>
                              {a.user.name}
                            </Text>
                          </Box>
                        </NextLink>
                      </VStack>
                    </Box>
                  </Center>
                );
              })}
            </Slider>
          </Stack>
        </Box>
      )}
    </>
  );

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
