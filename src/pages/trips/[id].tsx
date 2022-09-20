import { Box } from "@chakra-ui/react";
import { Trip } from "src/interfaces/Trip";
import Layout from "../../components/layout/Layout";
import TripDetail from "../../components/TripDetail";
import { QueryFunctionContext, useQuery } from "react-query";
import { getTripId, getTrips } from "src/utils/trips";
import TripsControllers from "src/controllers/trips";

interface Props {
  id: QueryFunctionContext<string[], any>;
  trip: Trip;
}

export default function Detail(props: Props) {
  const { data, isLoading, error } = useQuery(
    ["propsId"],
    () => getTripId(props.id),
    {
      initialData: props.trip,
    }
  );
  return (
    <Layout>
      <TripDetail data={data} isLoading={isLoading} error={error} />
    </Layout>
  );
}

export async function getStaticPaths(context: any) {
  const allTrips = await TripsControllers.getTrips({});
  const paths = allTrips.map((t: any) => {
    const id = t.id;
    return { params: { id } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { id } = params;
  const trip = await TripsControllers.getTrip({ id });
  return {
    props: {
      trip,
      id,
    },
  };
}
