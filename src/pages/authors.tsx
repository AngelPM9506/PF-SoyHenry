import { Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Layout from "src/components/layout/Layout";
import AuthorCard from "../components/authorCard";

const authors = () => {
  return (
    <Layout>
      <NextSeo title="World Travelers" />
      <Box> Autores</Box>
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
          "https://avatars.githubusercontent.com/u/105603671?s=400&u=9dae9f01a131d632cb953afee34917054febfca1&v=4"
        }
      />
    </Layout>
  );
};

export default authors;
