import { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Heading,
  Image,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import NextLink from "next/link";
import { useRouter } from "next/router";
import BreadCrumb from "../BreadCrumb";

const logo: string =
  "https://res.cloudinary.com/mauro4202214/image/upload/v1663331570/world-travelers/logowt_qifbpn.png";
const logoNight: string =
  "https://res.cloudinary.com/mauro4202214/image/upload/v1663331569/world-travelers/logolargonight_yqpbps.png";

const Links = [
  ["/home", "Home"],
  ["/trips", "All Trips"],
  ["/activities", "All Activities"],
  ["/about", "About"],
  ["/contact", "Contact Us"],
];

export default function NavBar() {
  const { user, error } = useUser();
  const router = useRouter();
  const [active, setActive] = useState(router.pathname);
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );
  const handleActive = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    setActive(e.currentTarget.id);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("#293541", "white");
  return (
    <>
      <Flex
        as="header"
        position={"sticky"}
        backgroundColor="transparent"
        backdropFilter="blur(10px)"
        w="100%"
        h={["70px", "70px", "70px", "70px"]}
        top={0}
        zIndex={10}
      >
        <Box
          w={"100%"}
          padding={"3px"}
          boxShadow={"1px 1px 1px 1px #D1DFE3"}
          px={4}
        >
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ xl: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={12} alignItems={"center"}>
              <NextLink href={Links[0][0]}>
                <Image
                  cursor={"pointer"}
                  w={["100px", "150px", "200px"]}
                  src={useColorModeValue(logo, logoNight)}
                  alt="logo"
                />
              </NextLink>
            </HStack>
            <HStack
              as={"nav"}
              spacing={10}
              justifyContent={"center"}
              display={{ base: "none", xl: "flex" }}
            >
              {Links.map((l, index) => (
                <NextLink href={l[0]} key={index}>
                  <Heading
                    cursor={"pointer"}
                    fontSize={"2xl"}
                    fontWeight={"3px"}
                    id={l[0]}
                    onClick={(e) => handleActive(e)}
                    color={active === l[0] ? "#F3B46F" : textColor}
                  >
                    {l[1]}
                  </Heading>
                </NextLink>
              ))}
            </HStack>
            <Flex alignItems={"center"}>
              <Button
                marginRight={"50px"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={toggleColorMode}
                bgColor={"transparent"}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"md"} src={userDb?.data.avatar} />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <NextLink href={`/user/profile`}>
                      <Text>My Profile</Text>
                    </NextLink>
                  </MenuItem>
                  <MenuItem>
                    <NextLink href={`/user/${userDb?.data.id}`}>
                      <Text> My Public Profile </Text>
                    </NextLink>
                  </MenuItem>
                  <MenuItem>
                    <NextLink href={`/user/my-trips`}>
                      <Text> My Trips </Text>
                    </NextLink>
                  </MenuItem>
                  {userDb?.data.isAdmin && (
                    <MenuItem>
                      <NextLink href={`/user/admin`}>
                        <Text> Admin Panel </Text>
                      </NextLink>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <NextLink href={"/api/auth/logout"}>
                      <Text>Logout</Text>
                    </NextLink>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ xl: "none" }}>
              {Links.map((l, index) => (
                <NextLink href={l[0]} key={index}>
                  <Heading
                    cursor={"pointer"}
                    fontSize={"md"}
                    fontWeight={"2px"}
                    id={l[0]}
                    onClick={(e) => handleActive(e)}
                    color={active === l[0] ? "#02b1b1" : textColor}
                  >
                    {l[1]}
                  </Heading>
                </NextLink>
              ))}
            </Box>
          ) : null}
          <BreadCrumb />
        </Box>
      </Flex>
    </>
  );
}
