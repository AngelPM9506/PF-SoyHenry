import { Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Layout from "src/components/layout/Layout";
import AuthorCard from "../components/authorCard";

const authors = () => {
  return (
    <Layout>
      <NextSeo title="World Travelers" />
      <Box> Autores</Box>
      <AuthorCard />
    </Layout>
  );
};

export default authors;
