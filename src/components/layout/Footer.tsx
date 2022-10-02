import {
  Box,
  Container,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import NextLink from "next/link";

const Logo = () => {
  return (
    <Image
      src="https://res.cloudinary.com/mauro4202214/image/upload/v1663331567/world-travelers/favicon.ico_c8ryjz.png"
      alt="logo"
      height={"60px"}
    />
  );
};

export default function Footer() {
  return (
    <Box
      borderTopWidth={2}
      borderStyle={"solid"}
      borderColor={useColorModeValue("#D1DFE3", "#F3B46F")}
    >
      <Container
        bg={"transparent"}
        as={Stack}
        maxW={"8xl"}
        py={1}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <HStack>
          <Logo />
          <NextLink href="/home">
            <Text id="authors" cursor={"pointer"}>
              Authors
            </Text>
          </NextLink>
        </HStack>

        <Text textAlign={"center"} noOfLines={1}>
          © 2022 World Travelers. All Rights Reserved
        </Text>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          direction={"row"}
          spacing={6}
        >
          <Link
            textDecoration={"none"}
            href={"https://github.com/AngelPM9506/PF-SoyHenry"}
            target="_blank"
          >
            <FaGithub />
          </Link>
          <Link
            textDecoration={"none"}
            href={"https://github.com/AngelPM9506/PF-SoyHenry"}
            target="_blank"
          >
            GitHub Repository
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
