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
        <Flex flexDirection={['column', 'column', 'row']} marginBottom={['10px', '10px', '15px']}
            justifyContent={'space-between'} alignItems={'center'}>
            <FormLabel
                flex={['0', '0', '0 0 125px']} htmlFor="name" textAlign={['center', 'center', 'left']}
                padding={['3px', '3px', '0 0 0 20px']} margin={['5px', '5px', '0']}>
                {label}
            </FormLabel>
            <Box width={'100%'}>
                <InputGroup size={size} {...rest}>
                    <InputLeftElement width={'4rem'} background={'blackAlpha.300'}>
                        <Select top="0" left="0" zIndex={1} bottom={0} cursor={'pointer'} opacity={0}
                            min-height={100} position="absolute" iconColor="transparent"
                            value={selectCountry} onChange={onCountryChange}>
                            <option value="" />
                            {options && options.map((option: any, i: number) => (
                                <option key={i} value={option.value}>{option.label}</option>
                            ))}
                        </Select>
                        <Flex pl={2} width="100%" alignItems="center">
                            {selectCountry ? (
                                <Box mr="4px" width="25%" flex={1}>
                                    <Flag height="1rem" code={selectCountry || ""} />
                                </Box>
                            ) : (<PhoneIcon />)}
                            <ChevronDownIcon />
                        </Flex>
                    </InputLeftElement>
                    <Input pl="4rem" type="tel" value={number} name={name}
                        placeholder={placeholder} onChange={onPhoneNumberChange} />
                </InputGroup>
                <Text>Your phone will be sent as follows: {value}</Text>
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