import Footer from "./Footer";
import Nav from "./Nav";
import {
    Container,
} from "@chakra-ui/react";

export default function Layaut({children}: {children: JSX.Element | JSX.Element[]}) {
    return (
        <Container>
            <Nav/>
            {children}
            <Footer/>        
        </Container>
    )
}