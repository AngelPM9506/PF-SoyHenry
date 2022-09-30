import { Box, Button, Image, Link } from "@chakra-ui/react";
import Layout from "src/components/layout/Layout";
import NextLink from "next/link";
import { NextSeo } from "next-seo";

const NotFound = () => {
  return (
    <Layout>
      <NextSeo title="404" />
      <Box
        alignSelf={"center"}
        width={"90%"}
        height={"100%"}
        minHeight={"80vh"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Box
          alignSelf={"center"}
          justifyContent={"center"}
          alignItems={"center"}
          width={{ base: "100%", md: "75%" }}
          height={"100%"}
          position="relative"
          rounded="2xl"
          boxShadow="2xl"
          overflow="hidden"
        >
          <Image
            objectFit={"cover"}
            src={"https://i.vgy.me/zG6dQP.png"}
            alt={"Error 404 not found"}
          />
          <Button
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            bg={"#02b1b1"}
            color={"white"}
            marginRight={"55px"}
            fontSize={{ base: "md", md: "xl" }}
            rounded={"md"}
            padding={{ base: "8px", md: "20px", lg: "30px" }}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            display={{ base: "none", md: "flex" }}
          >
            <NextLink href={"/home"}>
              <Link href="/home">Go back home</Link>
            </NextLink>
          </Button>
        </Box>
        <Button
          bg={"#02b1b1"}
          color={"white"}
          fontSize={{ base: "xl", md: "xl" }}
          rounded={"xl"}
          padding={{ base: "20px", md: "30px" }}
          marginTop={"20px"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          display={{ base: "flex", md: "none" }}
        >
          <NextLink href={"/home"}>
            <Link href="/home">Go back home</Link>
          </NextLink>
        </Button>
      </Box>
    </Layout>
  );
};

export default NotFound;
