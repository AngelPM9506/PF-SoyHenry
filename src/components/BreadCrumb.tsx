import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { getTripId } from "src/utils/trips";
import { useEffect, useState } from "react";
import { getActivitiesId } from "src/utils/activities";
import { getUsersById } from "src/utils/User";

const BreadCrumb = () => {
  const router = useRouter();
  const {
    pathname,
    query: { id },
  } = router;

  const [tripName, setTripName] = useState("");
  const [actName, setActName] = useState("");
  const [userName, setUserName] = useState("");

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
          return tripName.charAt(0).toUpperCase() + tripName.slice(1);
        } else if (pathname === "/activities/[id]") {
          return actName.charAt(0).toUpperCase() + actName.slice(1);
        } else if (pathname === "/user/[id]") {
          return userName;
        }
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (pathname === "/trips/[id]") {
      getTripId(id.toString()).then((res) => setTripName(res.name));
    }
    if (pathname === "/activities/[id]") {
      getActivitiesId(id.toString()).then((res) => setActName(res.name));
    }
    if (pathname === "/user/[id]") {
      getUsersById(id.toString()).then((res: any) => setUserName(res.name));
    }
  });

  return (
    <Box margin={"1%"}>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="#F3B46F" />}
      >
        {pathnames.length > 0 ? (
          <BreadcrumbItem>
            <NextLink href="/home">
              <BreadcrumbLink color={"#F3B46F"}>Home</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink color={"#F3B46F"}>Home</BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          console.log(routeTo);
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <BreadcrumbItem key={index}>
              <Text>{myPath(name)}</Text>
            </BreadcrumbItem>
          ) : name === "user" ? (
            <BreadcrumbItem key={index}>
              <Text color={"#F3B46F"} textTransform={"capitalize"}>
                {name}
              </Text>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={index}>
              <NextLink href={`/${routeTo}`}>
                <BreadcrumbLink color={"#F3B46F"}>
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
