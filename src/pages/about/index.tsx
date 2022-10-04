import Layout from "src/components/layout/Layout";
import {
  Heading,
  Text,
  Box,
  Stack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import AboutCarousel from "src/components/AboutCarousel";
import { NextSeo } from "next-seo";

const AboutPage = () => {
  return (
    <Layout>
      <NextSeo title="About" />
      <Stack
        alignSelf={"center"}
        direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
        margin={"2%"}
        paddingTop={{ base: "8%", sm: "4%", md: "4%", lg: "2%" }}
      >
        <Heading
          textAlign={"center"}
          textShadow={"2px 2px #02b1b1"}
          fontWeight={"extrabold"}
          fontStyle={"oblique"}
          fontSize={{ base: "2xl", md: "4xl", lg: "8xl" }}
          marginLeft={{ base: "0%", sm: "0%", md: "0%", lg: "5%" }}
        >
          This is World Travelers
        </Heading>
        <Box
          alignSelf={"center"}
          maxWidth={{ base: "90%", sm: "98%", md: "98%", lg: "90%" }}
          paddingTop={"1%"}
          paddingLeft={{ base: "0", sm: "0", md: "5%", lg: "5%" }}
          paddingRight={{ base: "0", sm: "0", md: "5%", lg: "5%" }}
        >
          <Text
            fontSize={{ base: "sm", sm: "xs", md: "md", lg: "xl" }}
            textAlign={"justify"}
            lineHeight={"taller"}
          >
            Welcome to World Travelers! Our app is the perfect place for you to
            find and join group trips. With World Travelers, you can easily find
            and connect with other travelers who are interested in visiting the
            same places as you. With our app, you can also create your own group
            trip and invite others to join.
            <Divider marginTop={"2%"} />
          </Text>
          <Text
            marginTop={"2%"}
            fontStyle={"oblique"}
            fontSize={{ base: "sm", md: "md", lg: "xl" }}
            textAlign={"justify"}
            lineHeight={"taller"}
            color={useColorModeValue("#293541", "#F3B46F")}
          >
            So what are you waiting for? Start planning your next adventure with
            World Travelers today and make new friends and memories that will
            last a lifetime!
          </Text>
        </Box>
      </Stack>
      <AboutCarousel />
    </Layout>
  );
};

export default AboutPage;
