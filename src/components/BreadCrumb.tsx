/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { getTripId } from "src/utils/trips";
import { useEffect, useState } from "react";
import { getActivitiesId } from "src/utils/activities";
import { getUsersById } from "src/utils/User";
import NotFound from "src/pages/404";

const BreadCrumb = () => {
  const router = useRouter();
  const {
    pathname,
    query: { id },
  } = router;

  const [tripName, setTripName] = useState("");
  const [actName, setActName] = useState("");
  const [userName, setUserName] = useState("");
  const [chatName, setChatName] = useState("");

  const pathnames = pathname.split("/").filter((x) => x);

  const myPath = (name: string) => {
    switch (name) {
      case "home":
        return;
      case "trips":
        return "All Trips";
      case "activities":
        return "All Activities";
      case "about":
        return "About";
      case "contact":
        return "Contact Us";
      case "user":
        return "User";
      case "profile":
        return "My Profile";
      case "my-trips":
        return "My Trips";
      case "admin":
        return "Admin Panel";
      case "authors":
        return "Authors";
      case "create":
        return "Create";
      case "[id]": {
        if (pathname === "/trips/[id]") {
          return tripName;
        } else if (pathname === "/activities/[id]") {
          return actName;
        } else if (pathname === "/user/[id]") {
          return userName;
        }
        if (pathname === "/chat/[id]") {
          return chatName;
        }
      }
      case "chat":
        return "Chat";
      default:
        break;
    }
  };

  useEffect(() => {
    if (pathname === "/trips/[id]") {
      getTripId(id.toString()).then((res) => {
        res ? setTripName(res.name) : <NotFound />;
      });
    }
    if (pathname === "/activities/[id]") {
      getActivitiesId(id.toString()).then((res) => {
        res ? setActName(res.name) : <NotFound />;
      });
    }
    if (pathname === "/user/[id]") {
      getUsersById(id.toString()).then((res: any) => {
        res ? setUserName(res.name) : <NotFound />;
      });
    }
    if (pathname === "/chat/[id]") {
      getTripId(id.toString()).then((res) => {
        res ? setChatName(res.name) : <NotFound />;
      });
    }
  });

  return (
    <Box
      bg={useColorModeValue("RGBA(75,100,124,0.41)", "RGBA(75,100,124,0.41)")}
      width={"fit-content"}
      marginTop={1.5}
      borderRadius={10}
    >
      <Breadcrumb
        margin={1}
        spacing="8px"
        separator={
          <ChevronRightIcon color={useColorModeValue("#293541", "#F3B46F")} />
        }
      >
        {pathnames.length > 0 ? (
          <BreadcrumbItem>
            <NextLink href="/home">
              <BreadcrumbLink color={useColorModeValue("#293541", "#F3B46F")}>
                Home
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink color={useColorModeValue("#293541", "#F3B46F")}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <BreadcrumbItem key={index}>
              <Text textTransform={"capitalize"}>{myPath(name)}</Text>
            </BreadcrumbItem>
          ) : name === "user" || name === "chat" ? (
            <BreadcrumbItem key={index}>
              <Text
                color={useColorModeValue("#293541", "#F3B46F")}
                textTransform={"capitalize"}
              >
                {name}
              </Text>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={index}>
              <NextLink href={`/${routeTo}`}>
                <BreadcrumbLink
                  textTransform={"capitalize"}
                  color={useColorModeValue("#293541", "#F3B46F")}
                >
                  {myPath(name)}
                </BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Box>
  );
};

export default BreadCrumb;
