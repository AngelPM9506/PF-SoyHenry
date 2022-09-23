import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { FiSend, FiDelete } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { GrEdit } from "react-icons/gr";
import NextLink from "next/link";
import { Comment, User } from "../../utils/interface";
import { useUser } from "@auth0/nextjs-auth0";
import {
  patchActivity,
  deleteComment,
  editComment,
} from "../../utils/activities";

interface Props {
  feedbacks: Comment[];
  id: string;
}

export const Reviews = ({ feedbacks, id }: Props) => {
  const { user } = useUser();
  if (!user) {
    return <div>is Loading...</div>;
  }
  const mycom = feedbacks?.find((c) => c.userMail === user.email);
  const mycomment = mycom?.comment;
  const myrating = mycom?.rating;

  const [rating, setRating] = useState(5);
  const [ratingEdit, setRatingEdit] = useState(myrating);
  const [comment, setComment] = useState("");
  const [commentEdit, setCommentEdit] = useState(mycomment);

  const handleInput = (e: any) => {
    setComment(e.target.value);
  };
  const handleInputEdit = (e: any) => {
    setCommentEdit(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await patchActivity({
      comment: comment,
      mail: user.email,
      rating: rating,
      id: id,
    });
    setRating(5);
    setComment("");
  };

  const handleEdit = async () => {
    const idFeedback = mycom.id;
    await editComment({
      id: id,
      comment: commentEdit,
      idFeedback: idFeedback,
    });
  };

  const handleDelete = async () => {
    const idFeedback = mycom.id;
    console.log(id, idFeedback);
    await deleteComment(idFeedback, id);
  };

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
      <Box>
        {feedbacks?.map((comment, index) => {
          return (
            <FormControl key={index} width={"100%"}>
              <HStack
                justifyContent={"left"}
                alignItems={"center"}
                width={"100%"}
                height={"60px"}
                ml={"22px"}
              >
                {/* <Text>{comment.date}</Text> */}
                <Text>{comment.User.name}</Text>
                <NextLink href={`/user/${comment.User.id}`}>
                  <Avatar src={comment.User.avatar} />
                </NextLink>
                <Box width={"200px"} height={"60px"} pt={"15px"}>
                  <StarRatings
                    rating={ratingEdit}
                    starRatedColor="#F3B46F"
                    changeRating={(e) => setRatingEdit(e)}
                    numberOfStars={5}
                    starDimension={"25px"}
                    starHoverColor={"#293541"}
                    starSpacing={"3px"}
                    name="rating"
                  />
                </Box>
              </HStack>
              <HStack width={"100%"} display={"flex"} justifyContent={"center"}>
                {comment.User.mail === user.mail ? (
                  <Box>
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
                        onChange={(e: any) => handleInputEdit(e)}
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
                        onClick={() => {
                          handleEdit();
                        }}
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
                        onClick={() => handleDelete()}
                      >
                        Delete Comment
                      </Button>
                    </VStack>
                  </Box>
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

      {mycomment ? (
        <Box>.</Box>
      ) : (
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
                  value={comment}
                  onChange={(e: any) => {
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
                  onClick={(e) => handleSubmit(e)}
                >
                  Comment
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
                  Cancel
                </Button>
              </VStack>
            </HStack>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

//EN OTRO COMPONENTE IRA LAS ESTRELLITAS DEL RAITING PROMEDIO...
