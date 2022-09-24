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
} from "@chakra-ui/react";
import { useState } from "react";
import { Trip } from "src/utils/interface";

export function ModalTextarea({
  title,
  name,
  value,
  handler,
}: {
  title: string;
  name: string;
  value: string;
  handler: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState(value);

  const handleValue = (e: any) => {
    setText(e.target.value);
  };
  const editValue = () => {
    handler((prevData: Trip) => {
      return { ...prevData, description: text };
    });
    return onClose();
  };

  return (
    <>
      <Button onClick={onOpen} bg="#02b1b1" color="white">
        {title}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} key={value}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={text}
              fontSize="sm"
              color={"black"}
              name={name}
              onChange={(e) => handleValue(e)}
              bg={"white"}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={editValue}>
              Edit Description
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
