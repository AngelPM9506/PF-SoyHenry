import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Highlight,
} from "@chakra-ui/react";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import { Feedback } from "src/utils/interface";
const defaultpic: string =
  "https://drive.google.com/uc?id=1_6Nlg2YJEROqakx47LjLzuLjhLifPJ5t";

const averageRating = (feedbacks: Feedback[]) => {
  let total = 0;
  if (feedbacks.length === 0) return 0;
  feedbacks.forEach((feedback) => {
    total += feedback.rating;
  });
  return Math.ceil(total / feedbacks.length);
};

export function ActivityCard({ props }: any) {
  return (
    <Center key={props.id} py={12}>
      <Text style={{ textDecoration: "none" }}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue(
            "RGBA(75,100,124,0.41)",
            "RGBA(75,100,124,0.41)"
          )}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"190px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={260}
              width={282}
              objectFit={"cover"}
              src={props.image ? props.image : defaultpic}
              alt={props.name}
              boxShadow={"0px 10px 13px -7px #000000"}
            />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            marginTop={"24"}
          >
            <Heading
              fontSize={"2xl"}
              fontFamily={"body"}
              fontWeight={600}
              textAlign={"center"}
              textTransform={"capitalize"}
              noOfLines={1}
            >
              {props.name}
            </Heading>
            <Text
              fontWeight={400}
              fontSize={"xl"}
              textAlign={"center"}
              textTransform={"capitalize"}
            >
              {props.city.name}
            </Text>
            <Text fontWeight={700} fontSize={"xl"}>
              US$ {props.price}
            </Text>
          </Box>
          {props.feedbacks.length > 0 ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              height={"30px"}
            >
              <StarRatings
                rating={averageRating(props.feedbacks)}
                starRatedColor={"#02b1b1"}
                numberOfStars={5}
                starDimension={"20px"}
                starSpacing={"3px"}
                name="rating"
              />
            </Box>
          ) : (
            <Box height={"30px"}></Box>
          )}
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            mt={"2px"}
          >
            {props.activitiesOnTrips.length === 0
              ? "There are no trips with this activity."
              : `This activity is in ${props.activitiesOnTrips.length}
            ${props.activitiesOnTrips.length === 1 ? " trip" : " trips"}`}
          </Box>
          <Link href={`/activities/${props.id}`} passHref>
            <a>
              <Button
                w={"full"}
                mt={7}
                bg={useColorModeValue("#151f21", "#f4f4f4")}
                color={useColorModeValue("#f4f4f4", "#151f21")}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                See more Information
              </Button>
            </a>
          </Link>
        </Box>
      </Text>
    </Center>
  );
}
