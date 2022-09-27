import {
    Box,
    Flex,
    Input,
    Select,
    InputGroup,
    InputLeftElement,
    FormLabel,
    Text
} from "@chakra-ui/react";
import Flag from "react-world-flags";
import { AsYouType } from "libphonenumber-js";
import { countryTelCode } from "src/utils/countryesCodes";
import { useEffect, useState } from "react";
import { ChevronDownIcon, PhoneIcon } from "@chakra-ui/icons";

const InputPhoneNumber = ({ size, value, country, options, onChange, placeholder, name, label, error, ...rest }: any) => {

    let [number, setNumber] = useState(value || "");
    let [selectCountry, setSelectCountry] = useState(country || "");
    let [countryCode, setCountryCode] = useState(
        countryTelCode(country) || ""
    );

    useEffect(() => {
        setSelectCountry(country);
        setCountryCode(countryTelCode(country));
    }, [country]);

    const onCountryChange = (event: any) => {
        let { value } = event.target;
        let code = countryTelCode(value);
        let parsedNumber = new AsYouType().input(`${code}${number}`);
        setCountryCode(code);
        setSelectCountry(value);
        onChange(parsedNumber);
    }

    const onPhoneNumberChange = (event: any) => {
        let { value } = event.target;
        let parsedNumber = new AsYouType().input(`${countryCode}${value}`);
        setNumber(value);
        onChange(parsedNumber);
    }
    return (
        <Flex marginBottom={'15px'}>
            <FormLabel flex={'0 0 125px'} htmlFor="message" padding={'0 0 0 20px'} margin={'0'}>
                {label}
            </FormLabel>
            <Box width={'100%'}>
                <InputGroup size={size} {...rest} flex={1}>
                    <InputLeftElement width={'4rem'}>
                        <Select top="0" left="o" zIndex={1} bottom={0} opacity={0} height="100%" position="absolute"
                            iconColor="transparent" value={selectCountry} onChange={onCountryChange}>
                            <option value="" />
                            {options && options.map((option: any, i: number) => (
                                <option key={i} value={option.value}>{option.label}</option>
                            ))}
                        </Select>
                        <Flex pl={2} width="100%" alignItems="center">
                            {selectCountry ? (
                                <Box mr="4px" width="50%" flex={1}>
                                    <Flag height="1rem" code={selectCountry || ""} />
                                </Box>
                            ) : (<PhoneIcon />)}
                            <ChevronDownIcon />
                        </Flex>
                    </InputLeftElement>
                    <Input pl="4rem" type="tel" value={number} name={name}
                        placeholder={placeholder} onChange={onPhoneNumberChange} />
                </InputGroup>
                <p>Your phone will be sent as follows: {value}</p>
                {error && (<Text m={0} color={"#F3B46F"}>{error}</Text>)}
            </Box>
        </Flex>
    )
}

InputPhoneNumber.defaultProps = {
    options: [],
    size: "md"
}

export default InputPhoneNumber