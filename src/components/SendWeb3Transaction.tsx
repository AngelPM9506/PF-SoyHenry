import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { parseEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  erc20ABI,
  useContract,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useQuery,
  useSendTransaction,
  useSigner,
  useWaitForTransaction,
} from "wagmi";
import { FaEthereum } from "react-icons/fa";
import Image from "next/image";
import { editTrip } from "src/utils/trips";
import { Trip } from "src/utils/interface";
import { useUser } from "@auth0/nextjs-auth0";
import { getOrCreateUser } from "src/utils/User";
import { tokenOptions, validateWeb3Payment } from "src/utils/web3";

import { ArrowDownIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Select as ReactSelect,
  components,
  SingleValue,
  SingleValueProps,
  OptionProps,
} from "chakra-react-select";
import { useRouter } from "next/router";

export function SendTransaction({
  value,
  address,
  avatar,
  tripData,
  ethPrice,
  setValidate,
  validate,
}: {
  value: string;
  address: string;
  avatar: any;
  tripData: Trip;
  ethPrice: number;
  setValidate: any;
  validate: string | undefined;
}) {
  const { user, isLoading: userLoading } = useUser();
  const { data: userDb, isLoading: userDbLoading } = useQuery(
    ["userDb", user, userLoading],
    () => !userLoading && user && getOrCreateUser(user)
  );
  const addRecentTransaction = useAddRecentTransaction();
  const [to, setTo] = useState(address);
  const [debouncedTo] = useDebounce(to, 500);
  // const [validate, setValidate] = useState(undefined);
  const [amount, setAmount] = useState(Number(value).toFixed(6).toString());
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);
  const [debouncedAmount] = useDebounce(amount, 500);
  const priceInEth = (Number(value) / Number(ethPrice)).toFixed(6).toString();
  const router = useRouter();
  const { config: configWrite } = usePrepareContractWrite({
    addressOrName: selectedToken.value,
    contractInterface: erc20ABI,
    functionName: "transfer",
    args: [address, parseEther(value)],
  });

  const { data: dataWrite, write } = useContractWrite(configWrite);

  const { config } = usePrepareSendTransaction({
    request: {
      to: address,
      value: parseEther(priceInEth),
    },
  });
  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash || dataWrite?.hash,
  });
  const handleTokenChange = (value: any) => {
    setSelectedToken(value);
  };

  const { data: updatedTrip } = useQuery(
    [
      "payTrip",
      isLoading,
      isSuccess,
      data,
      tripData,
      userDb,
      validate,
      setValidate,
    ],
    () => {
      if (!isLoading && isSuccess && !validate) {
        addRecentTransaction({
          hash: data?.hash || dataWrite?.hash,
          description: tripData.name,
        });
        validateWeb3Payment(userDb?.data.id, tripData.id);
        return setValidate("validated");
      }
    }
  );

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDownIcon color={"black"} />
      </components.DropdownIndicator>
    );
  };
  const Option = (props: any) => (
    <components.Option {...props}>
      <Flex color="black">
        <Image
          src={props.data.icon}
          alt="logo"
          width="30"
          height="25"
          // style={{ borderRadius: 10, overflow: "hidden" }}
        />
        <Text ml={2}>{props.data.label}</Text>
      </Flex>
    </components.Option>
  );

  const SingleValue = (props: any) => (
    <components.SingleValue {...props}>
      <Flex position="absolute" top="15%">
        <Image
          src={selectedToken.icon}
          alt="selected-logo"
          width="30"
          height="25"
          style={{ borderRadius: 10, overflow: "hidden" }}
        />
        <Text ml={1} mr={1} fontSize="lg">
          {props.data.label}
        </Text>
      </Flex>
    </components.SingleValue>
  );
  return (
    <Box
      w="25.62rem"
      mx="auto"
      mt="5.25rem"
      boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
      borderRadius="1.37rem"
      bg="#D1DFE3"
      pb={5}
      pl={1}
    >
      <Flex
        alignItems="center"
        p="1rem 1.25rem 0.5rem"
        color="rgb(86, 90, 105)"
        justifyContent="space-between"
        borderRadius="1.37rem 1.37rem 0 0"
      >
        <Flex color="black" fontWeight="500">
          <FaEthereum style={{ marginTop: "0.3rem" }} />
          <Text ml={1}>= USD {ethPrice}</Text>
        </Flex>
      </Flex>
      <Box p="0.5rem" borderRadius="0 0 1.37rem 1.37rem">
        <Flex>
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                selectedToken.value ? write() : sendTransaction?.();
              }}
            >
              <FormControl>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  bg="#f7f8fa"
                  pos="relative"
                  p="1rem 1rem 1.7rem"
                  borderRadius="1.25rem"
                  border="0.06rem solid rgb(237, 238, 242)"
                  _hover={{ border: "0.06rem solid rgb(211,211,211)" }}
                >
                  <Image
                    src={avatar}
                    alt={`${data} Avatar`}
                    width="53"
                    height="45"
                    style={{ borderRadius: 90, overflow: "hidden" }}
                  />
                  <Input
                    color="black"
                    aria-label="Recipient"
                    value={to}
                    fontWeight="500"
                    fontSize="1.5rem"
                    width="100%"
                    size="19rem"
                    textAlign="right"
                    outline="none"
                    border="none"
                    focusBorderColor="none"
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  bg="#f7f8fa"
                  pos="relative"
                  p="1rem 1rem 1.7rem"
                  borderRadius="1.25rem"
                  mt="0.25rem"
                  border="0.06rem solid rgb(237, 238, 242)"
                  _hover={{ border: "0.06rem solid rgb(211,211,211)" }}
                >
                  {/* <Flex
                  // borderRadius="1.12rem"
                  // boxShadow="rgba(0, 0, 0, 0.075) 0px 6px 10px"
                  // fontWeight="500"
                  // mr="0.5rem"
                  // color="black"
                  // // onClick={() => {}}
                  // _hover={{ bg: "rgb(30,144,255)" }}
                  > */}
                  <Box
                    w={215}
                    boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
                    borderRadius="1.37rem"
                    bg="#D1DFE3"
                  >
                    <ReactSelect
                      value={selectedToken}
                      options={tokenOptions}
                      onChange={handleTokenChange}
                      components={{
                        Option,
                        SingleValue,
                        DropdownIndicator,
                      }}
                    />
                  </Box>
                  {/* </Flex> */}
                  {/* <Image
                      src={"https://i.vgy.me/ThpwD9.png"}
                      alt={`Ethereum Logo`}
                      width="80"
                      height="80"
                      style={{ borderRadius: 10, overflow: "hidden" }}
                    />
                    <Text fontSize={"md"} ml={2} fontWeight={"semibold"}>
                      ETH
                    </Text>
                  </Select> */}
                  <Input
                    fontSize="1.5rem"
                    width="100%"
                    size="19rem"
                    textAlign="right"
                    outline="none"
                    border="none"
                    focusBorderColor="none"
                    color="black"
                    aria-label="Amount (ether)"
                    value={selectedToken.value ? value : priceInEth}
                  />
                </Flex>
                <Box mt="0.5rem">
                  <Button
                    disabled={isLoading || !sendTransaction}
                    type={"submit"}
                    color="white"
                    bg="rgb(255,140,0)"
                    width="100%"
                    p="1.62rem"
                    borderRadius="1.25rem"
                    _hover={{ bg: "rgb(255,165,0)" }}
                  >
                    {isLoading ? "Sending Payment..." : "Pay Activity"}
                  </Button>
                </Box>
              </FormControl>
            </form>
          </Box>
        </Flex>
        {isSuccess && (
          <Flex color="black" mt={7} mb={7} textAlign="center">
            Successfully paid {selectedToken.value ? value : priceInEth}{" "}
            {selectedToken.label} to {address} for trip: {tripData.name}
          </Flex>
        )}
      </Box>
    </Box>
  );
}
