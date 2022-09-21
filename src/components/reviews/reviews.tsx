import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { FiSend } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";

export const Reviews = () => {
  const [rating, setRating] = useState(5);

  return (
    <Box width={"80%"} mt={"30px"} mb={"30px"}>
      <Box>
        ACA VAN LOS COMENTARIOS QUE SE FUERON HACIENDO SI EL COMENTARIO ES MIO
        SE RENDERIZA UN EDIT O UN DELETE SINO NO...
      </Box>
      <Box rounded={"xl"} bgColor={"#D1DFE3"}>
        <FormControl width={"100%"}>
          <HStack
            justifyContent={"left"}
            alignItems={"center"}
            width={"100%"}
            height={"60px"}
            ml={"22px"}
          >
            <Text
              width={"max-content"}
              color={"#293541"}
              fontSize={"2xl"}
              fontWeight={"bold"}
              paddingRight={"50px"}
            >
              Leave a comment for this activity:
            </Text>
            <Box width={"200px"} height={"60px"} pt={"15px"}>
              <StarRatings
                rating={rating}
                starRatedColor="#F3B46F"
                changeRating={(e) => setRating(e)}
                numberOfStars={5}
                starDimension={"25px"}
                starHoverColor={"#293541"}
                starSpacing={"3px"}
                name="rating"
              />
            </Box>
          </HStack>
          <HStack width={"100%"} display={"flex"} justifyContent={"center"}>
            <VStack width={"100%"} marginBottom={"20px"} marginLeft={"20px"}>
              <Input
                width={"100%"}
                height={"100px"}
                textColor={"#293541"}
                backgroundColor={"#e7eff1"}
                border={"1px"}
                borderColor={"#293541"}
              ></Input>
            </VStack>
            <VStack
              padding={"10px"}
              display={"flex"}
              justifyContent={"space-between"}
              height={"100%"}
              paddingBottom={"25px"}
            >
              <Button
                rightIcon={<FiSend />}
                textColor="#293541"
                fontWeight={"bold"}
                backgroundColor={"#F3B46F"}
                variant="outline"
                width={"160px"}
                fontSize={"xl"}
                marginBottom={"15px"}
              >
                Comment{"  "}
              </Button>
              <Button
                rightIcon={<ImCancelCircle />}
                textColor="#293541"
                fontWeight={"bold"}
                backgroundColor={"#4b647c"}
                variant="outline"
                width={"160px"}
                fontSize={"xl"}
              >
                Cancel{"  "}
              </Button>
            </VStack>
            {/* ACA VA EL FORMULARIO PARA ESCRIBIR EL COMENTARIO CON UN SEND O UN CANCEL Y UN INDICADOR DE CUANTAS ESTRELLAS TIENE  */}
          </HStack>
        </FormControl>
      </Box>
    </Box>
  );
};

//EN OTRO COMPONENTE IRA LAS ESTRELLITAS DEL RAITING PROMEDIO...
