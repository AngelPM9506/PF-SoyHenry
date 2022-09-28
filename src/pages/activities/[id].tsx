import { Box } from "@chakra-ui/react";
import { Activity, User } from "src/utils/interface";
import axios from "axios";
import Layout from "../../components/layout/Layout";

import {
  deleteComment,
  editComment,
  getActivitiesId,
  patchActivity,
} from "src/utils/activities";
import { getUsers } from "src/utils/User";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import ActivityDetail from "src/components/ActivityDetail";
import { GetServerSideProps } from "next/types";
import { useUser } from "@auth0/nextjs-auth0";
import Loading from "src/components/Loading";
import NotFound from "../404";
import { useState, useEffect, useMemo } from "react";
import Reviews from "src/components/Reviews";
import { getTrips } from "src/utils/trips";

interface Props {
  id: QueryFunctionContext<string[], any>;
  activity: Activity;
}

export default function Detail(props: Props) {
  const queryClient = useQueryClient();
  const mutatesubmit = useMutation(patchActivity, {
    onSuccess: () => {
      queryClient.resetQueries(["propsId"]);
    },
  });
  const mutateedit = useMutation(editComment, {
    onSuccess: () => {
      queryClient.resetQueries(["propsId"]);
    },
  });
  const mutatedelete = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.resetQueries(["propsId"]);
    },
  });

  const { data, isLoading, error } = useQuery(["propsId"], async () => {
    const activity = await getActivitiesId(props.id);
    const id = props.id;

    return {
      activity: activity,
      id: id,
    };
  });

  if (isLoading) {
    return <Loading />;
  }
  if (!isLoading && !data) {
    return <NotFound />;
  }

  return (
    <Layout>
      {
        <ActivityDetail
          data={data}
          isLoading={isLoading}
          error={error}
          mutatesubmit={mutatesubmit}
          mutateedit={mutateedit}
          mutatedelete={mutatedelete}
        />
      }
    </Layout>
  );
}

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
