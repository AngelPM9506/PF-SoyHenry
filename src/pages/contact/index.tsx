import {
  Center,
  Heading,
  Box,
  FormControl,
  Grid,
  GridItem,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
  useToast,
  Flex,
} from "@chakra-ui/react";
import Layout from "src/components/layout/Layout";
import Head from "next/head";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { contact, Errors, newContact, typeSort } from "src/utils/interface";
import axios from "axios";
import { useQuery } from "react-query";
import { useUser } from "@auth0/nextjs-auth0";
import { getOrCreateUser } from "src/utils/User";
import { useRouter } from "next/router";
import InputPhoneNumber from "src/components/inputPhoneNumber";
import { FLAGS_COUNTRIES } from "src/utils/countryesCodes";
import { NextSeo } from "next-seo";
const { MAIL_FROM } = process.env;
const Contact = () => {
  /**estado inicial del contacto */
  const contact: contact = {
    name: "",
    surname: "",
    subject: "",
    email: "",
    whatsapp: "",
    message: "",
  };
  const errorIcial: Errors = {};
  const [input, setInput] = useState(contact);
  const [errors, setErrors] = useState(errorIcial);
  const [disable, setDisable] = useState(true);
  const { user, error } = useUser();
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );
  const router = useRouter();
  const toast = useToast();
  const toastIdRef: any = useRef();
  const [value, setValue] = useState();
  /**funciones de ayuda */
  /**onchange input */
  const setChangeInputs = (event: any) => {
    let {
      target: { name, value },
    } = event;
    setInput({ ...input, [name]: value });
    setErrors(validateInput({ ...input, [name]: value }));
  };
  const setWhatsapp = (value: string) => {
    console.log(value);
    setInput({ ...input, whatsapp: value });
    setErrors(validateInput({ ...input, whatsapp: value }));
  };
  const validateInput = (input: contact) => {
    let error: Errors = {};
    let regularMail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let regularWhatsapp = /^[+][(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    let regularOnlyLetters = /^[Á-Źa-z\s]+$/i;
    let regularWhitoutSpecialChar = /^[Á-Źa-z0-9\s]+$/i;
    if (!input.name || input.name === "") {
      error.name = "Name is required";
    } else if (!regularOnlyLetters.test(input.name)) {
      error.name = "Only alphabetic characters are accepted";
    }

    if (!input.surname || input.surname === "") {
      error.surname = "Surname is required";
    } else if (!regularOnlyLetters.test(input.surname)) {
      error.surname = "Only alphabetic characters are accepted";
    }

    if (!input.subject || input.subject === "") {
      error.subject = "Subject is required";
    } else if (!regularWhitoutSpecialChar.test(input.subject)) {
      error.subject = "Special characters are not accepted";
    }

    if (!input.email || input.email === "") {
      error.email = "Email is required";
    } else if (!regularMail.test(input.email)) {
      error.email = "Enter a valid email";
    }

    if (!input.whatsapp || input.whatsapp === "") {
      error.whatsapp = "Whatsapp is required";
    } else if (
      !regularWhatsapp.test(input.whatsapp) ||
      input.whatsapp.length < 10 ||
      input.whatsapp.length >= 17
    ) {
      error.whatsapp =
        "Only a valid phone number like (+52 55 2211 4433) and select a country";
    }

    if (!input.message || input.message === "") {
      error.message = "Message is required";
    }
    if (JSON.stringify(error) === "{}") {
      setDisable(false);
    }
    return error;
  };
  /**create or update toast cambio para que reaccione vercel */
  const makeToast = (
    mesage: string,
    bgColor: string,
    stat: "error" | "info" | "success"
  ) => {
    if (!toastIdRef.current) {
      toastIdRef.current = toast({
        status: stat,
        title: "Contact message",
        description: mesage,
        position: "bottom",
        containerStyle: {
          background: bgColor,
          borderRadius: "2xl",
        },
      });
    } else {
      toast.update(toastIdRef.current, {
        status: stat,
        title: "Contact message",
        description: mesage,
        containerStyle: {
          background: bgColor,
          borderRadius: "2xl",
        },
      });
    }
  };
  /**on submit */
  const sendContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let dataCount = "Data of user loged: ";
    if (userDb) {
      for (const key in userDb.data) {
        dataCount += `<br/> <dd/> ${key}: ${userDb.data[key]}`;
      }
    } else {
      dataCount = "user unloged";
    }
    if (JSON.stringify(errors) === "{}") {
      makeToast("Sending your message", "#D1DFE3", "info");
      await axios.post("/api/contact", {
        ...input,
        userId: userDb ? userDb.data.id : null,
      });
      await axios
        .post("/api/mail", {
          mail: "pruebaspf2022@outlook.com",
          subject: input.subject,
          message: input.message,
          html: {
            title: `${input.name} ${input.surname} is requesting to contact`,
            actionName: "Contact Message",
            text: `<h4> A user send the next data to be contacted: </h4> <br/>
            Name: ${input.name} <br/>
            Surname: ${input.surname} <br/>
            E-mail: ${input.email} <br/>
            Whatsapp: ${input.whatsapp} <br/>
            Message: ${input.message} <br/>
            ${dataCount}
            `,
            url: `/`,
            urlMsg: "See more here",
          },
        })
        .then(async (resp) => {
          //console.log(resp);
          await axios.post("/api/mail", {
            mail: input.email,
            subjet: "successful contact WORLD TRAVELERS",
            message:
              "Thank you for contacting us, we will contact you as soon as possible",
            html: {
              title: "Thank you for contacting us",
              actionName: "Contact request received",
              text: "Thank you for contacting us, we will contact you as soon as possible",
              url: "/",
              urlMsg: "WT",
            },
          });
          makeToast("Your message was sent correctly", "#02b1b1", "success");
        })
        .catch((error) => {
          makeToast(
            "Can not send your message, try again later",
            "#F3B46F",
            "error"
          );
        });
      //setInput(contact);
      //setAlert({ msg: 'Contact message sent successfully' });
      setTimeout(() => {
        router.push("/user/profile");
      }, 2000);
    }
  };
  const countriesOptions = FLAGS_COUNTRIES.map(({ name, iso }: any) => ({
    label: name,
    value: iso,
  }));

  return (
    <Layout>
      <NextSeo title="Contact" />
      <Center display={"flex"} flexDirection={"column"} margin={"1rem"}>
        <Heading color={"primary"}>Contact Us</Heading>
        <Text textAlign={"center"} margin={0}>
          If you have any questions or you need asistance you can write to us
          here, we will contact you as soon as possible.
        </Text>
      </Center>
      <form onSubmit={sendContact}>
        <Box h={["max-content", "max-content", "3xl"]}>
          <FormControl>
            <Center>
              <Grid
                marginBottom={"10px"}
                h={"max-content"}
                w={["95vw", "95vw", "85vw", "45vw"]}
                templateRows={"repeat(6, 1fr)"}
                templateColumns={"repeat(5,1fr)"}
                gap={"10px"}
                padding={"10px"}
              >
                <GridItem
                  borderRadius={"2xl"}
                  padding={["10px", "10px", "20px"]}
                  rowSpan={5}
                  colSpan={5}
                  bg={"blackAlpha.100"}
                >
                  {/*alert.msg &&
                    <Text bg={'#02b1b1'} textAlign={'center'}
                      padding={'10px'} borderRadius={'2xl'}
                      marginBottom={'10px'} color={'#293541'}
                      fontWeight={'semibold'} fontSize={'20px'}>
                      {alert.msg}
                  </Text>*/}
                  <Box
                    display={"flex"}
                    flexDirection={["column", "column", "row"]}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    marginBottom={["10px", "10px", "15px"]}
                  >
                    <FormLabel
                      flex={["0", "0", "0 0 125px"]}
                      htmlFor="name"
                      textAlign={["center", "center", "left"]}
                      padding={["3px", "3px", "0 0 0 20px"]}
                      margin={["5px", "5px", "0"]}
                    >
                      Name:
                    </FormLabel>
                    <Box width={"100%"}>
                      <Input
                        onChange={setChangeInputs}
                        textAlign={"center"}
                        flex={"1"}
                        name="name"
                        placeholder="Your name(s)"
                      />
                      {errors.name && (
                        <Text m={0} color={"#F3B46F"}>
                          {errors.name}
                        </Text>
                      )}
                    </Box>
                  </Box>

                  <Box
                    display={"flex"}
                    flexDirection={["column", "column", "row"]}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    marginBottom={["10px", "10px", "15px"]}
                  >
                    <FormLabel
                      flex={["0", "0", "0 0 125px"]}
                      htmlFor="surname"
                      textAlign={["center", "center", "left"]}
                      padding={["3px", "3px", "0 0 0 20px"]}
                      margin={["5px", "5px", "0"]}
                    >
                      Surname:
                    </FormLabel>
                    <Box width={"100%"}>
                      <Input
                        onChange={setChangeInputs}
                        textAlign={"center"}
                        flex={"1"}
                        name="surname"
                        placeholder="Your surname(s)"
                      />
                      {errors.surname && (
                        <Text m={0} color={"#F3B46F"}>
                          {errors.surname}
                        </Text>
                      )}
                    </Box>
                  </Box>

                  <Box
                    display={"flex"}
                    flexDirection={["column", "column", "row"]}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    marginBottom={["10px", "10px", "15px"]}
                  >
                    <FormLabel
                      flex={["0", "0", "0 0 125px"]}
                      htmlFor="subject"
                      textAlign={["center", "center", "left"]}
                      padding={["3px", "3px", "0 0 0 20px"]}
                      margin={["5px", "5px", "0"]}
                    >
                      Subject:
                    </FormLabel>
                    <Box width={"100%"}>
                      <Input
                        onChange={setChangeInputs}
                        textAlign={"center"}
                        flex={"1"}
                        name="subject"
                        placeholder="Reason for your message"
                      />
                      {errors.subject && (
                        <Text m={0} color={"#F3B46F"}>
                          {errors.subject}
                        </Text>
                      )}
                    </Box>
                  </Box>

                  <Box
                    display={"flex"}
                    flexDirection={["column", "column", "row"]}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    marginBottom={["10px", "10px", "15px"]}
                  >
                    <FormLabel
                      flex={["0", "0", "0 0 125px"]}
                      htmlFor="email"
                      textAlign={["center", "center", "left"]}
                      padding={["3px", "3px", "0 0 0 20px"]}
                      margin={["5px", "5px", "0"]}
                    >
                      Email:
                    </FormLabel>
                    <Box width={"100%"}>
                      <Input
                        onChange={setChangeInputs}
                        textAlign={"center"}
                        flex={"1"}
                        name="email"
                        placeholder="Your email (ejemplo@ejemplo.com)"
                      />
                      {errors.email && (
                        <Text m={0} color={"#F3B46F"}>
                          {errors.email}
                        </Text>
                      )}
                    </Box>
                  </Box>

                  {/* <div className={campo}>
                    <FormLabel flex={'0 0 125px'} htmlFor="whatsapp" padding={'0 0 0 20px'} margin={'0'}>Whatsapp:</FormLabel>
                    <div>
                      <Input onChange={setChangeInputs} textAlign={'center'} flex={'1'} name="whatsapp" placeholder="Your whatsapp (55-55-55-55-55)" />
                      {errors.whatsapp && (<Text m={0} color={"#F3B46F"}>{errors.whatsapp}</Text>)}
                    </div>
                  </div> */}

                  <InputPhoneNumber
                    value={input.whatsapp}
                    name="whatsapp"
                    label={"Whatsapp:"}
                    options={countriesOptions}
                    placeholder="Enter your whatsapp contact"
                    error={errors.whatsapp ? errors.whatsapp : null}
                    onChange={setWhatsapp}
                  />

                  <Box
                    display={"flex"}
                    flexDirection={["column", "column", "row"]}
                    justifyContent={"space-between"}
                    marginBottom={["10px", "10px", "15px"]}
                  >
                    <FormLabel
                      flex={["0", "0", "0 0 125px"]}
                      htmlFor="message"
                      textAlign={["center", "center", "left"]}
                      padding={["3px", "3px", "0 0 0 20px"]}
                      margin={["5px", "5px", "0"]}
                    >
                      Message:
                    </FormLabel>
                    <Box width={"100%"}>
                      <Textarea
                        onChange={setChangeInputs}
                        textAlign={"center"}
                        name={"message"}
                        placeholder={"why you want contact us?..  UwU"}
                        size={"2xl"}
                      />
                      {errors.message && (
                        <Text m={0} color={"#F3B46F"}>
                          {errors.message}
                        </Text>
                      )}
                    </Box>
                  </Box>

                  <Flex justifyContent={"center"}>
                    <Button
                      onClick={setChangeInputs}
                      disabled={disable}
                      mt={4}
                      type={"submit"}
                      bg="highlight"
                      color="primary"
                    >
                      Send Message
                    </Button>
                  </Flex>
                </GridItem>
              </Grid>
            </Center>
          </FormControl>
        </Box>
      </form>
    </Layout>
  );
};

export default Contact;
