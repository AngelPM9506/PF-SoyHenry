import {
  Button,
  Link,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Activity } from "src/utils/interface";
import ActivityTable from "./ActivityTable";
import NextLink from "next/link";
export const ActivityDashboard = ({
  activities,
}: {
  activities: Activity[];
}) => {
  const captions = [
    "activity",
    "description",
    "active",
    "availability",
    "price",
    "edit",
    "delete",
  ];
  const background = useColorModeValue("#02b1b1", "#02b1b1");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <>
      <Button
        position={"absolute"}
        right={0}
        mr={10}
        bg={background}
        color={"white"}
        rounded={"md"}
        padding={"20px"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
          bg: "#F3B46F",
          color: "black",
        }}
      >
        <NextLink href="/activities/create">
          <Link>Create Activity</Link>
        </NextLink>
      </Button>
      <Table>
        <Thead>
          <Tr my=".8rem" pl="0px" color={textColor} gap={5}>
            {captions.map((c, i) => {
              return (
                <Th
                  color={textColor}
                  key={i}
                  ps={i === 0 ? "10px" : null}
                  gap={50}
                  pl={30}
                >
                  {c}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {activities.map((a: Activity) => {
            return <ActivityTable activity={a} key={a.id} />;
          })}
        </Tbody>
      </Table>
    </>
  );
};
