import React, { useState } from "react";
import { UserData } from "./UserProfile";
import {
  Center,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Select,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import { ActivityTable } from "./ActivityTable";
import UserTable from "./UserTable";
import Pagination from "./pagination";
import sortArray from "sort-array";
export const UserDashboard = ({ users }: { users: UserData[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const max = Math.ceil(users.length / usersPerPage);
  const [inputPage, setInputPage] = useState(1);
  const [data, setData] = useState(users);
  const [active, setActive] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const [sort, setSort] = useState<string>(undefined);
  const [email, setEmail] = useState("");
  const captions = [
    "user",
    "keywords",
    "description",
    "admin",
    "active",
    "save changes",
  ];
  const textColor = useColorModeValue("gray.900", "gray.400");

  const handleUsersPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(Number(e.target.value));
  };
  const handleActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActive(e.target.value);
    if (e.target.value === "true") {
      return setData(users.filter((u) => u.active === true));
    }
    if (e.target.value === "false") {
      return setData(users.filter((u) => u.active === false));
    }
    setData(users);
  };
  const handleIsAdmin = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdmin(e.target.value);
    if (e.target.value === "true") {
      return setData(users.filter((u) => u.isAdmin === true));
    }
    if (e.target.value === "false") {
      return setData(users.filter((u) => u.isAdmin === false));
    }
    setData(users);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    if (e.target.value === "asc") {
      return setData(
        sortArray(data, {
          by: "name",
        })
      );
    }
    if (e.target.value === "desc") {
      return setData(
        sortArray(data, {
          by: "name",
          order: "desc",
        })
      );
    }
    setData(users);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      setData(users);
      return setEmail("");
    }
    setEmail(e.target.value);
    if (email && email.length >= 3) {
      return setData(
        data.filter((u) =>
          u.mail.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };
  return (
    <>
      <Box
        textAlign={"center"}
        key={active}
        display={"inline-flex"}
        gap={5}
        mb={5}
        mt={5}
      >
        <Select
          width={250}
          value={sort}
          onChange={(e) => handleSort(e)}
          placeholder={"Sort by Name"}
        >
          <option value={"asc"}>Ascending</option>
          <option value={"desc"}>Descending</option>
        </Select>
        <Select
          width={250}
          value={active}
          onChange={(e) => handleActive(e)}
          placeholder={"Filter by Active"}
        >
          <option value={"true"}>Active</option>
          <option value={"false"}>Inactive</option>
        </Select>
        <Select
          width={250}
          value={admin}
          onChange={(e) => handleIsAdmin(e)}
          placeholder={"Filter by Admin"}
        >
          <option value={"true"}>True</option>
          <option value={"false"}>False</option>
        </Select>
        <Flex gap={5}>
          <Input
            w={250}
            value={email}
            onChange={(e) => handleEmail(e)}
            placeholder={"Search by Email"}
          />
        </Flex>
      </Box>
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
          {data
            .slice(
              (currentPage - 1) * usersPerPage,
              (currentPage - 1) * usersPerPage + usersPerPage
            )
            .map((u) => {
              return <UserTable user={u} key={u.id} />;
            })}
        </Tbody>
      </Table>
      <Center>
        <Flex gap={50} mt={5}>
          <Select
            value={usersPerPage}
            name={"usersPerPage"}
            onChange={(e) => handleUsersPerPage(e)}
            w={130}
            mt={8}
          >
            <option value={5}>5 Results</option>
            <option value={10}>10 Results</option>
            <option value={20}>20 Results</option>
            <option value={50}>50 Results</option>
          </Select>
          <Pagination
            inputPage={inputPage}
            setInputPage={setInputPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            max={max}
          />
        </Flex>
      </Center>
    </>
  );
};
