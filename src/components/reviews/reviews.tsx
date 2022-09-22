import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { FiSend, FiDelete } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { GrEdit } from "react-icons/gr";
import NextLink from "next/link";
import { Comment, Rating, User } from "../../utils/interface";
import { useUser } from "@auth0/nextjs-auth0";
import ActivitiesControles from "../../controllers/activities";
import { QueryFunctionContext, useQuery } from "react-query";

interface Props {
  comments: Comment[];
  ratings: Rating[];
  users: User[];
  id: QueryFunctionContext<string[], any>;
}

export const Reviews = ({ comments, ratings, users, id }: Props) => {
  const { user } = useUser();
  const userfound = users.find((u) => u.mail === user.email);
  const userloged = {
    name: userfound.name,
    mail: userfound.mail,
    avatar: userfound.avatar,
  };
  const mycomment = comments.find((c) => c.user.mail === userloged.mail);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [commentEdit, setCommentEdit] = useState(mycomment.comment);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const actualDate = mm + "-" + dd + "-" + yyyy;

  const handleInput = (e: any) => {
    setComment(e.target.value);
  };
  const handleInputEdit = (e: any) => {
    setCommentEdit(e.target.value);
  };

  const handleSubmit = () => {
    ActivitiesControles.patchActivity(
      {
        comment: comment,
        mail: userloged.mail,
        // date:actualDate,
        rating: rating,
      },
      id
    );
  };

  // const handleEdit = () => {
  //   ActivitiesControles.patchComment({
  //     comment:comment,
  //     mail:userloged.mail,
  //     rating:rating
  //   },id)};
  // }
  // const handleDelete = () => {
  //   ActivitiesControles.deletecomment({
  //     comment:comment,
  //     mail:userloged.mail,
  //     rating:rating
  //   },id)};

  const handleCancelComment = () => {
    setRating(5);
    setComment("");
  };

  return (
    <Box
      width={"90%"}
      mt={"30px"}
      mb={"30px"}
      bg={"#e7eff1"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      rounded={"xl"}
      padding={"10px"}
    >
      {/* COMENTARIOS YA EXISTENTES : */}

      <Box>
        {comments?.map((comment) => {
          return (
            <FormControl width={"100%"}>
              <HStack
                justifyContent={"left"}
                alignItems={"center"}
                width={"100%"}
                height={"60px"}
                ml={"22px"}
              >
                <Text>{comment.date}</Text>
                <NextLink href={`/user/${comment.user.id}`}>
                  <Text>{comment.user.name}</Text>
                  <Avatar src={comment.user.avatar} />
                </NextLink>
                {/* <Box width={"200px"} height={"60px"} pt={"15px"}>
          <StarRatings
            rating={ratingId}
            starRatedColor="#F3B46F"
            changeRating={(e) => setRating(e)}
            numberOfStars={5}
            starDimension={"25px"}
            starHoverColor={"#293541"}
            starSpacing={"3px"}
            name="rating"
          />
        </Box> */}
              </HStack>
              <HStack width={"100%"} display={"flex"} justifyContent={"center"}>
                {comment.user.mail === userfound.mail ? (
                  <>
                    <VStack
                      width={"100%"}
                      marginBottom={"20px"}
                      marginLeft={"20px"}
                    >
                      <Input
                        width={"100%"}
                        height={"100px"}
                        textColor={"#293541"}
                        backgroundColor={"#e7eff1"}
                        border={"1px"}
                        borderColor={"#293541"}
                        vertical-align={"top"}
                        onChange={(e) => handleInputEdit(e)}
                        value={commentEdit}
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
                        rightIcon={<GrEdit />}
                        textColor="#293541"
                        fontWeight={"bold"}
                        backgroundColor={"#F3B46F"}
                        variant="outline"
                        width={"100px"}
                        fontSize={"xl"}
                        marginBottom={"15px"}
                      >
                        Save changes
                      </Button>
                      <Button
                        rightIcon={<FiDelete />}
                        textColor="#293541"
                        fontWeight={"bold"}
                        backgroundColor={"#4b647c"}
                        variant="outline"
                        width={"100px"}
                        fontSize={"xl"}
                      >
                        Delete Comment
                      </Button>
                    </VStack>
                  </>
                ) : (
                  <VStack
                    width={"100%"}
                    marginBottom={"20px"}
                    marginLeft={"20px"}
                  >
                    <Input
                      width={"100%"}
                      height={"100px"}
                      textColor={"#293541"}
                      backgroundColor={"#e7eff1"}
                      border={"1px"}
                      borderColor={"#293541"}
                      vertical-align={"top"}
                    >
                      {comment.comment}
                    </Input>
                  </VStack>
                )}
              </HStack>
            </FormControl>
          );
        })}
      </Box>

      {mycomment ? null : (
        <Box rounded={"xl"} width={"90%"} bgColor={"#D1DFE3"}>
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
                  vertical-align={"top"}
                  placeholder="Write here your comment about this activity..."
                  onChange={(e) => {
                    handleInput(e);
                  }}
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
                  onClick={() => handleSubmit()}
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
                  onClick={() => handleCancelComment()}
                >
                  Cancel{"  "}
                </Button>
              </VStack>
              {/* ACA VA EL FORMULARIO PARA ESCRIBIR EL COMENTARIO CON UN SEND O UN CANCEL Y UN INDICADOR DE CUANTAS ESTRELLAS TIENE  */}
            </HStack>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

//EN OTRO COMPONENTE IRA LAS ESTRELLITAS DEL RAITING PROMEDIO...
