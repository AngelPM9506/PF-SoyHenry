import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Activity, Trip } from "src/utils/interface";
import { useRouter } from "next/router";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

interface Props {
  trips: Trip[];
  activities: Activity[];
}

const MyCarousel = ({ trips, activities }: Props) => {
  const defaultpic: any =
    "https://drive.google.com/uc?id=1YZhzZFB0nRQuLLzmFVq13upFeZQo5CLd";
  const lastTrips = trips?.reverse().slice(0, 11);
  const lastActivities = activities?.reverse().slice(0, 11);
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      padding="4"
    >
      <Box>
        <Heading textAlign="center" color="primary" p={3}>
          Last Trips
        </Heading>
        <Carousel infiniteLoop>
          {lastTrips?.map((t) => {
            return (
              <>
                <Image
                  rounded={"lg"}
                  maxW="96"
                  src={t.image ? t.image : defaultpic}
                />
                <Heading> {t.name} </Heading>
                <Text> {`$${t.price}`} </Text>
                <Button
                  mt={5}
                  bg="highlight"
                  color="primary"
                  _hover={{ bg: "danger" }}
                  onClick={() => {
                    router.push(`/trips/${t.id}`);
                  }}
                >
                  +info
                </Button>
              </>
            );
          })}
        </Carousel>
      </Box>
      <Box>
        <Heading textAlign="center" color="primary" p={3}>
          Popular Activities
        </Heading>
        <Carousel infiniteLoop>
          {lastActivities?.map((a) => {
            return (
              <>
                <Image
                  rounded={"lg"}
                  maxW="96"
                  src={a.image ? a.image : defaultpic}
                />
                <Heading> {a.name} </Heading>
                <Text> {`$${a.price}`} </Text>
                <Button
                  mt={5}
                  bg="highlight"
                  color="primary"
                  _hover={{ bg: "danger" }}
                  onClick={() => {
                    router.push(`/trips/${a.id}`);
                  }}
                >
                  +info
                </Button>
              </>
            );
          })}
        </Carousel>
      </Box>
    </Box>
  );
};

export default MyCarousel;
