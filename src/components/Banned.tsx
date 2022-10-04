import { Box, Button, Image, Link, Text } from "@chakra-ui/react";
import Layout from "src/components/layout/Layout";
import NextLink from "next/link";
import { NextSeo } from "next-seo";
import { AiOutlineArrowDown } from "react-icons/ai";

export const BannedAlert = () => {
  return (
    <Layout>
      <NextSeo title="404" />
      <Box
        alignSelf={"center"}
        width={"90%"}
        height={"100%"}
        minHeight={"75vh"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Box
          marginTop={"10px"}
          marginBottom={"10px"}
          display={"flex"}
          flexDirection={"column"}
          alignSelf={"center"}
          justifyContent={"center"}
          alignItems={"center"}
          width={{ base: "100%", md: "75%" }}
          height={{ base: "max-content", lg: "76vh" }}
          position="relative"
          rounded="2xl"
          boxShadow="2xl"
          overflow="hidden"
          background={"#D1DFE3"}
          padding={"10%"}
        >
          <Image
            objectFit={"cover"}
            rounded={"100%"}
            height={"200px"}
            src={
              "http://drive.google.com/uc?export=view&id=1rrVsOOcFpvgBLmUc29AJOJzyY-eZRDRZ"
            }
            alt={"Error 404 not found"}
          />
          <Text
            textAlign={"center"}
            width="100%"
            color="#293541"
            marginTop={"5px"}
            fontSize={{ base: "2xl", lg: "3xl" }}
            fontWeight={"bold"}
          >
            Your account has been temporarily suspended from World Travelers
            because you may have violated our terms of service.
          </Text>
          <Text
            textAlign={"center"}
            width="100%"
            color="#293541"
            fontSize={{ base: "xl", lg: "2xl" }}
            justifyContent={"center"}
          >
            If you think this can be a mistake, please write to us here!
          </Text>
          <Box height={"50px"}>
            <AiOutlineArrowDown size="100%" color="#293541" />
          </Box>
          <Button
            alignSelf={"center"}
            bg={"#02b1b1"}
            color={"white"}
            fontSize={{ base: "md", md: "xl" }}
            rounded={"md"}
            padding={{ base: "8px", md: "20px", lg: "30px" }}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <NextLink href={"/contact"}> Leave a message</NextLink>
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};
