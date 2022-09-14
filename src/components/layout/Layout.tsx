import Footer from "./Footer";
import Nav from "./Nav";
import { Container } from "@chakra-ui/react";

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
