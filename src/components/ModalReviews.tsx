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
  Container,
  Box,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { Comment, Trip } from "src/utils/interface";
import Reviews from "./Reviews";

export function ModalReviews({
  data,
  mutatesubmit,
  mutateedit,
  mutatedelete,
}: {
  data: { activity: { feedbacks: Comment[]; name: string }; id: string };
  mutatesubmit: any;
  mutateedit: any;
  mutatedelete: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const handleValue = (e: any) => {
  //   setText(e.target.value);
  // };
  // const editValue = () => {
  //   handler((prevData: Trip) => {
  //     return { ...prevData, description: text };
  //   });
  //   return onClose();
  // };

  return (
    <Container>
      <Button onClick={onOpen} bg="#02b1b1" color="white">
        Reviews
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} key={data?.id} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data?.activity?.name}</ModalHeader>
          <ModalCloseButton />
          <Center>
            <ModalBody w={700}>
              <Reviews
                feedbacks={data?.activity?.feedbacks}
                id={data?.id}
                admin={true}
                mutatesubmit={mutatesubmit}
                mutateedit={mutateedit}
                mutatedelete={mutatedelete}
              />
            </ModalBody>
          </Center>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Edit Description
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
