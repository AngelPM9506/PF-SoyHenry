import { Box, Button } from "@chakra-ui/react";
import { memo, ReactNode, useState } from "react";

interface Props {
  noOfLines?: number;
  children: string;
}

export const TripDescription = memo(({ noOfLines = 4, children }: Props) => {
  console.log(children);
  const [expandedCount, setExpandedCount] = useState(noOfLines);

  const handleToggle = () =>
    setExpandedCount(expandedCount ? undefined : noOfLines);

  return (
    <Box display="inline-block" as="span" marginRight={"20px"}>
      <Box noOfLines={expandedCount}>{children}</Box>
      <Button
        size="md"
        width={"100%"}
        bgColor={"rgba(209, 223, 227, 0.3)"}
        color={"white"}
        colorScheme="slate"
        textDecoration="none"
        onClick={handleToggle}
      >
        {!expandedCount ? "Show less" : "Read more"}
      </Button>
    </Box>
  );
});
