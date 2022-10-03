import {
  Box,
  useBreakpointValue,
  Stack,
  Heading,
  Container,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { cards } from "src/utils/aboutCards";

const settings = {
  dots: false,
  adaptiveHeight: true,
  adaptiveWidth: true,
  fade: true,
  infinite: true,
  autoplay: true,
  arrows: false,
  speed: 500,
  autoplaySpeed: 2000,
  pauseOnHover: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function AboutCarousel() {
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        position={"relative"}
        width={"100vw"}
        height={"95vh"}
        overflow={"hidden"}
      >
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <Slider {...settings}>
          {cards.map((card, index) => (
            <Box
              alignSelf={"center"}
              key={index}
              height={"100%"}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${card.image})`}
            >
              <Container alignSelf={"center"} height="90vh" position="relative">
                <Stack
                  position="absolute"
                  top="50%"
                  transform="translate(0%, -50%)"
                >
                  <Heading
                    width={"100%"}
                    fontWeight={"heavy"}
                    fontStyle={"oblique"}
                    textAlign={"center"}
                    color={"#02b1b1"}
                    textShadow={"2px 2px #293541"}
                    fontSize={{ base: "2xl", md: "4xl", lg: "6xl" }}
                  >
                    The most amazing community of travelers!
                  </Heading>
                </Stack>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
