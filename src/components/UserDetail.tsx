import {
  Badge,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserData } from "./UserProfile";

export const UserDetail = (userDetail: UserData) => {
  const user = userDetail.userDetail;
  const logo: string =
    "https://drive.google.com/file/d/1ti7xmFJWKOqUUNcuV2TEpMCb56NAaMU3/view";
  const tikTok: string =
    "https://pngfolio.com/images/all_img/copy/1631443365tiktok-icon.png";
  const instagram: string =
    "https://www.adverthia.com/wp-content/uploads/2020/02/instagram-logo-png-transparent-background-1024x1024-1.png";
  const facebook: string =
    "https://i0.wp.com/www.dpabogados.com/wp-content/uploads/2016/09/facebook-logo-png-transparent-background.png?fit=1600%2C1600&ssl=1";

  const arrInterests: string[] = user.keyWords.split(",");

  return (
    <>
      <Center py={6}>
        <Heading>Meet the traveler</Heading>
      </Center>
      <Center py={2}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={user ? user.avatar : logo}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {user && user.name}
            </Heading>

            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              {user && user.description}
            </Text>
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              {arrInterests?.map((int) => {
                return (
                  <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue("gray.50", "gray.800")}
                    fontWeight={"400"}
                  >
                    {`#${int.toLowerCase()}`}
                  </Badge>
                );
              })}
            </Stack>
            <Center>
              <Stack
                width={"100%"}
                mt={"1rem"}
                direction={"row"}
                padding={2}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <a
                  href={`https://www.tiktok.com/@jonajes0288?_t=8VlK29P54bt&_r=1`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    boxSize="40px"
                    objectFit="cover"
                    src={tikTok}
                    alt="tikTok-icon"
                  />
                </a>
                <a
                  href={`https://www.instagram.com/jonathanjb88/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    boxSize="40px"
                    objectFit="cover"
                    src={instagram}
                    alt="instagram-icon"
                  />
                </a>
                <a
                  href={`https://www.facebook.com/jonathan.bracho.315?hc_ref=ARQiLU7zLOMEYBj7zo7TSxZbGxwic1kerRBzbasgtmvRAb4khpLlJ0HQk1J9WlOsn7Y&fref=nf`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    boxSize="40px"
                    objectFit="cover"
                    src={facebook}
                    alt="facebook-icon"
                  />
                </a>
              </Stack>
            </Center>
          </Stack>
        </Stack>
      </Center>
    </>
  );
};

export default UserDetail;
