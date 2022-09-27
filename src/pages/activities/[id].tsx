import { Box } from "@chakra-ui/react";
import { Activity, User } from "src/utils/interface";
import axios from "axios";
import Layout from "../../components/layout/Layout";

import { getActivitiesId } from "src/utils/activities";
import { getUsers } from "src/utils/User";
import { QueryFunctionContext, useQuery } from "react-query";
import ActivityDetail from "src/components/ActivityDetail";
import { GetServerSideProps } from "next/types";
import { useUser } from "@auth0/nextjs-auth0";
import Loading from "src/components/Loading";
import NotFound from "../404";
import { useRouter } from "next/router";

interface Props {
  id: QueryFunctionContext<string[], any>;
  activity: Activity;
}

export default function Detail(props: Props) {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { data, isLoading, error } = useQuery(["propsId"], async () => {
    const activity = await getActivitiesId(props.id);
    const id = props.id;
    return {
      activity: activity,
      id: id,
    };
  });

  if (!userLoading && !user) {
    router.push("/api/auth/login");
    return <div></div>;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (!isLoading && !data) {
    return <NotFound />;
  }
  return (
    <Layout>
      {<ActivityDetail data={data} isLoading={isLoading} error={error} />}
    </Layout>
  );
}

// export async function getStaticPaths(context: any) {
//   const activities = await ActivitiesControles.getActivities({});
//   const paths = activities.map((a: any) => {
//     const id = a.id;
//     return { params: { id } };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }: any) {
//   const { id } = params;

//   const activity = JSON.parse(JSON.stringify(await ActivitiesControles.getActivity({ id })));
//   return {
//     props: {
//       activity,
//       id,
//     },
//   };
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await axios.get(`/activities/${id}`);
  const activity = response.data;
  const res = await axios.get("/users");
  const users = res.data;
  return {
    props: {
      activity: activity,
      users: users,
      id: id,
    },
  };
};
