import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import { Select as ReactSelect, components } from "chakra-react-select";
import Image from "next/image";

import React from "react";

export const TokenSelect = ({
  selectedToken,
  handleTokenChange,
  tokenOptions,
}: any) => {
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDownIcon color={"black"} />
      </components.DropdownIndicator>
    );
  };
  const Option = (props: any) => (
    <components.Option {...props}>
      <Flex color="black">
        <Image
          src={props.data.icon}
          alt="logo"
          width="30"
          height="25"
          style={{ borderRadius: 10, overflow: "hidden" }}
        />
        <Text ml={2}>{props.data.label}</Text>
      </Flex>
    </components.Option>
  );

  const SingleValue = (props: any) => (
    <components.SingleValue {...props}>
      <Flex position="absolute" top="15%">
        <Image
          src={selectedToken.icon}
          alt="selected-logo"
          width="30"
          height="25"
          style={{ borderRadius: 10, overflow: "hidden" }}
        />
        <Text ml={1} mr={1} fontSize="lg">
          {props.data.label}
        </Text>
      </Flex>
    </components.SingleValue>
  );
  return (
    <ReactSelect
      value={selectedToken}
      options={tokenOptions}
      onChange={handleTokenChange}
      components={{
        Option,
        SingleValue,
        DropdownIndicator,
      }}
    />
  );
};
