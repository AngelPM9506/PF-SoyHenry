import {
    Box,
    Flex,
    Icon,
    Input,
    Select,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react";
import Flag from "react-world-flags";
import { AsYouType } from "libphonenumber-js";
import { countryTelCode } from "src/utils/countryesCodes";
import { useState } from "react";

const InputPhoneNumber = ({ size, value, country, options, onChange, placeholder, ...rest }: any) => {
    let [number, setNumber] = useState(value || "");
    let [selectCountry, setSelectCountry] = useState(country || "");
    let [countryCode, setCountryCode] = useState(
        countryTelCode(country) || ""
    );
    return (
        <div>inputPhoneNumber</div>
    )
}

export default InputPhoneNumber