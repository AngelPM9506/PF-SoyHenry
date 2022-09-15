import {
  Box,
  chakra,
  Container,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  HStack,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { ReactNode } from "react";

const Logo = (props: any) => {
  return (
    <Image
      src="https://drive.google.com/uc?id=1gKEypG3nEJaIizOy_3BjPyYb8IWYApck"
      alt="logo"
      height={"60px"}
    />
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={"transparent"}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box bg={"transparent"} color={useColorModeValue("gray.700", "gray.200")}>
      <Box
        borderTopWidth={2}
        borderStyle={"solid"}
        borderColor={useColorModeValue("#D1DFE3", "#F3B46F")}
      >
        <Container
          bg={"transparent"}
          as={Stack}
          maxW={"8xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <HStack>
            <Logo />
            <Link href="Authors">Authors</Link>
          </HStack>

          <Text>© 2022 World Travelers. All rights reserved</Text>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            direction={"row"}
            spacing={6}
          >
            <SocialButton
              label={"GitHub"}
              href={"https://github.com/AngelPM9506/PF-SoyHenry"}
            >
              <FaGithub />
            </SocialButton>
            <Text>GitHub Repository</Text>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
