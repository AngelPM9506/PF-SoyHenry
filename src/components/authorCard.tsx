import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { TiSocialLinkedin, TiSocialGithub } from "react-icons/ti";
import { ImLink } from "react-icons/im";
import NextLink from "next/link";

interface Props {
  name: string;
  job: string;
  linkedin: string;
  github: string;
  cv: string;
  avatar: string;
  image: string;
}

const AuthorCard = ({
  name,
  job,
  linkedin,
  github,
  cv,
  avatar,
  image,
}: Props) => {
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("RGBA(75,100,124,0.41)", "RGBA(75,100,124,0.41)")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image h={"120px"} w={"full"} src={image} objectFit={"cover"} />
        <Flex justify={"center"} mt={-12}>
          <Avatar size={"xl"} src={avatar} />
        </Flex>

        <Box p={4} pb={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {name}
            </Heading>
            <Text color={"gray.500"}>{job}</Text>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} mt={"6px"}>
            <NextLink href={linkedin}>
              <Button
                w={"300px"}
                bg={useColorModeValue("#151f21", "gray.900")}
                color={"white"}
                rounded={"md"}
                fontSize={"sm"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                <TiSocialLinkedin size={"33"} color={"#F3B46F"} />
                LinkedIn
              </Button>
            </NextLink>
            <NextLink href={github}>
              <Button
                w={"350px"}
                bg={useColorModeValue("#151f21", "gray.900")}
                color={"white"}
                rounded={"md"}
                fontSize={"sm"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                <TiSocialGithub size={"33"} color={"#F3B46F"} />
                GitHub
              </Button>
            </NextLink>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} mt={"6px"}>
            <NextLink href={cv}>
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
            </NextLink>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};

export default AuthorCard;
