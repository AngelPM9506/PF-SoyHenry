import { Box, Avatar, Tooltip, useColorModeValue } from "@chakra-ui/react";
import Slider from "react-slick";
import { Trip } from "src/utils/interface";
import NextLink from "next/link";
import { settings } from "src/utils/AvaCarouselsSett";

interface Props {
  trips: Trip[];
}

export default function AvaCarousel({ trips }: Props) {
  const logo: string =
    "https://drive.google.com/file/d/1ti7xmFJWKOqUUNcuV2TEpMCb56NAaMU3/view";

  return (
    <Box width={"55vw"} display={"flex"} justifyContent={"center"}>
      <Box
        position={"relative"}
        width={{ base: "100vw", sm: "100vw", md: "60vw", lg: "40vw" }}
        height={"20vh"}
        borderRadius={"xl"}
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
          {trips?.map((trip) => (
            <Box key={trip.id}>
              <NextLink href={`/trips/${trip.id}`} passHref>
                <Tooltip
                  textTransform={"capitalize"}
                  hasArrow
                  label={`${trip.name}`}
                  bg={useColorModeValue("#4b647c", "#D1DFE3")}
                >
                  <Avatar
                    cursor={"pointer"}
                    alignSelf={"center"}
                    name={`${trip.name}`}
                    rounded={"full"}
                    size={"xl"}
                    objectFit={"cover"}
                    src={trip.image ? trip.image.toString() : logo}
                  />
                </Tooltip>
              </NextLink>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
