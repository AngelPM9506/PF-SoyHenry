import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Layout from "src/components/layout/Layout";
import AuthorCard from "../components/authorCard";

const authors = () => {
  return (
    <Layout>
      <NextSeo title="World Travelers" />
      <Stack
        alignSelf={"center"}
        width={"100vw"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          width={"60%"}
          bg={"RGBA(209,223,227,0.1)"}
          display={"flex"}
          justifyContent={"space-around"}
          rounded={"20px"}
          marginTop={"40px"}
        >
          <Text>Meet the developers team:</Text>
          <SimpleGrid
            columns={3}
            columnGap={"6"}
            rowGap={"6"}
            width={"100%"}
            paddingLeft={"20px"}
            paddingRight={"20px"}
            alignSelf={"center"}
          >
            <AuthorCard
              name={"Agustina Di Nucci"}
              job={"Full Stack Web Developer"}
              linkedin={"https://www.linkedin.com/in/agustina-dinucci/"}
              github={"https://github.com/dinucciagus"}
              cv={"https://github.com/dinucciagus"}
              avatar={
                "https://avatars.githubusercontent.com/u/105603671?s=400&u=9dae9f01a131d632cb953afee34917054febfca1&v=4"
              }
              image={
                // "http://drive.google.com/uc?export=view&id=1_qsAn-4e7xBfc_IGLbtQMt9Sgo29WjUv"
                "http://drive.google.com/uc?export=view&id=1CczbOs_-ph6f4sbWzxZwMJcPDWpahD2l"
              }
            />
            <AuthorCard
              name={"Agustina Di Nucci"}
              job={"Full Stack Web Developer"}
              linkedin={"https://www.linkedin.com/in/agustina-dinucci/"}
              github={"https://github.com/dinucciagus"}
              cv={"https://github.com/dinucciagus"}
              avatar={
                "https://avatars.githubusercontent.com/u/105603671?s=400&u=9dae9f01a131d632cb953afee34917054febfca1&v=4"
              }
              image={
                // "http://drive.google.com/uc?export=view&id=1_qsAn-4e7xBfc_IGLbtQMt9Sgo29WjUv"
                "http://drive.google.com/uc?export=view&id=1CczbOs_-ph6f4sbWzxZwMJcPDWpahD2l"
              }
            />
            <AuthorCard
              name={"Agustina Di Nucci"}
              job={"Full Stack Web Developer"}
              linkedin={"https://www.linkedin.com/in/agustina-dinucci/"}
              github={"https://github.com/dinucciagus"}
              cv={"https://github.com/dinucciagus"}
              avatar={
                "https://avatars.githubusercontent.com/u/105603671?s=400&u=9dae9f01a131d632cb953afee34917054febfca1&v=4"
              }
              image={
                // "http://drive.google.com/uc?export=view&id=1_qsAn-4e7xBfc_IGLbtQMt9Sgo29WjUv"
                "http://drive.google.com/uc?export=view&id=1CczbOs_-ph6f4sbWzxZwMJcPDWpahD2l"
              }
            />
            <AuthorCard
              name={"Agustina Di Nucci"}
              job={"Full Stack Web Developer"}
              linkedin={"https://www.linkedin.com/in/agustina-dinucci/"}
              github={"https://github.com/dinucciagus"}
              cv={"https://github.com/dinucciagus"}
              avatar={
                "https://avatars.githubusercontent.com/u/105603671?s=400&u=9dae9f01a131d632cb953afee34917054febfca1&v=4"
              }
              image={
                // "http://drive.google.com/uc?export=view&id=1_qsAn-4e7xBfc_IGLbtQMt9Sgo29WjUv"
                "http://drive.google.com/uc?export=view&id=1CczbOs_-ph6f4sbWzxZwMJcPDWpahD2l"
              }
            />
            <AuthorCard
              name={"Agustina Di Nucci"}
              job={"Full Stack Web Developer"}
              linkedin={"https://www.linkedin.com/in/agustina-dinucci/"}
              github={"https://github.com/dinucciagus"}
              cv={"https://github.com/dinucciagus"}
              avatar={
                "https://avatars.githubusercontent.com/u/105603671?s=400&u=9dae9f01a131d632cb953afee34917054febfca1&v=4"
              }
              image={
                // "http://drive.google.com/uc?export=view&id=1_qsAn-4e7xBfc_IGLbtQMt9Sgo29WjUv"
                "http://drive.google.com/uc?export=view&id=1CczbOs_-ph6f4sbWzxZwMJcPDWpahD2l"
              }
            />
            <AuthorCard
              name={"Agustina Di Nucci"}
              job={"Full Stack Web Developer"}
              linkedin={"https://www.linkedin.com/in/agustina-dinucci/"}
              github={"https://github.com/dinucciagus"}
              cv={"https://github.com/dinucciagus"}
              avatar={
                "https://avatars.githubusercontent.com/u/105603671?s=400&u=9dae9f01a131d632cb953afee34917054febfca1&v=4"
              }
              image={
                // "http://drive.google.com/uc?export=view&id=1_qsAn-4e7xBfc_IGLbtQMt9Sgo29WjUv"
                "http://drive.google.com/uc?export=view&id=1CczbOs_-ph6f4sbWzxZwMJcPDWpahD2l"
              }
            />
          </SimpleGrid>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default authors;
