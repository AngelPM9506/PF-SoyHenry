import { Box, Input, Text } from "@chakra-ui/react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import React from "react";

type pagination = {
  currentPage: any ;
setCurrentPage: Function ;
max: number;
inputPage: any;
setInputPage: Function;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  max,
  inputPage,
  setInputPage,
}: pagination) {
  const nextPage = () => {
    setInputPage(parseInt(currentPage) + 1);
    setCurrentPage(parseInt(currentPage) + 1);
  };
  const backPage = () => {
    setInputPage(parseInt(currentPage) - 1);
    setCurrentPage(parseInt(currentPage) - 1);
  };

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > max ||
        isNaN(parseInt(e.target.value))
      ) {
        setCurrentPage(1);
        setInputPage(1);
      } else {
        setCurrentPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e: any) => {
    setInputPage(e.target.value);
  };

  return (
    <Box
      display={"flex"}
      margin={"20px 0px"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"60px"}
    >
      <button onClick={backPage} disabled={currentPage <= 1}>
        <BsFillArrowLeftCircleFill size={"3em"} color={"#02b1b1"} />
      </button>
      <Input
        width={"50px"}
        margin={"10px"}
        marginLeft={"20px"}
        fontSize={"2xl"}
        fontWeight={"medium"}
        textAlign={"center"}
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        className="input"
        value={inputPage}
        autoComplete="off"
        type="text"
      />
      <Text
        margin={"10px"}
        marginRight={"15px"}
        marginLeft={"20px"}
        fontSize={"2xl"}
      >
        of {max}
      </Text>
      <button onClick={nextPage} disabled={currentPage >= max}>
        <BsFillArrowRightCircleFill size={"3em"} color={"#02b1b1"} />
      </button>
    </Box>
  );
}
