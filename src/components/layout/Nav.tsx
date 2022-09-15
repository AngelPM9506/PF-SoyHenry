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

const logo: string =
  "https://drive.google.com/uc?id=1YCJtH1cFYm8UAe3NR_pATYQXZzJv1a2I";
const logoNight: string =
  "https://drive.google.com/uc?id=1LyKP8Kz3OK6LiScZ75NnQsdZbUdGzoP4";
const Links = [
  ["/home", "Home"],
  ["/trips", "All Trips"],
  ["/activities", "All activities"],
  ["/about", "About"],
  ["/contact", "Contact Us"],
];

export default function NavBar() {
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
              <Image height={"60px"} src={useColorModeValue(logo, logoNight)} />
            </Box>
          </HStack>
          <HStack
            as={"nav"}
            spacing={10}
            justifyContent={"center"}
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((l) => (
              <Link href={l[0]} fontSize={"2xl"} fontWeight={"3px"}>
                {l[1]}
              </Link>
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
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link href="/user/profile">My Profile </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/api/auth/logout">Logout</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? <Box pb={4} display={{ md: "none" }}></Box> : null}
      </Box>
    </>
  );
}
