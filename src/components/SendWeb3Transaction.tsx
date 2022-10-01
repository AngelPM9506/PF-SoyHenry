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
  usePrepareSendTransaction,
  useQuery,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { FaEthereum } from "react-icons/fa";
import Image from "next/image";
import { editTrip } from "src/utils/trips";
import { Trip } from "src/utils/interface";
import { useUser } from "@auth0/nextjs-auth0";
import { getOrCreateUser } from "src/utils/User";
import { validateWeb3Payment } from "src/utils/web3";
import { ArrowDownIcon } from "@chakra-ui/icons";
export function SendTransaction({
  value,
  address,
  avatar,
  tripData,
  ethPrice,
}: {
  value: string;
  address: string;
  avatar: any;
  tripData: Trip;
  ethPrice: number;
}) {
  const { user, isLoading: userLoading } = useUser();
  const { data: userDb, isLoading: userDbLoading } = useQuery(
    ["userDb", user, userLoading],
    () => !userLoading && user && getOrCreateUser(user)
  );
  const addRecentTransaction = useAddRecentTransaction();
  const [to, setTo] = useState(address);
  const [debouncedTo] = useDebounce(to, 500);
  const [validate, setValidate] = useState(false);
  const [amount, setAmount] = useState(value);
  const [debouncedAmount] = useDebounce(amount, 500);

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
    },
  });
  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // const { data: updatedTrip } = useQuery(
  //   ["payTrip", isLoading, isSuccess, data, tripData, userDb],
  //   () => {
  //     if (!isLoading && isSuccess && !validate) {
  //       addRecentTransaction({
  //         hash: data?.hash,
  //         description: tripData.name,
  //       });
  //       validateWeb3Payment(userDb?.data.id, tripData.id);
  //       return setValidate(true);
  //     }
  //   }
  // );
  // useEffect(() => {
  //   if (!isLoading && isSuccess && !validate) {
  //     addRecentTransaction({
  //       hash: data?.hash,
  //       description: tripData.name,
  //     });
  //     validateWeb3Payment(userDb?.data.id, tripData.id);
  //     setValidate(true);
  //   }
  // }, [
  //   isLoading,
  //   isSuccess,
  //   validate,
  //   data,
  //   tripData,
  //   userDb,
  //   addRecentTransaction,
  // ]);

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
          1 <FaEthereum style={{ marginTop: "0.3rem" }} />
          <Text ml={1}>= USD {ethPrice}</Text>
        </Flex>
      </Flex>
      <Box p="0.5rem" borderRadius="0 0 1.37rem 1.37rem">
        <Flex>
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendTransaction?.();
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
                    width="50"
                    height="50"
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
                  <Image
                    src={"https://i.vgy.me/ThpwD9.png"}
                    alt={`Ethereum Logo`}
                    width="50"
                    height="50"
                    style={{ borderRadius: 10, overflow: "hidden" }}
                  />
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
                    placeholder={amount}
                    value={amount}
                  />
                </Flex>
                <Box mt="0.5rem">
                  <Button
                    disabled={isLoading || !sendTransaction || !to || !amount}
                    type={"submit"}
                    color="white"
                    bg="rgb(255,140,0)"
                    width="100%"
                    p="1.62rem"
                    borderRadius="1.25rem"
                    _hover={{ bg: "rgb(255,165,0)" }}
                  >
                    {isLoading ? "Sending Transaction..." : "Pay Activity"}
                  </Button>
                </Box>
              </FormControl>
            </form>
          </Box>
        </Flex>
        {isSuccess && (
          <Flex color="black" mt={7} mb={7} ml={10}>
            Successfully sent {amount} ETH to {to}
          </Flex>
        )}
      </Box>
    </Box>
  );
}
