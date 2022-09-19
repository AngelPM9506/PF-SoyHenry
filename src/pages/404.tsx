import { Box, Button, Image, Link } from "@chakra-ui/react";
import Layout from "src/components/layout/Layout";
import NextLink from "next/link";

const NotFound = () => {
  return (
    <Layout>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Box
          margin={"30px"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"65%"}
          position="relative"
          rounded="2xl"
          boxShadow="2xl"
          overflow="hidden"
        >
          <Image
            objectFit={"cover"}
            src="https://i.vgy.me/zG6dQP.png"
            alt={"Error 404 not found"}
          />
        </Box>
        <Box position={"absolute"} top={"400px"} right={"550px"}>
          <Button
            bg={"#02b1b1"}
            color={"white"}
            marginRight={"55px"}
            fontSize={"xl"}
            rounded={"md"}
            padding={"30px"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            <NextLink href={"/home"}>
              <Link href="/home">Go back home</Link>
            </NextLink>
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default NotFound;
