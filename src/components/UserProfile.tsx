import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Box,
  Avatar,
  Grid,
  GridItem,
  Center,
  useToast,
  Textarea,
  SimpleGrid,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { ChangeEvent, SetStateAction, useState, useEffect } from "react";
import { updateUser, UserAuth0, getOrCreateUser } from "src/utils/User";
import { Cloudinary } from "@cloudinary/url-gen";
import { useQuery, useQueryClient } from "react-query";
const { CLOUDINARY_NAME } = process.env;
import Layout from "./layout/Layout";
import {
  profileControl,
  threeKeyWords,
  validateKeyWords,
} from "src/utils/validations";
import { Errors } from "src/utils/interface";

export interface UserData {
  user?: any;
  id?: string;
  userDetail?: any;
  name?: string;
  email?: string;
  picture?: string;
  mail?: string;
  description?: string;
  avatar?: string | ArrayBuffer;
  urlTikTok?: string;
  urlFaceBook?: string;
  urlInstagram?: string;
  keyWords?: string;
  trips?: string[];
  data?: {
    isAdmin?: any;
    [x: string]: any;
    avatar?: any;
    id?: any;
  };
  isAdmin?: boolean;
  active?: boolean;
}

export const UserProfile = ({ user }: UserAuth0 | any) => {
  const defaultData = {
    name: user.data.name,
    mail: user.data.mail,
    avatar: user.data.avatar,
    description: user.data.description,
    urlTikTok: user.data.urlTikTok,
    urlFaceBook: user.data.urlFaceBook,
    urlInstagram: user.data.urlInstagram,
    keyWords: user.data.keyWords,
  };

  const [data, setData] = useState(defaultData);
  const [image, setImage] = useState<string | ArrayBuffer>();
  const [inputKeyWords, setInputKeyWords] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [file, setFile] = useState<File>();
  const [nameFile, setNameFile] = useState("");
  const queryClient = useQueryClient();
  const hiddenFileInput = React.useRef(null);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    const profileErrors = profileControl(data);
    if (JSON.stringify(errors) === "{}") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setErrors(profileErrors);
  };

  const handleChangeKeyWords = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyWords(e.target.value);
    const keyErrors = validateKeyWords(e.target.value);
    setErrors(keyErrors);
  };

  const handleKeyWords = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputKeyWords !== "") {
      e.preventDefault();
      setKeyWords([...keyWords, inputKeyWords]);
      const keyErrors = threeKeyWords([...keyWords, inputKeyWords]);
      if (JSON.stringify(errors) === "{}") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
      setErrors(keyErrors);
      setInputKeyWords("");
    }
  };

  const addKeyWords = () => {
    if (inputKeyWords !== "") {
      setKeyWords([...keyWords, inputKeyWords]);
      const keyErrors = threeKeyWords([...keyWords, inputKeyWords]);
      if (JSON.stringify(errors) === "{}") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
      setErrors(keyErrors);
    }
    setInputKeyWords("");
  };

  function previewFiles(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files[0];
    setNameFile(file.name);
    setFile(file);
    previewFiles(file);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    hiddenFileInput.current.click();
  };

  const handleDelete = (keyWord: string) => {
    const filterWords = keyWords?.filter((k) => k !== keyWord);
    setKeyWords(filterWords);
    const keyErrors = threeKeyWords(filterWords);
    if (JSON.stringify(errors) === "{}") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setErrors(keyErrors);
  };

  const myKeyWords = (keyWords: string[]): string => {
    return keyWords.toString();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser({
      ...data,
      avatar: image,
      keyWords: myKeyWords(keyWords),
    });
    setKeyWords([]);
  };

  const toast = useToast();

  return (
    <Stack>
      <Center margin="2%">
        <Heading color="primary">Update User Profile</Heading>
      </Center>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <FormControl height={{ sm: "120vh", lg: "115vh" }}>
          <Center>
            <Grid
              h="90vh"
              w="80vw"
              templateRows="repeat(4, 1fr)"
              templateColumns="300px 1fr 1fr 1fr 1fr"
              gap={1}
            >
              <GridItem
                borderRadius="2xl"
                rowSpan={1}
                colSpan={{ base: 5, md: 5, lg: 1 }}
                bg="none"
                alignContent="center"
                alignSelf="center"
              >
                <FormControl id="userName">
                  <Center>
                    <FormLabel>User Icon</FormLabel>
                  </Center>
                  <Stack direction={["column"]} spacing={6} align="center">
                    <Center>
                      <Avatar size="2xl" src={image ? image : data.avatar} />
                    </Center>
                    <Center>
                      <Button
                        mt={5}
                        bg="#02b1b1"
                        color="#293541"
                        _hover={{ bg: "#F3B46F" }}
                        onClick={(event) => handleClick(event)}
                      >
                        Change Icon
                      </Button>
                      <Input
                        type="file"
                        ref={hiddenFileInput}
                        style={{ display: "none" }}
                        accept="image/png, image/jpeg, image/gif, image/jpg, image/jfif"
                        onChange={(e) => handleImage(e)}
                      />
                    </Center>
                  </Stack>
                </FormControl>
              </GridItem>
              <GridItem
                borderRadius="2xl"
                colSpan={{ base: 4, sm: 5, md: 5, lg: 4 }}
              >
                <FormControl id="name" isRequired>
                  <FormLabel p={1}>Name</FormLabel>
                  <Input
                    size="sm"
                    borderRadius={5}
                    placeholder="Name"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={data.name}
                    onChange={(e) => handleChange(e)}
                  />
                </FormControl>
                <Text m={1} fontSize={"xs"} color={"#F3B46F"}>
                  {errors.name}
                </Text>
                <FormControl id="mail" isRequired>
                  <FormLabel p={1}>Email address</FormLabel>
                  <Input
                    size="sm"
                    borderRadius={5}
                    placeholder="your-email@example.com"
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                    value={data.mail}
                    disabled={true}
                    onChange={(e) => handleChange(e)}
                  />
                </FormControl>
                <FormControl id="description" isRequired>
                  <FormLabel p={1}>Description</FormLabel>
                  <Textarea
                    size="sm"
                    borderRadius={5}
                    resize="none"
                    placeholder="Description"
                    _placeholder={{ color: "gray.500" }}
                    onChange={(e) => handleChange(e)}
                    value={data.description}
                  />
                </FormControl>
                <Text m={1} fontSize={"xs"} color={"#F3B46F"}>
                  {errors.description}
                </Text>
                <FormControl id="keyWords">
                  <FormLabel p={1}>Interests</FormLabel>
                  <HStack>
                    <Button
                      bg="blackAlpha.200"
                      color="white"
                      size={"sm"}
                      _hover={{ bg: "blackAlpha.300" }}
                      onClick={addKeyWords}
                    >
                      ADD
                    </Button>
                    <Input
                      size="sm"
                      borderRadius={5}
                      placeholder="Type an interest..."
                      _placeholder={{ color: "gray.500" }}
                      onChange={(e) => handleChangeKeyWords(e)}
                      onKeyDown={(e) => handleKeyWords(e)}
                      value={inputKeyWords}
                      type="text"
                    />
                  </HStack>
                </FormControl>
                <Text m={1} fontSize={"xs"} color={"#F3B46F"}>
                  {errors.keyWords}
                </Text>
                <Center>
                  {keyWords &&
                    keyWords.map((k, index) => {
                      return (
                        <GridItem p={2} key={index}>
                          {k}
                          <Button
                            marginLeft="2"
                            onClick={() => handleDelete(k)}
                            height={"25px"}
                            width={"5px"}
                          >
                            X
                          </Button>
                        </GridItem>
                      );
                    })}
                </Center>
              </GridItem>

              <GridItem borderRadius="2xl" colSpan={5}>
                <FormControl id="urlTikTok">
                  <FormLabel p={1}>Tiktok</FormLabel>
                  <Input
                    size="sm"
                    borderRadius={5}
                    placeholder="URL"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={data.urlTikTok}
                  />
                </FormControl>
                <FormControl id="urlInstagram">
                  <FormLabel p={1}>Instagram</FormLabel>
                  <Input
                    size="sm"
                    borderRadius={5}
                    placeholder="URL"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={data.urlInstagram}
                  />
                </FormControl>
                <FormControl id="urlFaceBook">
                  <FormLabel p={1}>Facebook</FormLabel>
                  <Input
                    size="sm"
                    borderRadius={5}
                    placeholder="URL"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={data.urlFaceBook}
                  />
                </FormControl>
                <SimpleGrid>
                  <Center>
                    <Button
                      margin={"2%"}
                      bg="#02b1b1"
                      color="#293541"
                      _hover={{ bg: "#F3B46F" }}
                      type={"submit"}
                      disabled={disabled}
                      onClick={() =>
                        toast({
                          title: "Profile Updated",
                          description: "We've updated your info",
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                        })
                      }
                    >
                      Submit
                    </Button>
                  </Center>
                </SimpleGrid>
              </GridItem>
            </Grid>
          </Center>
        </FormControl>
      </form>
    </Stack>
  );
};
