import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Textarea,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

export interface UserData {
  name: string;
  email: string;
  description: string;
  avatar: string;
  tiktok?: string;
  facebook?: string;
  instagram?: string;
  keywords?: string;
  trips?: string[];
}

export const UserProfile = ({ user }: any) => {
  const defaultData: UserData = {
    name: user.name,
    email: user.email,
    avatar: user.picture,
    description: "",
    tiktok: "",
    facebook: "",
    instagram: "",
  };
  const [data, setData] = useState(defaultData);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src={user.picture}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={data.name}
            onChange={(e) => handleChange(e)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={data.email}
            disabled={true}
            onChange={(e) => handleChange(e)}
          />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description"
            _placeholder={{ color: "gray.500" }}
            onChange={(e) => handleChange(e)}
            value={data.description}
          />
        </FormControl>
        <FormControl id="keyworkds">
          <FormLabel>Keywords</FormLabel>
          <Input
            placeholder="Beach, Mountains, Europe, South America"
            _placeholder={{ color: "gray.500" }}
            onChange={(e) => handleChange(e)}
            value={data.description}
            type="text"
          />
        </FormControl>
        <FormControl id="urlTiktok">
          <FormLabel>Tiktok</FormLabel>
          <Input
            placeholder="URL"
            _placeholder={{ color: "gray.500" }}
            type="text"
            onChange={(e) => handleChange(e)}
            value={data.tiktok}
          />
        </FormControl>
        <FormControl id="urlInstagram">
          <FormLabel>Instagram</FormLabel>
          <Input
            placeholder="URL"
            _placeholder={{ color: "gray.500" }}
            type="text"
            onChange={(e) => handleChange(e)}
            value={data.instagram}
          />
        </FormControl>
        <FormControl id="urlFacebook">
          <FormLabel>Facebook</FormLabel>
          <Input
            placeholder="URL"
            _placeholder={{ color: "gray.500" }}
            type="text"
            onChange={(e) => handleChange(e)}
            value={data.facebook}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
