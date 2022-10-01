import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  useColorModeValue,
  Text,
  Container,
  Box,
  Flex,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Trip } from "src/utils/interface";
import { useAccount, useEnsAddress, useEnsAvatar } from "wagmi";
import { SendTransaction } from "./SendWeb3Transaction";

export function ModalWeb3({
  value,
  ethPrice,
  tripData,
}: {
  value: string;

  ethPrice: number;

  tripData: Trip;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected } = useAccount();
  const { data, isError, isLoading } = useEnsAvatar({
    addressOrName: "world-travelers.eth",
  });
  const priceInEth = Number(value) / Number(ethPrice);

  return (
    <>
      <Button
        onClick={() => isConnected && onOpen()}
        isDisabled={!isConnected}
        bg="#02b1b1"
        color="white"
      >
        <Text>Pay With Ethereum</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} key={value} size={"2xl"}>
        <ModalOverlay />
        <ModalContent bg={"#4b647c"}>
          <ModalHeader>Pay With Ethereum</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isConnected && (
              <SendTransaction
                value={priceInEth.toFixed(9).toString()}
                address={"world-travelers.eth"}
                avatar={data}
                tripData={tripData}
                ethPrice={ethPrice}
              />
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
