/* eslint-disable react-hooks/rules-of-hooks */
import { useUser } from "@auth0/nextjs-auth0";
import moment from "moment";
import {
  Flex,
  Center,
  Box,
  Text,
  useColorModeValue,
  Heading,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "src/components/layout/Layout";
import Loading from "src/components/Loading";
import { getOrCreateUser, getUsersById } from "src/utils/User";
import { Table, Tag, Tooltip, Typography, Input, BackTop } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import "antd/dist/antd.css";
import NextLink from "next/link";
import { Trip } from "src/utils/interface";
import { BannedAlert } from "src/components/Banned";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

interface DataType {
  key: React.Key;
  name: string;
  date: string;
  price: number;
  description: string;
  active: boolean;
}

const { Title } = Typography;

export default function MyTrips() {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user, userLoading],
    () => !userLoading && user && getOrCreateUser(user)
  );
  const { data: usuario } = useQuery(
    ["usuario", userDb],
    () => userDb && getUsersById(userDb.data.id)
  );
  const [trips, setTrips] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [otherTrips, setOtherTrips] = useState([]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "27%",
      responsive: ["lg", "md", "sm", "xs"],
      render: (name: string) => {
        let trip = trips.find((t) => t.name === name);
        return (
          <NextLink href={`/trips/${trip.id}`}>
            <Title level={5}>
              <Text
                cursor={"pointer"}
                fontSize={["xs", "sm", "md"]}
                fontStyle={trip.active ? "italic" : "normal"}
                textTransform={"capitalize"}
                fontWeight={"bold"}
                color={trip.active ? "#293541" : "#F3B46F"}
                textShadow={"1px 1px #293541"}
              >
                {name}
              </Text>
            </Title>
          </NextLink>
        );
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.name
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
    },
    {
      title: "Init Date",
      dataIndex: "initDate",
      key: "initDate",
      responsive: ["sm"],
      render: (initDate: string) => {
        return <div>{`${moment(initDate).format("DD/MM/YYYY")}`}</div>;
      },
      sorter: (a: any, b: any) =>
        new Date(a.initDate).getTime() - new Date(b.initDate).getTime(),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      responsive: ["lg", "md", "sm", "xs"],
      render: (price: number) => {
        return <div>{`$${price}`}</div>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["sm"],
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      responsive: ["lg", "md", "sm", "xs"],
      render: (active: boolean) => {
        let color: string;
        if (active === true) {
          color = "green";
        } else {
          color = "red";
        }
        return (
          <Tooltip
            placement="leftTop"
            title={
              active === true
                ? "This Trip is active"
                : "This Trip must be paid to be active"
            }
          >
            <Center>
              <Tag color={color}>{active === true ? "ACTIVE" : "INACTIVE"}</Tag>
            </Center>
          </Tooltip>
        );
      },
      filters: [
        {
          text: "ACTIVE",
          value: true,
        },
        {
          text: "INACTIVE",
          value: false,
        },
      ],
      onFilter: (value: any, record) => {
        return record.active === value;
      },
      filterSearch: true,
      width: "5%",
    },
  ];

  const otherColumns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "27%",
      responsive: ["lg", "md", "sm", "xs"],
      render: (name: string) => {
        let newTrip: any = otherTrips?.map((t) => t.name);
        return (
          <NextLink href={`/trips/${newTrip.id}`}>
            <Title level={5}>
              <Text
                cursor={"pointer"}
                fontSize={["xs", "sm", "md"]}
                fontStyle={newTrip.active ? "italic" : "normal"}
                textTransform={"capitalize"}
                fontWeight={"bold"}
                color={newTrip.active ? "#293541" : "#F3B46F"}
                textShadow={"1px 1px #293541"}
              >
                {name}
              </Text>
            </Title>
          </NextLink>
        );
      },

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.name
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
    },
    {
      title: "Init Date",
      dataIndex: "initDate",
      key: "initDate",
      responsive: ["sm"],
      render: (initDate: string) => {
        return <div>{`${moment(initDate).format("DD/MM/YYYY")}`}</div>;
      },
      sorter: (a: any, b: any) =>
        new Date(a.initDate).getTime() - new Date(b.initDate).getTime(),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      responsive: ["lg", "md", "sm", "xs"],
      render: (price: number) => {
        return <div>{`$${price}`}</div>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["sm"],
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      responsive: ["lg", "md", "sm", "xs"],
      render: (active: boolean) => {
        let color: string;
        if (active === true) {
          color = "green";
        } else {
          color = "red";
        }
        return (
          <Tooltip
            placement="leftTop"
            title={
              active === true
                ? "This Trip is active"
                : "This Trip must be paid to be active"
            }
          >
            <Center>
              <Tag color={color}>{active === true ? "ACTIVE" : "INACTIVE"}</Tag>
            </Center>
          </Tooltip>
        );
      },
      filters: [
        {
          text: "ACTIVE",
          value: true,
        },
        {
          text: "INACTIVE",
          value: false,
        },
      ],
      onFilter: (value: any, record) => {
        return record.active === value;
      },
      filterSearch: true,
      width: "5%",
    },
  ];

  useEffect(() => {
    const filterTrips: Trip[] = usuario?.useOnTrip
      ?.filter((t: Trip) => t.trip.plannerId !== userDb.data.id)
      .map((t: Trip) => t.trip);
    setOtherTrips(filterTrips);
    setTrips(usuario?.trips);
  }, [usuario, userDb?.data?.id]);

  if (!userLoading && !user) {
    router.push("/api/auth/login");
    return <></>;
  }
  if (!isLoading && userDb && !userDb.data.active) {
    return <BannedAlert />;
  }
  if (isLoading || !usuario) return <Loading />;

  return (
    <Layout>
      <NextSeo title="My Trips" />
      {/* {usuario.trips.length &&
      !usuario.useOnTrip.filter(
        (t: Trip) => t.trip.plannerId !== userDb.data.id
      ).length ? (  */}
      <Stack
        display={"flex"}
        paddingTop={{ base: "7%", sm: "5%", md: "5%", lg: "1%" }}
        height={"fit-content"}
        paddingBottom={{ base: "7%", sm: "5%", md: "5%", lg: "2%" }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}
          alignItems={{ base: "center", md: "center", lg: "center" }}
        >
          <Heading
            color={useColorModeValue("#293541", "white")}
            marginTop={"2%"}
            fontSize={{ sm: "xl", md: "3xl", lg: "5xl" }}
          >
            My Trips Section
          </Heading>
          <Text
            fontStyle={"italic"}
            fontSize={{ sm: "sm", md: "md", lg: "2xl" }}
            color={useColorModeValue("#293541", "#F3B46F")}
            marginTop={"1%"}
          >
            Hello traveler, you will find your created trips and their status in
            this section.
          </Text>
        </Box>
        <Flex alignItems={"center"} flexDirection="row">
          <Center w="100%" h="100%" bg="none">
            <Box w="90%">
              <Stack direction={"column"}>
                <Stack
                  margin={"2%"}
                  rounded={"20px"}
                  overflow={"hidden"}
                  background={"#D1DFE3"}
                  boxShadow={"2xl"}
                >
                  <Table
                    size="middle"
                    columns={columns}
                    dataSource={trips}
                    pagination={{
                      current: page,
                      pageSize: pageSize,
                      onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                      },
                    }}
                  />
                </Stack>
                <Center>
                  <NextLink href={"/trips/create"}>
                    <Button
                      bg={useColorModeValue("#02b1b1", "#02b1b1")}
                      color={"#293541"}
                      marginRight={"55px"}
                      rounded={"md"}
                      padding={"20px"}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                        bg: "#F3B46F",
                        color: "#293541",
                      }}
                      m={5}
                      w={175}
                      marginBottom={{ sm: "-15px" }}
                    >
                      Create a new trip
                    </Button>
                  </NextLink>
                </Center>
              </Stack>
            </Box>
          </Center>
        </Flex>
      </Stack>
      {/* ) : usuario.useOnTrip.filter(
          (t: Trip) => t.trip.plannerId !== userDb.data.id
        ).length && !usuario.trips.length ? (
      <Stack
        display={"flex"}
        paddingTop={{ base: "7%", sm: "5%", md: "5%", lg: "1%" }}
        height={{ base: "50vh", sm: "60vh", md: "70vh", lg: "80vh" }}
        paddingBottom={{ base: "7%", sm: "5%", md: "5%", lg: "2%" }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}
          alignItems={{ base: "center", md: "center", lg: "center" }}
        >
          <Heading
            color={useColorModeValue("#293541", "white")}
            marginTop={"2%"}
            fontSize={{ sm: "xl", md: "3xl", lg: "5xl" }}
          >
            My Trips Section
          </Heading>
          <Text
            fontStyle={"italic"}
            fontSize={{ sm: "sm", md: "md", lg: "2xl" }}
            color={useColorModeValue("#293541", "#F3B46F")}
            marginTop={"1%"}
          >
            Hello traveler, you will find all the info related to the trips you
            have joined here, you can create your own.
          </Text>
        </Box>
        <Flex alignItems={"center"} flexDirection="row">
          <Center w="100%" h="100%" bg="none">
            <Box w="90%">
              <Stack direction={"column"}>
                <Stack
                  margin={"2%"}
                  rounded={"20px"}
                  overflow={"hidden"}
                  background={"#D1DFE3"}
                  boxShadow={"2xl"}
                >
                  <Table
                    size="middle"
                    columns={otherColumns}
                    dataSource={otherTrips}
                    pagination={{
                      current: page,
                      pageSize: pageSize,
                      onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                      },
                    }}
                  />
                </Stack>
                <Center>
                  <NextLink href={"/trips/create"}>
                    <Button
                      bg={useColorModeValue("#02b1b1", "#02b1b1")}
                      color={"#293541"}
                      marginRight={"55px"}
                      rounded={"md"}
                      padding={"20px"}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                        bg: "#F3B46F",
                        color: "#293541",
                      }}
                      m={5}
                      w={175}
                      marginBottom={{ sm: "-15px" }}
                    >
                      Create a new trip
                    </Button>
                  </NextLink>
                </Center>
              </Stack>
            </Box>
          </Center>
        </Flex>
      </Stack> */}
      {/* ) : usuario.trips.length &&
        usuario.useOnTrip.filter(
          (t: Trip) => t.trip.plannerId !== userDb.data.id
        ).length ? ( */}
      {/* <Stack
        display={"flex"}
        paddingTop={{ base: "7%", sm: "5%", md: "5%", lg: "1%" }}
        height={"100%"}
        paddingBottom={{ base: "7%", sm: "5%", md: "5%", lg: "2%" }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}
          alignItems={{ base: "center", md: "center", lg: "center" }}
        >
          <Heading
            color={useColorModeValue("#293541", "white")}
            marginTop={"2%"}
            fontSize={{ sm: "xl", md: "3xl", lg: "5xl" }}
          >
            My Trips Section
          </Heading>
          <Text
            fontStyle={"italic"}
            fontSize={{ sm: "sm", md: "md", lg: "2xl" }}
            color={useColorModeValue("#293541", "#F3B46F")}
            marginTop={"1%"}
          >
            Hello traveler, you will find your created trips and their status in
            this section.
          </Text>
        </Box>
        <Flex alignItems={"center"} flexDirection="row">
          <Center w="100%" h="100%" bg="none">
            <Box w="90%">
              <Stack direction={"column"}>
                <Stack
                  margin={"2%"}
                  rounded={"20px"}
                  overflow={"hidden"}
                  background={"#D1DFE3"}
                  boxShadow={"2xl"}
                >
                  <Table
                    size="middle"
                    columns={columns}
                    dataSource={trips}
                    pagination={{
                      current: page,
                      pageSize: pageSize,
                      onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                      },
                    }}
                  />
                </Stack>
                <Stack>
                  <Center>
                    <Text
                      fontStyle={"italic"}
                      fontSize={{ sm: "sm", md: "md", lg: "2xl" }}
                      color={useColorModeValue("#293541", "#F3B46F")}
                      marginTop={"1%"}
                      marginBottom={"1%"}
                    >
                      Here you will find all the info related to the trips you
                      have joined.
                    </Text>
                  </Center>
                </Stack>
                <Stack
                  margin={"2%"}
                  rounded={"20px"}
                  overflow={"hidden"}
                  background={"#D1DFE3"}
                  boxShadow={"2xl"}
                >
                  <Table
                    size="middle"
                    columns={otherColumns}
                    dataSource={otherTrips}
                    pagination={{
                      current: page,
                      pageSize: pageSize,
                      onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                      },
                    }}
                  />
                </Stack>
                <Center>
                  <NextLink href={"/trips/create"}>
                    <Button
                      bg={useColorModeValue("#02b1b1", "#02b1b1")}
                      color={"#293541"}
                      marginRight={"55px"}
                      rounded={"md"}
                      padding={"20px"}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                        bg: "#F3B46F",
                        color: "#293541",
                      }}
                      m={5}
                      w={175}
                      marginBottom={{ sm: "-15px" }}
                    >
                      Create a new trip
                    </Button>
                  </NextLink>
                </Center>
              </Stack>
            </Box>
          </Center>
        </Flex>
      </Stack> */}
      {/* ) : (
      <Stack
        marginTop={{ base: "25%", sm: "20%", md: "15%", lg: "0" }}
        display={"flex"}
        alignSelf={"center"}
        justifySelf={"center"}
      >
        <Box
          marginTop={"5%"}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}
          alignItems={{ base: "center", md: "center", lg: "center" }}
        >
          <Heading
            color={useColorModeValue("#293541", "white")}
            marginTop={"2%"}
            fontSize={{ sm: "xl", md: "3xl", lg: "5xl" }}
          >
            My Trips Section
          </Heading>
        </Box>
        <Flex alignItems={"center"} flexDirection="row">
          <Center w="100%" h="100%" bg="none">
            <Box h={"50vh"} w="90%">
              <Stack direction={"column"}>
                <Stack margin={"2%"}>
                  <Text
                    fontStyle={"italic"}
                    fontSize={{ sm: "sm", md: "md", lg: "2xl" }}
                    color={useColorModeValue("#293541", "#F3B46F")}
                    marginTop={"1%"}
                    textAlign={"center"}
                  >
                    Hello traveler, you will find your created trips and their
                    status in this section. But, It looks like you do not have
                    any trips created or you have not joined a trip yet, so
                    create one now.
                  </Text>
                </Stack>
                <Center>
                  <NextLink href={"/trips/create"}>
                    <Button
                      bg={useColorModeValue("#02b1b1", "#02b1b1")}
                      color={"#293541"}
                      marginRight={"55px"}
                      rounded={"md"}
                      padding={"20px"}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                        bg: "#F3B46F",
                        color: "#293541",
                      }}
                      m={5}
                      w={175}
                      marginBottom={{ sm: "-15px" }}
                    >
                      Create a new trip
                    </Button>
                  </NextLink>
                </Center>
              </Stack>
            </Box>
          </Center>
        </Flex>
      </Stack>
      )} */}
    </Layout>
  );
}
