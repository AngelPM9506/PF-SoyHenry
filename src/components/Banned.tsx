import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Image,
  Link,
  useDisclosure,
} from "@chakra-ui/react";

export const BannedAlert = () => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });
  return (
    <Box>
      <Alert status="error" variant="solid">
        <AlertIcon />
        <Box>
          <AlertTitle fontSize={"large"}>You are suspended</AlertTitle>
          <AlertDescription fontSize={"large"}>
            Your account has been suspended, please reach us at{" "}
            <b>contact@wordtravelers.com</b> for more information.
          </AlertDescription>
        </Box>
      </Alert>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Box
          margin={"30px"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"65%"}
          position="relative"
          rounded="2xl"
          boxShadow="2xl"
          overflow="hidden"
        >
          <Image
            objectFit={"cover"}
            src="https://i.vgy.me/zG6dQP.png"
            alt={"Error 404 not found"}
          />
        </Box>
      </Box>
    </Box>
  );
};
