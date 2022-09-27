import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  Avatar,
  Stack,
  Textarea,
  useToast,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { FiSend, FiDelete } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { BsPencilFill } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import NextLink from "next/link";
import { Comment, User } from "../utils/interface";
import { useUser } from "@auth0/nextjs-auth0";
import { patchActivity, deleteComment, editComment } from "../utils/activities";

const breakpoints = {
  sm: "400px",
  md: "600px",
  lg: "1000px",
};

interface Props {
  feedbacks: Comment[];
  id: string;
  change: number;
  setChange: any;
}
const Reviews = ({ feedbacks, id, change, setChange }: Props) => {
  const logofoto =
    "https://res.cloudinary.com/mauro4202214/image/upload/v1663331567/world-travelers/favicon.ico_c8ryjz.png";
  const { user } = useUser();
  const [rating, setRating] = useState(5);
  const [ratingEdit, setRatingEdit] = useState(0);
  const [comment, setComment] = useState("");
  const [commentEdit, setCommentEdit] = useState("");
  const [edit, setEdit] = useState(false);
  const toast = useToast();

  if (!user || !feedbacks) {
    return <div>is Loading...</div>;
  }

  const mycomment = feedbacks.find((c) => c.userMail === user.email);
  if (mycomment && commentEdit === "") {
    setRatingEdit(mycomment.rating);
    setCommentEdit(mycomment.comment);
  }

  const handleInput = (e: any) => {
    setComment(e.target.value);
  };
  const handleInputEdit = (e: any) => {
    setCommentEdit(e.target.value);
  };
  const handleRatingEdit = (e: any) => {
    setRatingEdit(e);
  };

  const handleSubmit = async (e: any) => {
    await patchActivity({
      comment: comment,
      mail: user.email,
      rating: rating,
      id: id,
    });
    setRatingEdit(rating);
    setCommentEdit(comment);
    setRating(5);
    setComment("");
    toast({
      title: "Comment posted!",
      description: "Thank you! Now other travelers can read your opinion.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setEdit(false);
    setChange(change + 1);
  };

  const handleEdit = async () => {
    const idFeedback = mycomment.id;
    await editComment({
      id: id,
      comment: commentEdit,
      idFeedback: idFeedback,
      rating: ratingEdit,
    });
    toast({
      title: "Comment edited!",
      description: "Thank you! Your changes have been succesfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setEdit(false);
    setChange(change + 1);
  };

  const handleDelete = async () => {
    const idFeedback = mycomment.id;
    await deleteComment(id, idFeedback);
    toast({
      title: "Comment deleted!",
      description: "Thank you! Your comment is deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setRatingEdit(0);
    setCommentEdit("");
    setEdit(false);
    setChange(change + 1);
  };

  const handleCancelComment = () => {
    setRating(5);
    setComment("");
  };
  return (
    <Box
      width={"100%"}
      mt={"5px"}
      mb={"30px"}
      bg={"RGBA(209,223,227,0.25)"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      rounded={"xl"}
      padding={"10px"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          width={"100%"}
          textAlign={"left"}
          pl={"60px"}
          fontWeight={"400"}
          fontSize={"3xl"}
          mb={"20px"}
          color={useColorModeValue("#F3B46F", "#F3B46F")}
        >
          Comments:
        </Text>
        {feedbacks.map((comment, index) =>
          comment === mycomment ? (
            <Box rounded={"xl"} width={"90%"} bgColor={"#D1DFE3"} mb={"10px"}>
              {edit === true ? (
                <FormControl key={index} width={"100%"}>
                  <Stack
                    direction={{ base: "row", md: "column" }}
                    display={"flex"}
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent={{ base: "center", md: "space-between" }}
                    alignItems={"center"}
                    width={"100%"}
                    height={{ base: "max-content", md: "60px" }}
                    ml={{ base: "0px", md: "22px" }}
                    mt={{ base: "10px", md: "0px" }}
                  >
                    <NextLink href={`/user/${comment.User.id}`}>
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={{ base: "center", md: "left" }}
                        alignItems={"center"}
                        width={"30%"}
                      >
                        <Tooltip label={comment.User.name}>
                          <Avatar
                            src={
                              comment.User.avatar
                                ? comment.User.avatar
                                : logofoto
                            }
                          />
                        </Tooltip>
                        <Text display={{ md: "none" }}>
                          {comment.User.name}
                        </Text>
                      </Box>
                    </NextLink>
                    <Box
                      width={{ base: "max-content", md: "200px" }}
                      height={"60px"}
                      pt={"15px"}
                    >
                      <StarRatings
                        rating={ratingEdit}
                        starRatedColor="#F3B46F"
                        changeRating={(e: any) => handleRatingEdit(e)}
                        numberOfStars={5}
                        starDimension={"25px"}
                        starHoverColor={"#293541"}
                        starSpacing={"3px"}
                        name="rating"
                      />
                    </Box>
                    <Text
                      width={"max-content"}
                      color={"#293541"}
                      fontSize={"xl"}
                      fontWeight={"bold"}
                      paddingRight={{ base: "0", md: "50px" }}
                    >
                      {comment.feedbackDate
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("/")}
                    </Text>
                  </Stack>

                  <HStack
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <VStack
                      width={"100%"}
                      marginBottom={"20px"}
                      marginLeft={"20px"}
                    >
                      <Textarea
                        resize={"none"}
                        fontSize={"xl"}
                        width={"100%"}
                        height={"100px"}
                        textColor={"#293541"}
                        backgroundColor={"#e7eff1"}
                        border={"1px"}
                        borderColor={"#293541"}
                        vertical-align={"top"}
                        textAlign={{ base: "center", md: "left" }}
                        onChange={(e: any) => handleInputEdit(e)}
                        value={commentEdit}
                      ></Textarea>
                    </VStack>
                    <Stack
                      direction={{ base: "column", md: "row" }}
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
                        width={"160px"}
                        fontSize={"md"}
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
                        width={"160px"}
                        fontSize={"md"}
                        onClick={handleDelete}
                      >
                        Delete Comment
                      </Button>
                    </Stack>
                  </HStack>
                </FormControl>
              ) : (
                <FormControl key={index} width={"100%"}>
                  <Stack
                    direction={{ base: "row", md: "column" }}
                    display={"flex"}
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent={{ base: "center", md: "space-between" }}
                    alignItems={"center"}
                    width={"100%"}
                    height={{ base: "max-content", md: "60px" }}
                    ml={{ base: "0px", md: "22px" }}
                    mt={{ base: "10px", md: "0px" }}
                  >
                    <NextLink href={`/user/${comment.User.id}`}>
                      <Box
                        display={"flex"}
                        flexDirection={{ base: "column", md: "row" }}
                        justifyContent={{ base: "center", md: "left" }}
                        alignItems={"center"}
                        width={"30%"}
                      >
                        <Tooltip label={comment.User.name}>
                          <Avatar
                            src={
                              comment.User.avatar
                                ? comment.User.avatar
                                : logofoto
                            }
                          />
                        </Tooltip>
                        <Text
                          width={"max-content"}
                          color={"#293541"}
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          paddingRight={"0"}
                          display={{ md: "none" }}
                        >
                          {comment.User.name}
                        </Text>
                      </Box>
                    </NextLink>

                    <Box
                      width={{ base: "max-content", md: "200px" }}
                      height={"60px"}
                      pt={"15px"}
                    >
                      <StarRatings
                        rating={ratingEdit}
                        starRatedColor="#F3B46F"
                        changeRating={(e: any) => handleRatingEdit(e)}
                        numberOfStars={5}
                        starDimension={"25px"}
                        starHoverColor={"#293541"}
                        starSpacing={"3px"}
                        name="rating"
                      />
                    </Box>
                    <Text
                      width={"max-content"}
                      color={"#293541"}
                      fontSize={"xl"}
                      fontWeight={"bold"}
                      paddingRight={{ base: "0", md: "50px" }}
                    >
                      {comment.feedbackDate
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("/")}
                    </Text>
                  </Stack>

                  <HStack
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"flex-end"}
                  >
                    <VStack
                      width={"100%"}
                      marginBottom={"20px"}
                      marginLeft={"20px"}
                    >
                      <Text
                        fontSize={"xl"}
                        width={"100%"}
                        minHeight={"100px"}
                        height={"max-content"}
                        textColor={"#293541"}
                        vertical-align={"top"}
                        textAlign={{ base: "center", md: "left" }}
                      >
                        {commentEdit}
                      </Text>
                    </VStack>
                    <Button
                      textColor="#293541"
                      fontWeight={"bold"}
                      backgroundColor={"#F3B46F"}
                      variant="outline"
                      width={"60px"}
                      fontSize={"xl"}
                      rounded={"xl"}
                      onClick={() => setEdit(true)}
                    >
                      <BsPencilFill />
                    </Button>
                  </HStack>
                </FormControl>
              )}
            </Box>
          ) : (
            <Box rounded={"xl"} width={"90%"} bgColor={"#D1DFE3"} mb={"10px"}>
              <FormControl key={index} width={"100%"}>
                <Stack
                  direction={{ base: "row", md: "column" }}
                  display={"flex"}
                  flexDirection={{ base: "column", md: "row" }}
                  justifyContent={{ base: "center", md: "space-between" }}
                  alignItems={"center"}
                  width={"100%"}
                  height={{ base: "max-content", md: "60px" }}
                  ml={{ base: "0px", md: "22px" }}
                  mt={{ base: "10px", md: "0px" }}
                >
                  <NextLink href={`/user/${comment.User.id}`}>
                    <Box
                      display={"flex"}
                      justifyContent={{ base: "center", md: "left" }}
                      alignItems={"center"}
                      width={"30%"}
                      flexDirection={{ base: "column", md: "row" }}
                    >
                      <Tooltip label={comment.User.name}>
                        <Avatar
                          src={
                            comment.User.avatar ? comment.User.avatar : logofoto
                          }
                        />
                      </Tooltip>
                      <Text
                        width={"max-content"}
                        color={"#293541"}
                        fontSize={"xl"}
                        fontWeight={"bold"}
                        paddingRight={"0"}
                        display={{ md: "none" }}
                      >
                        {comment.User.name}
                      </Text>
                    </Box>
                  </NextLink>

                  <Box
                    width={{ base: "max-content", md: "200px" }}
                    height={"60px"}
                    pt={"15px"}
                  >
                    <StarRatings
                      rating={comment.rating}
                      starRatedColor="#F3B46F"
                      numberOfStars={5}
                      starDimension={"25px"}
                      starHoverColor={"#293541"}
                      starSpacing={"3px"}
                      name="rating"
                    />
                  </Box>
                  <Text
                    width={"max-content"}
                    color={"#293541"}
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    paddingRight={{ base: "0", md: "50px" }}
                  >
                    {comment.feedbackDate
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </Text>
                </Stack>
                <HStack
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"flex-end"}
                >
                  <VStack
                    width={"100%"}
                    marginBottom={"20px"}
                    marginLeft={"20px"}
                  >
                    <Text
                      fontSize={"xl"}
                      width={"100%"}
                      minHeight={"100px"}
                      height={"max-content"}
                      textColor={"#293541"}
                      vertical-align={"top"}
                      textAlign={{ base: "center", md: "left" }}
                    >
                      {comment.comment}
                    </Text>
                  </VStack>
                </HStack>
              </FormControl>
            </Box>
          )
        )}
      </Box>
      {mycomment ? (
        <Box></Box>
      ) : (
        <Box rounded={"xl"} width={"90%"} bgColor={"#D1DFE3"}>
          <FormControl width={"100%"}>
            <Stack
              direction={{ base: "column", md: "row" }}
              justifyContent={"left"}
              alignItems={"center"}
              width={"100%"}
              height={"max-content"}
              ml={"22px"}
            >
              <Text
                width={"max-content"}
                color={"#293541"}
                fontSize={"2xl"}
                fontWeight={"bold"}
                paddingRight={"50px"}
              >
                write a comment:
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
            </Stack>
            <Stack
              direction={{ base: "column", md: "row" }}
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
            >
              <VStack
                width={"100%"}
                marginBottom={"20px"}
                marginLeft={{ base: "0px", md: "20px" }}
              >
                <Textarea
                  resize={"none"}
                  fontSize={"xl"}
                  width={{ base: "80%", md: "100%" }}
                  minHeight={{ base: "150px", md: "100px" }}
                  height={"max-content"}
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
                ></Textarea>
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
            </Stack>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default Reviews;
