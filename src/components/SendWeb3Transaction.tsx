import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { parseEther } from "ethers/lib/utils";
import { useState } from "react";
import {
  erc20ABI,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useQuery,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { FaEthereum } from "react-icons/fa";
import Image from "next/image";

import { Trip } from "src/utils/interface";
import { useUser } from "@auth0/nextjs-auth0";
import { getOrCreateUser } from "src/utils/User";
import { tokenOptions, validateWeb3Payment } from "src/utils/web3";
import { useRouter } from "next/router";
import { TokenSelect } from "./tokenSelect";

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
  const addRecentTransaction = useAddRecentTransaction();
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);
  const priceInEth = (Number(value) / Number(ethPrice)).toFixed(6).toString();
  const { user, isLoading: userLoading } = useUser();
  const { data: userDb, isLoading: userDbLoading } = useQuery(
    ["userDb", user, userLoading],
    () => !userLoading && user && getOrCreateUser(user)
  );

  //Pay with custom token https://wagmi.sh/docs/hooks/useContractWrite
  const { config: configWrite } = usePrepareContractWrite({
    addressOrName: selectedToken.value, //contract address
    contractInterface: erc20ABI, //standard ERC-20 interface https://docs.openzeppelin.com/contracts/4.x/erc20
    functionName: "transfer", //transfer method from ERC-20 contracts https://docs.ethers.io/v5/single-page/#/v5/api/contract/example/
    args: [address, parseEther(value)], //[receiver, amount]
  });
  const { data: dataWrite, write } = useContractWrite(configWrite);

  //Pay with ether https://wagmi.sh/docs/hooks/useSendTransaction
  const { config } = usePrepareSendTransaction({
    request: {
      to: address,
      value: parseEther(priceInEth),
    },
  });
  const { data, sendTransaction } = useSendTransaction(config);

  //Wait for payment (ether or custom) to be completed
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash || dataWrite?.hash, //transaction hash
  });

  const handleTokenChange = (value: any) => {
    setSelectedToken(value); //change selected token
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
          //add transaction to rainbowkit profile history
          hash: data?.hash || dataWrite?.hash,
          description: tripData.name,
        });
        return validateWeb3Payment(userDb?.data.id, tripData.id); //validate payment in database, update trip info
      }
    }
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
                    value={address}
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
                  <Box
                    w={215}
                    boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
                    borderRadius="1.37rem"
                    bg="#D1DFE3"
                  >
                    <TokenSelect
                      selectedToken={selectedToken}
                      tokenOptions={tokenOptions}
                      handleTokenChange={handleTokenChange}
                    />
                  </Box>

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
