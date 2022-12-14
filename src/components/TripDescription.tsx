import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  noOfLines?: number;
  children: string;
}

export const TripDescription = ({ noOfLines = 4, children }: Props) => {
  const [expandedCount, setExpandedCount] = useState(noOfLines);
  const handleToggle = () =>
    setExpandedCount(expandedCount ? undefined : noOfLines);
  const caract = children.length;
  return (
    <Box display="inline-block" as="span">
      <Box noOfLines={expandedCount}>{children}</Box>
      {caract > 250 ? (
        <Button
          height={"max-content"}
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
      ) : null}
    </Box>
  );
};
