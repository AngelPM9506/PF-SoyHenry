/* eslint-disable react-hooks/rules-of-hooks */

import {
  Box,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Heading,
  Avatar,
  Center,
  Flex,
  Button,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Layout from "src/components/layout/Layout";
import getauthorsinfo from "../utils/authors";
import Loading from "src/components/Loading";
import { useQuery } from "react-query";
import { TiSocialLinkedin, TiSocialGithub } from "react-icons/ti";
import { ImLink } from "react-icons/im";
import NextLink from "next/link";

const dayimage =
  "http://drive.google.com/uc?export=view&id=1fkNhSwwPL3E2HzNqQlDRh1lQt26hMA6-";
const nightimage =
  "http://drive.google.com/uc?export=view&id=1M-mmBYm7veoWsGaxepcS4A53ak1qW-8i";

function shuffle(array: object[]) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const Authors = () => {
  const { isLoading, data } = useQuery(["info"], () => getauthorsinfo());

  if (isLoading || !data) return <Loading />;
  shuffle(data);
  return (
    <Layout>
      <NextSeo title="World Travelers" />
      <Stack
        alignSelf={"center"}
        width={"100vw"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        pb={"20px"}
      >
        <Stack
          width={{ base: "90%", xl: "71%" }}
          bg={useColorModeValue(
            "RGBA(209,223,227,0.6)",
            "RGBA(209,223,227,0.1)"
          )}
          display={"flex"}
          justifyContent={"space-around"}
          rounded={"20px"}
          marginTop={"20px"}
          pb={"25px"}
          boxShadow={"1px 1px 15px 2px rgba(0,0,0,0.20)"}
        >
          <Image
            alignSelf={"center"}
            width={{ base: "80%", sm: "65%", md: "50%" }}
            src={useColorModeValue(dayimage, nightimage)}
            alt={"title"}
          />
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            columnGap={"6"}
            rowGap={"6"}
            width={"100%"}
            paddingLeft={"20px"}
            paddingRight={"20px"}
            alignSelf={"center"}
          >
            {data?.map((a) => (
              <Center key={a.name} py={6} pb={0} pt={0}>
                <Box
                  maxW={"270px"}
                  w={"full"}
                  bg={useColorModeValue(
                    "RGBA(75,100,124,0.41)",
                    "RGBA(75,100,124,0.41)"
                  )}
                  boxShadow={"2xl"}
                  rounded={"md"}
                  overflow={"hidden"}
                >
                  <Image
                    h={"120px"}
                    w={"full"}
                    src={a.image}
                    alt={a.name}
                    objectFit={"cover"}
                  />
                  <Flex justify={"center"} mt={-12}>
                    <Avatar size={"xl"} src={a.avatar} />
                  </Flex>

                  <Box p={4} pb={6}>
                    <Stack spacing={0} align={"center"} mb={5}>
                      <Heading
                        fontSize={"2xl"}
                        fontWeight={500}
                        fontFamily={"body"}
                      >
                        {a.name}
                      </Heading>
                      <Text color={"gray.500"}>{a.job}</Text>
                    </Stack>
                    <Stack
                      direction={"row"}
                      justifyContent={"center"}
                      mt={"6px"}
                    >
                       <a href={a.linkedin} rel="noreferrer noopener" target="_blank">
                        <Button
                          w={"100%"}
                          bg={useColorModeValue("#151f21", "gray.900")}
                          color={"white"}
                          rounded={"md"}
                          fontSize={"sm"}
                          _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                          }}
                        >
                          <TiSocialLinkedin size={"23"} color={"#F3B46F"} />
                          LinkedIn
                        </Button>
                      </a>
                      <a href={a.github} rel="noreferrer noopener" target="_blank">
                        <Button
                          w={"100%"}
                          bg={useColorModeValue("#151f21", "gray.900")}
                          color={"white"}
                          rounded={"md"}
                          fontSize={"sm"}
                          _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                          }}
                        >
                          <TiSocialGithub size={"25"} color={"#F3B46F"} />
                          GitHub
                        </Button>
                      </a>
                    </Stack>
                    <Stack
                      direction={"row"}
                      justifyContent={"center"}
                      mt={"6px"}
                    >
                      {/*eslint-disable-next-line @next/next/no-html-link-for-pages*/}

                      <a href={a.cv} rel="noreferrer noopener" target="_blank">
                        <Button
                          marginTop={"6px"}
                          width={"100%"}
                          bg={useColorModeValue("#151f21", "gray.900")}
                          color={"white"}
                          rounded={"md"}
                          fontSize={"sm"}
                          _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                          }}
                          justifyContent={"space-around"}
                        >
                          <ImLink />
                          Curriculum / Portfolio
                        </Button>
                      </a>
                    </Stack>
                  </Box>
                </Box>
              </Center>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Authors;
