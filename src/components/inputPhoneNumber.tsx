import {
    Box,
    Flex,
    Input,
    Select,
    InputGroup,
    InputLeftElement,
    Icon
} from "@chakra-ui/react";
import Flag from "react-world-flags";
import { AsYouType } from "libphonenumber-js";
import { countryTelCode } from "src/utils/countryesCodes";
import { useEffect, useState } from "react";

const InputPhoneNumber = ({ size, value, country, options, onChange, placeholder, ...rest }: any) => {

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
        <InputGroup display={'flex'} size={size} {...rest}>
            <InputLeftElement width={'5em'} border="1px solid #F00">
                <Select 
                    value={selectCountry} onChange={onCountryChange} border="1px solid #00F">
                    <option value="" />
                    {options && options.map((option: any, i: number) => (
                        <option key={i} value={option.value}>{option.label}</option>
                    ))}
                </Select>
                <Flex pl={2} width="10px" alignItems="center" justifyContent="center" border="1px solid #FF0">
                    {selectCountry ? (
                        <Box mr="4px" width="50%" flex={1}>
                            <Flag height="1rem" code={selectCountry || ""} />
                        </Box>
                    ) : (<Icon name="phone" />)}
                    <Icon name="chevron-down" />
                </Flex>
            </InputLeftElement>
            <Input pl="4rem" type="tel" value={number} pattern="[0-9]"
                placeholder={placeholder} onChange={onPhoneNumberChange} />
        </InputGroup>
    )
}

InputPhoneNumber.defaultProps = {
    options: [],
    size: "md"
}

export default InputPhoneNumber