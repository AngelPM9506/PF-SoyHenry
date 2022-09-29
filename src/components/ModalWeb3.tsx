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
import { useState } from "react";
import { Trip } from "src/utils/interface";
import { useAccount, useEnsAddress, useEnsAvatar } from "wagmi";
import { SendTransaction } from "./SendWeb3Transaction";

export function ModalWeb3({ value }: { value: string}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected } = useAccount();
  const { data, isError, isLoading } = useEnsAvatar({
    addressOrName: "world-travelers.eth",
  });
  console.log(data);
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

      <Modal isOpen={isOpen} onClose={onClose} key={value} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay With Ethereum</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isConnected && (
              <SendTransaction value={"0.01"} address={"world-travelers.eth"}  avatar={data}/>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
