import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import { UserData } from "../UserProfile";
import NextLink from "next/link";

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

  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box padding={"3px"} boxShadow={"1px 1px 1px 1px #D1DFE3"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image
                height={"60px"}
                src={useColorModeValue(logo, logoNight)}
                alt="logo"
              />
            </Box>
          </HStack>
          <HStack
            as={"nav"}
            spacing={10}
            justifyContent={"center"}
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((l, index) => (
              <NextLink href={l[0]} key={index}>
                <Link href={l[0]} fontSize={"2xl"} fontWeight={"3px"}>
                  {l[1]}
                </Link>
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
                    <Link> My Profile </Link>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <Link href="/api/auth/logout">Logout</Link>
                </MenuItem>
                {userDb?.data.isAdmin && (
                  <MenuItem>
                    <NextLink href={`/user/admin`}>
                      <Link> Admin Panel </Link>
                    </NextLink>
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? <Box pb={4} display={{ md: "none" }}></Box> : null}
      </Box>
    </>
  );
}
