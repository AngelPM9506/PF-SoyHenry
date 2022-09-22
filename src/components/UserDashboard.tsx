import React from "react";
import { UserData } from "./UserProfile";
import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import ActivityTable from "./ActivityTable";
import UserTable from "./UserTable";
export const UserDashboard = ({ users }: { users: UserData[] }) => {
  const captions = ["user", "admin", "active", "description", "edit"];
  const textColor = useColorModeValue("gray.900", "gray.400");
  return (
    <Table>
      <Thead>
        <Tr my=".8rem" pl="0px" color={"gray.400"} gap={5}>
          {captions.map((c, i) => {
            return (
              <Th
                color={textColor}
                key={i}
                ps={i === 0 ? "10px" : null}
                gap={50}
              >
                {c}
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {users.map((u) => {
          return <UserTable user={u} key={u.id} />;
        })}
      </Tbody>
    </Table>
  );
};
