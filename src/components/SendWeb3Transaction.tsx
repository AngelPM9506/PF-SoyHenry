import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  Link,
} from "@chakra-ui/react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { parseEther } from "ethers/lib/utils";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { UseEnsLookupConfig } from "wagmi/dist/declarations/src/hooks/ens/useEnsAvatar";
import Image from "next/image";
export function SendTransaction({
  value,
  address,
  avatar,
}: {
  value: string;
  address: string;
  avatar: any;
}) {
  const addRecentTransaction = useAddRecentTransaction();
  const [to, setTo] = useState(address);
  const [debouncedTo] = useDebounce(to, 500);

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

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendTransaction?.();
        }}
      >
        <FormControl>
          <Flex mb={10}>
            <Image
              src={avatar}
              alt={`${data} Avatar`}
              width="50"
              height="40"
              style={{ borderRadius: 10, overflow: "hidden" }}
            />

            <Input
              aria-label="Recipient"
              onChange={(e) => setTo(e.target.value)}
              placeholder="Receiver Address"
              isDisabled
              value={to}
            />
          </Flex>
          <Input
            aria-label="Amount (ether)"
            onChange={(e) => setAmount(e.target.value)}
            placeholder={value}
            value={amount}
          />
          <Button
            disabled={isLoading || !sendTransaction || !to || !amount}
            type={"submit"}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
          {isSuccess && (
            <Flex>
              Successfully sent {amount} ether to {to}
              <Flex>
                <Link href={`https://etherscan.io/tx/${data?.hash}`}>
                  Etherscan
                </Link>
              </Flex>
            </Flex>
          )}
        </FormControl>
      </form>
    </Container>
  );
}
