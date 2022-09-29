import Head from "next/head";
import MyCarousel from "src/components/Carousel";
import styles from "../styles/Home.module.css";
import { Activity, Trip } from "src/utils/interface";
import Layout from "src/components/layout/Layout";

import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import axios from "axios";
import { UserData } from "src/components/UserProfile";
import Loading from "src/components/Loading";
import { BannedAlert } from "src/components/Banned";

interface Props {
  trips: Trip[];
  activities: Activity[];
}

const Home = ({ trips, activities }: Props) => {
  const { user, isLoading: userLoading } = useUser();
  const router = useRouter();
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );

  if (!userLoading && !user) {
    router.push("/api/auth/login");
    return <div></div>;
  }
  if (isLoading) return <Loading />;

  if (!isLoading && userDb && !userDb.data.active) {
    return <BannedAlert />;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MyCarousel trips={trips} activities={activities} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await axios("/trips");
  const trips = await res.data;
  const response = await axios("/activities");
  const activities = await response.data;

  return {
    props: {
      trips: trips,
      activities: activities,
    },
  };
};

export default Home;
