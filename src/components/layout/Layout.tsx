import { Box, Stack } from "@chakra-ui/react";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Stack minHeight={"100vh"}>
      <Nav />
      <Box as="main" minHeight={'100vh'}>
        {children}
      </Box>
      <Footer />
    </Stack>
  );
}
