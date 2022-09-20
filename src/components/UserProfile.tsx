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
} from "@chakra-ui/react";
import React, { ChangeEvent, SetStateAction, useState, useEffect } from "react";
import { updateUser, UserAuth0, getOrCreateUser } from "src/utils/User";
import { Cloudinary } from "@cloudinary/url-gen";
import { useQuery, useQueryClient } from "react-query";
const { CLOUDINARY_NAME } = process.env;
import Layout from "./layout/Layout";
import { valKeyWord } from "src/utils/validations";
import { Errors } from "src/utils/interface";

export interface UserData {
  name: string;
  email?: string;
  picture?: string;
  mail: string;
  description: string;
  avatar: string | ArrayBuffer;
  urlTikTok?: string;
  urlFaceBook?: string;
  urlInstagram?: string;
  keyWords?: string;
  trips?: string[];
  data?: {
    avatar: string;
    id: string;
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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleChangeKeyWords = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyWords(e.target.value);
    const keyErrors = valKeyWord(e.target.value);
    setErrors(keyErrors);
  };

  const handleKeyWords = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setKeyWords([...keyWords, inputKeyWords]);
      setInputKeyWords("");
    }
  };

  const addKeyWords = () => {
    setKeyWords([...keyWords, inputKeyWords]);
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

  const handleDelete = (keyWord: string) => {
    const filterWords = keyWords?.filter((k) => k !== keyWord);
    setKeyWords(filterWords);
  };

  const toast = useToast();

  return (
    <>
      <Center margin="2%">
        <Heading color="primary">UPDATE PROFILE USER</Heading>
      </Center>
      <Center>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Grid
            marginBottom="12%"
            h="80vh"
            w="80vw"
            templateRows="repeat(4, 1fr)"
            templateColumns="300px 1fr 1fr 1fr 1fr"
            gap={1}
          >
            <GridItem
              borderRadius="2xl"
              rowSpan={1}
              colSpan={1}
              bg="none"
              align="center"
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

            <GridItem borderRadius="2xl" colSpan={4} bg="blackAlpha.100">
              <FormControl id="name" isRequired>
                <FormLabel p={2}>Name</FormLabel>
                <Input
                  placeholder="Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={data.name}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl id="mail" isRequired>
                <FormLabel p={2}>Email address</FormLabel>
                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  value={data.mail}
                  disabled={true}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel p={2}>Description</FormLabel>
                <Textarea
                  placeholder="Description"
                  _placeholder={{ color: "gray.500" }}
                  onChange={(e) => handleChange(e)}
                  value={data.description}
                />
              </FormControl>
              <FormControl id="keyWords">
                <FormLabel p={2}>Interests</FormLabel>
                <HStack>
                  <Input
                    placeholder="Type an interest..."
                    _placeholder={{ color: "gray.500" }}
                    onChange={(e) => handleChangeKeyWords(e)}
                    onKeyDown={(e) => handleKeyWords(e)}
                    value={inputKeyWords}
                    type="text"
                  />
                  <Button
                    bg="blackAlpha.200"
                    color="white"
                    _hover={{ bg: "blackAlpha.300" }}
                    onClick={addKeyWords}
                  >
                    ADD
                  </Button>
                </HStack>
              </FormControl>
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
                {errors && <p> {errors.keyWords} </p>}
              </Center>
            </GridItem>

            <GridItem borderRadius="2xl" colSpan={5} bg="blackAlpha.100">
              <FormControl id="urlTikTok">
                <FormLabel p={2}>Tiktok</FormLabel>
                <Input
                  placeholder="URL"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={data.urlTikTok}
                />
              </FormControl>
              <FormControl id="urlInstagram">
                <FormLabel p={2}>Instagram</FormLabel>
                <Input
                  placeholder="URL"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={data.urlInstagram}
                />
              </FormControl>
              <FormControl id="urlFaceBook">
                <FormLabel p={2}>Facebook</FormLabel>
                <Input
                  placeholder="URL"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={data.urlFaceBook}
                />
              </FormControl>
            </GridItem>
          </Grid>
          <Center>
            <Box>
              <Button
                marginBottom={"15%"}
                mt={5}
                bg="#02b1b1"
                color="#293541"
                _hover={{ bg: "#F3B46F" }}
                type={"submit"}
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
            </Box>
          </Center>
        </form>
      </Center>
    </>
  );
};
