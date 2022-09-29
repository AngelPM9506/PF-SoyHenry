import { UserData } from "src/components/UserProfile";
import { useQuery } from "react-query";
import { getUserDetail } from "src/utils/userDetail";
import Layout from "src/components/layout/Layout";
import UserDetail from "src/components/UserDetail";
import axios from "axios";
import Loading from "src/components/Loading";
import { GetServerSideProps } from "next/types";
import { Trip } from "src/utils/interface";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export interface Props {
  userPath: UserData;
  id: string;
  trips: Trip[];
}

export const ProfileDetail = (props: Props) => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { data: userDetail, isLoading } = useQuery(
    ["userDetail", props.id],
    () => props.id && getUserDetail(props.id)
  );
  if (!userLoading && !user) {
    router.push("/api/auth/login");
    return <div></div>;
  }
  if (isLoading) return <Loading />;
  return (
    <Layout>
      <NextSeo title={`${userDetail?.name} profile`} />
      <UserDetail trips={props.trips} userDetail={userDetail} />
    </Layout>
  );
};

export default ProfileDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await axios.get(`/users/${id}`);
  const user = response.data;
  const data = await axios.get("/trips");
  const trips = data.data;

  return {
    props: {
      user: user,
      id: id,
      trips: trips,
    },
  };
};
