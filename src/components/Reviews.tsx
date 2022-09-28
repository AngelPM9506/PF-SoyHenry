import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  Avatar,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { FiSend, FiDelete } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { GrEdit } from "react-icons/gr";
import NextLink from "next/link";
import { Comment, User } from "../utils/interface";
import { useUser } from "@auth0/nextjs-auth0";
import { patchActivity, deleteComment, editComment } from "../utils/activities";

interface Props {
  feedbacks: Comment[];
  id: string;
  admin: boolean;
}
const Reviews = ({ feedbacks, id, admin }: Props) => {
  const logofoto =
    "https://res.cloudinary.com/mauro4202214/image/upload/v1663331567/world-travelers/favicon.ico_c8ryjz.png";
  const { user } = useUser();
  const [rating, setRating] = useState(5);
  const [ratingEdit, setRatingEdit] = useState(0);
  const [comment, setComment] = useState("");
  const [commentEdit, setCommentEdit] = useState("");
  const [allComments, setAllComments] = useState(feedbacks);
  const [allRatings, setAllRatings] = useState(feedbacks);
  const toast = useToast();

  if (!user || !feedbacks) {
    return <div>is Loading...</div>;
  }

  const mycomment = feedbacks.find((c) => c.userMail === user.email);
  if (mycomment && commentEdit === "") {
    setRatingEdit(mycomment.rating);
    setCommentEdit(mycomment.comment);
  }
  console.log(allComments);
  const handleInput = (e: any) => {
    setComment(e.target.value);
  };
  const handleInputEdit = (e: any, id?: string) => {
    if (admin) {
      const comment: any = allComments.map((c) => {
        if (c.id === id) {
          return (c = { ...c, comment: e.target.value });
        } else return c;
      });
      return setAllComments(comment);
    }
    setCommentEdit(e.target.value);
  };
  const handleRatingEdit = (e: any, id?: string) => {
    if (admin) {
      const rating: any = allComments.map((c) => {
        if (c.id === id) {
          return (c = { ...c, rating: Number(e) });
        } else return c;
      });
      return setAllComments(rating);
    }
    setRatingEdit(e);
  };
  const handleAllComments = (id: string) => {
    const comment = allComments.find((c) => c.id === id);
    return comment.comment;
  };

  const handleAllRatings = (id: string) => {
    const ratings = allComments.find((c) => c.id === id);
    return ratings.rating;
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
    toast({
      title: "Comment posted!",
      description: "Thank you! Now other travelers can read your opinion.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  console.log(feedbacks);
  const handleEdit = async (id?: string) => {
    // if (admin) {
    //   const comment = allComments.find((c) => c.User.id === id);
    //   const idFeedback = comment.id;
    //   await editComment({
    //     id: id,
    //     comment: comment.comment,
    //     idFeedback: idFeedback,
    //     rating: comment.rating,
    //   });
    //   return toast({
    //     title: "Comment edited!",
    //     description: "Thank you! Your changes have been succesfully updated.",
    //     status: "success",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }
    if (admin) {
      allComments.forEach(async (c) => {
        await editComment({
          comment: c.comment,
          rating: c.rating,
          id: id,
          idFeedback: c.id,
        });
      });
      return toast({
        title: "Comment posted!",
        description: "Thank you! Now other travelers can read your opinion.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
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
  };

  const handleDelete = async (feedbackId?: string) => {
    if (admin) {
      await deleteComment(id, feedbackId);
      return toast({
        title: "Comment deleted!",
        description: "Thank you! Your comment is deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    const idFeedback = mycomment.id;
    await deleteComment(id, idFeedback);
    toast({
      title: "Comment deleted!",
      description: "Thank you! Your comment is deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCancelComment = () => {
    setRating(5);
    setComment("");
  };
  return (
    <Box
      width={"100%"}
      mt={"30px"}
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
        {feedbacks.map((comment) =>
          comment === mycomment || admin ? (
            <Box rounded={"xl"} width={"90%"} bgColor={"#D1DFE3"} mb={"10px"}>
              <FormControl key={comment.User.id} width={"100%"}>
                <HStack
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                  height={"60px"}
                  ml={"22px"}
                >
                  <NextLink href={`/user/${comment.User.id}`}>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"left"}
                      alignItems={"center"}
                      width={"30%"}
                    >
                      <Avatar
                        src={
                          comment.User.avatar ? comment.User.avatar : logofoto
                        }
                      />
                      <Text
                        pl={"10px"}
                        width={"max-content"}
                        color={"#293541"}
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                        paddingRight={"50px"}
                      >
                        {comment.User.name}
                      </Text>
                    </Box>
                  </NextLink>

                  <Box width={"200px"} height={"60px"} pt={"15px"}>
                    <StarRatings
                      rating={admin ? handleAllRatings(comment.id) : ratingEdit}
                      starRatedColor="#F3B46F"
                      changeRating={(e: any) => handleRatingEdit(e, comment.id)}
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
                    paddingRight={"50px"}
                  >
                    {comment.feedbackDate
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </Text>
                </HStack>
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
                      fontSize={"xl"}
                      width={"100%"}
                      height={"100px"}
                      textColor={"#293541"}
                      backgroundColor={"#e7eff1"}
                      border={"1px"}
                      borderColor={"#293541"}
                      vertical-align={"top"}
                      onChange={(e: any) => handleInputEdit(e, comment.id)}
                      value={
                        admin ? handleAllComments(comment.id) : commentEdit
                      }
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
                      onClick={() =>
                        admin ? handleDelete(comment.id) : handleDelete()
                      }
                    >
                      Delete Comment
                    </Button>
                  </VStack>
                </HStack>
              </FormControl>
            </Box>
          ) : (
            <Box rounded={"xl"} width={"90%"} bgColor={"#D1DFE3"} mb={"10px"}>
              <FormControl key={comment.User.id} width={"100%"}>
                <HStack
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                  height={"60px"}
                  ml={"22px"}
                >
                  <NextLink href={`/user/${comment.User.id}`}>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"left"}
                      alignItems={"center"}
                      width={"30%"}
                    >
                      <Avatar
                        src={
                          comment.User.avatar ? comment.User.avatar : logofoto
                        }
                      />
                      <Text
                        pl={"10px"}
                        width={"max-content"}
                        color={"#293541"}
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                        paddingRight={"50px"}
                      >
                        {comment.User.name}
                      </Text>
                    </Box>
                  </NextLink>

                  <Box width={"200px"} height={"60px"} pt={"15px"}>
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
                    paddingRight={"50px"}
                  >
                    {comment.feedbackDate
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </Text>
                </HStack>
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
                      webkit-user-select={"none"}
                      width={"100%"}
                      height={"100px"}
                      textColor={"#293541"}
                      backgroundColor={"#e7eff1"}
                      fontSize={"xl"}
                      border={"1px"}
                      borderColor={"#293541"}
                      vertical-align={"top"}
                      value={comment.comment}
                      _hover={{ border: "1px", borderColor: "#293541" }}
                    ></Textarea>
                  </VStack>
                  <VStack
                    padding={"10px"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    height={"100%"}
                    paddingBottom={"25px"}
                  ></VStack>
                </HStack>
              </FormControl>
            </Box>
          )
        )}
      </Box>
      {mycomment || admin ? (
        <Box></Box>
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
                <Textarea
                  fontSize={"xl"}
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
            </HStack>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default Reviews;
