import { Box } from "@chakra-ui/react";
import { Trip } from "src/interfaces/Trip";
import Layout from "../../components/layout/Layout";
import TripDetail from "../../components/TripDetail";
import { QueryFunctionContext, useQuery } from "react-query";
import { getTripId, getTrips } from "src/utils/trips";
import TripsControllers from "src/controllers/trips";
import axios from "axios";
import { GetServerSideProps } from "next/types";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await axios.get(`/trips/${id}`);
  const trip = response.data;
  return {
    props: {
      trip: trip,
      id: id,
    },
  };
};
