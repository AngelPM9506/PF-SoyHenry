import { Box } from "@chakra-ui/react";
import { Activity } from "src/utils/interface";
import axios from "axios";
import Layout from "../../components/layout/Layout";

import { getActivities, getActivitiesId } from "src/utils/activities";
import { QueryFunctionContext, useQuery } from "react-query";
import ActivityDetail from "src/components/ActivityDetail";
import ActivitiesControles from "src/controllers/activities";

interface Props {
  id: QueryFunctionContext<string[], any>;
  activity: Activity;
}

export default function Detail(props: Props) {
  const { data, isLoading, error } = useQuery(
    ["propsId"],
    () => getActivitiesId(props.id),
    {
      initialData: props.activity,
    }
  );

  return (
    <Layout>
      {<ActivityDetail data={data} isLoading={isLoading} error={error} />}
    </Layout>
  );
}

export async function getStaticPaths(context: any) {
  const activities = await ActivitiesControles.getActivities({});
  const paths = activities.map((a: any) => {
    const id = a.id;
    return { params: { id } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { id } = params;

  const activity = await ActivitiesControles.getActivity({ id });
  return {
    props: {
      activity,
      id,
    },
  };
}
