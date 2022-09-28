import { Image, Flex, Text, Center } from '@chakra-ui/react'
export default function LoadingWithoutLayout() {
  return (
    <>
        <Flex flexDirection="row">
            <Center w='100%' h="100vh" bg='none'>
                <Image boxSize="200px" src={"https://res.cloudinary.com/mauro4202214/image/upload/v1663331568/world-travelers/Loading_veui4u.gif"} alt="loading"/>
                <Text fontSize='5xl'>Loading...</Text>
            </Center>
        </Flex>
    </>
  );
}