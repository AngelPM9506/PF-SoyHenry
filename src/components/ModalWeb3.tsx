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
  setValidate,
  validate,
}: {
  value: string;
  setValidate: any;
  ethPrice: number;
  validate: string | undefined;
  tripData: Trip;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected } = useAccount();
  const { data } = useEnsAvatar({
    addressOrName: "world-travelers.eth",
  });

  return (
    <>
      <Button
        onClick={() => isConnected && onOpen()}
        isDisabled={!isConnected}
        bg="#02b1b1"
        color="white"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
          bg: "#F3B46F",
          color: "#293541",
        }}
      >
        <Text>Pay on Ethereum</Text>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setValidate("activate");
          return onClose();
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent bg={"#4b647c"}>
          <Box textAlign={"center"}>
            <ModalHeader>Web3 Payment</ModalHeader>
          </Box>
          <ModalCloseButton />
          <ModalBody>
            {isConnected && (
              <SendTransaction
                value={value.toString()}
                address={"world-travelers.eth"}
                avatar={data}
                tripData={tripData}
                ethPrice={ethPrice}
                setValidate={setValidate}
                validate={validate}
              />
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
