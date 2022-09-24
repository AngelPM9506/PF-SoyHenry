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
  useToast
} from "@chakra-ui/react";
import Layout from "src/components/layout/Layout";
import Head from "next/head";
import React, { FormEvent, useState } from "react";
import { contact, Errors, newContact, typeSort } from "src/utils/interface";
import styles from './contac.module.css';
import axios from "axios";
import { useQuery } from "react-query";
import { useUser } from "@auth0/nextjs-auth0";
import { getOrCreateUser } from "src/utils/User";
import { useRouter } from "next/router";
const { MAIL_FROM } = process.env;
const Contact = () => {
  /**estado inicial del contacto */
  const contact: contact = {
    name: '',
    surname: '',
    subject: '',
    email: '',
    whatsapp: '',
    message: '',
  }
  const errorIcial: Errors = {};
  const alertInit: typeSort = {};
  const [input, setInput] = useState(contact);
  const [errors, setErrors] = useState(errorIcial)
  const [alert, setAlert] = useState(alertInit);
  const { user, error } = useUser();
  const { data: userDb, isLoading } = useQuery(
    ['userDb', user],
    () => user && getOrCreateUser(user)
  );
  const router = useRouter();
  const toast = useToast();
  const toastIdRef: any = React.useRef()
  /**funciones de ayuda */
  /**onchange input */
  const setChangeInputs = (event: any) => {
    let { target: { name, value } } = event;
    setInput({ ...input, [name]: value })
    setErrors(validateInput({ ...input, [name]: value }))
  }
  const validateInput = (input: contact) => {
    let error: Errors = {};
    let regularMail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let regularWhatsapp = /[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/i;
    if (!input.name || input.name === '') { error.name = 'Name is required'; }

    if (!input.surname || input.surname === '') { error.surname = 'Surname is required'; }

    if (!input.subject || input.subject === '') { error.subject = 'Subject is required'; }

    if (!input.email || input.email === '') {
      error.email = 'Email is required';
    } else if (!regularMail.test(input.email)) { error.email = 'Enter a valid email'; }

    if (!input.whatsapp || input.whatsapp === '') {
      error.whatsapp = 'Whatsapp is required';
    } else if (!regularWhatsapp.test(input.whatsapp)) { error.whatsapp = 'Enter a valid whatsapp number only ten digits following the pattern: 55-55-55-55-55'; }

    if (!input.message || input.message === '') { error.message = 'Message is required'; }
    return error;
  }
  /**create or update toast */
  const makeToast = (mesage: string, bgColor: string, stat: "error" | "info" | "success") => {
    if (!toastIdRef.current) {
      toastIdRef.current = toast({
        status: stat,
        title: "Contact message",
        description: mesage,
        position: "bottom-right",
        containerStyle: {
          background: bgColor,
          borderRadius: "2xl"
        }
      });
    } else {
      toast.update(toastIdRef.current, {
        status: stat,
        title: "Contact message",
        description: mesage,
        containerStyle: {
          background: bgColor,
          borderRadius: "2xl"
        }
      });
    }
  }
  /**on submit */
  const sendContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let dataCount = 'Data of user loged: ';
    if (userDb) {
      for (const key in userDb.data) {
        dataCount += `<br/> <dd/> ${key}: ${userDb.data[key]}`;
      }
    } else {
      dataCount = 'user unloged'
    }
    if (JSON.stringify(errors) === '{}') {
      makeToast('Sending your message', '#D1DFE3', 'info');
      await axios.post('/api/contact', { ...input, userId: userDb ? userDb.data.id : null })
      await axios.post("/api/mail", {
        mail: 'pruebaspf2022@outlook.com',
        subject: input.subject,
        message: input.message,
        html: {
          title: `${input.name} ${input.surname} is requesting to contact`,
          actionName: 'Contact Message',
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
        .then(resp => {
          //console.log(resp);
          makeToast('Your message was sent correctly','#02b1b1','success');
        })
        .catch((error) => {
          makeToast('Can not send your message, try again later', '#F3B46F', 'error');
        });
      //setInput(contact);
      //setAlert({ msg: 'Contact message sent successfully' });
      setTimeout(() => { router.push('/user/profile'); }, 2000);
    }
  }

  let { form, campo, textArea, botones } = styles;
  return (
    <Layout>
      <Head>
        <title>Contact us</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center margin={'1rem'}>
        <Heading color={'primary'}>Contact us</Heading>
      </Center>
      <form onSubmit={sendContact} className={form}>
        <Box h={'3xl'}>
          <FormControl>
            <Center>
              <Grid marginBottom={'10px'} h={'max-content'} w={'45vw'}
                templateRows={'repeat(6, 1fr)'} templateColumns={'repeat(5,1fr)'}
                gap={'10px'} padding={'10px'}>
                <GridItem borderRadius={'2xl'} padding={'20px'} rowSpan={5} colSpan={5} bg={'blackAlpha.100'}>
                  {/*alert.msg &&
                    <Text bg={'#02b1b1'} textAlign={'center'}
                      padding={'10px'} borderRadius={'2xl'}
                      marginBottom={'10px'} color={'#293541'}
                      fontWeight={'semibold'} fontSize={'20px'}>
                      {alert.msg}
                  </Text>*/}
                  <div className={campo}>
                    <FormLabel flex={'0 0 125px'} htmlFor="name" padding={'0 0 0 20px'} margin={'0'}>Name:</FormLabel>
                    <div>
                      <Input onChange={setChangeInputs} textAlign={'center'} flex={'1'} name="name" placeholder="Your name(s)" />
                      {errors.name && (<Text m={0} color={"#F3B46F"}>{errors.name}</Text>)}
                    </div>
                  </div>
                  <div className={campo}>
                    <FormLabel flex={'0 0 125px'} htmlFor="surname" padding={'0 0 0 20px'} margin={'0'}>Surname:</FormLabel>
                    <div>
                      <Input onChange={setChangeInputs} textAlign={'center'} flex={'1'} name="surname" placeholder="Your surname(s)" />
                      {errors.surname && (<Text m={0} color={"#F3B46F"}>{errors.surname}</Text>)}
                    </div>
                  </div>
                  <div className={campo}>
                    <FormLabel flex={'0 0 125px'} htmlFor="subject" padding={'0 0 0 20px'} margin={'0'}>Subject:</FormLabel>
                    <div>
                      <Input onChange={setChangeInputs} textAlign={'center'} flex={'1'} name="subject" placeholder="Reason for your message" />
                      {errors.subject && (<Text m={0} color={"#F3B46F"}>{errors.subject}</Text>)}
                    </div>
                  </div>
                  <div className={campo}>
                    <FormLabel flex={'0 0 125px'} htmlFor="email" padding={'0 0 0 20px'} margin={'0'}>E-mail:</FormLabel>
                    <div>
                      <Input onChange={setChangeInputs} textAlign={'center'} flex={'1'} name="email" placeholder="Your email (ejemplo@ejemplo.com)" />
                      {errors.email && (<Text m={0} color={"#F3B46F"}>{errors.email}</Text>)}
                    </div>
                  </div>
                  <div className={campo}>
                    <FormLabel flex={'0 0 125px'} htmlFor="whatsapp" padding={'0 0 0 20px'} margin={'0'}>Whatsapp:</FormLabel>
                    <div>
                      <Input onChange={setChangeInputs} textAlign={'center'} flex={'1'} name="whatsapp" placeholder="Your whatsapp (55-55-55-55-55)" />
                      {errors.whatsapp && (<Text m={0} color={"#F3B46F"}>{errors.whatsapp}</Text>)}
                    </div>
                  </div>
                  <div className={`${campo} ${textArea}`}>
                    <FormLabel flex={'0 0 125px'} htmlFor="message" padding={'0 0 0 20px'} margin={'0'}>Message:</FormLabel>
                    <div>
                      <Textarea onChange={setChangeInputs} textAlign={'center'} name={'message'} placeholder={'why you want contact us?..  UwU'} size={'sm'} />
                      {errors.message && (<Text m={0} color={"#F3B46F"}>{errors.message}</Text>)}
                    </div>
                  </div>
                  <div className={botones}>
                    <Button onClick={setChangeInputs} mt={4} type={'submit'} bg="highlight" color="primary">Send sessage</Button>
                  </div>
                </GridItem>
              </Grid>
            </Center>
          </FormControl>
        </Box>
      </form>
    </Layout>
  )
}

export default Contact