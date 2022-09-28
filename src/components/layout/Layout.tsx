import Footer from "./Footer";
import Nav from "./Nav";

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
