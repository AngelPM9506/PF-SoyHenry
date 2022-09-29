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
        direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
        margin={"2%"}
      >
        <Heading
          textShadow={"2px 2px #02b1b1"}
          fontWeight={"extrabold"}
          fontStyle={"oblique"}
          fontSize={{ base: "2xl", md: "4xl", lg: "8xl" }}
          marginLeft={"5%"}
        >
          This is World Travelers
        </Heading>
        <Box paddingTop={"1%"} paddingLeft={"3%"} paddingRight={"6%"}>
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
