import type { NextPage } from 'next';
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  AspectRatio,
  Center,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';

const landingPage: NextPage = () => {
  const url = 'https://www.youtube.com/watch?v=nxCM5uSrM7s';
  return (
    <Container maxW="container.xl">
      <Stack
        align="center"
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as="span"
              position="relative"
              color="primary"
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'hightlight',
                zIndex: -1,
              }}
            >
              Welcome to,
            </Text>
            <br />
            <Text as="span" color="highlight">
              WORLD TRAVELERS!
            </Text>
          </Heading>
          <Text color="primary" lineHeight="tall" textAlign="justify">
            An application where you can create, find and filter trips and
            tourist activities according to your common interests. Log In and
            join the most amazing community of travelers!
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            {/*eslint-disable-next-line @next/next/no-html-link-for-pages*/}
            <a href="/api/auth/login">
              <Button
                rounded="full"
                size="lg"
                fontWeight="normal"
                px={6}
                colorScheme="primary"
                bg="highlight"
                _hover={{ bg: 'danger' }}
              >
                LOG IN
              </Button>
            </a>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify="center"
          align="center"
          position="relative"
          w="full"
        >
          <Box
            position="relative"
            rounded="2xl"
            boxShadow="2xl"
            width="full"
            overflow="hidden"
          >
            <AspectRatio>
              <Center>
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={url}
                  playing
                  controls={false}
                  loop
                  volume={0.3}
                />
              </Center>
            </AspectRatio>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/hello');
  const dataCities = await response.json();
  return {
    props: {
      cities: dataCities,
    },
  };
};

export default landingPage;
