import { Box } from "@chakra-ui/react";
import { Trip } from "src/interfaces/Trip";
import Layout from "../../components/layout/Layout";
import TripDetail from "../../components/TripDetail";
import { QueryFunctionContext, useQuery } from "react-query";
import { getTripId, getTrips } from "src/utils/trips";
import TripsControllers from "src/controllers/trips";
import axios from "axios";
import { GetServerSideProps } from "next/types";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { getEthPrice } from "src/utils/web3";

interface Props {
  id: QueryFunctionContext<string[], any>;
  trip: Trip;
  ethPrice: string;
}

export default function Detail(props: Props) {
  console.log(props.ethPrice);
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { data, isLoading, error } = useQuery(
    ["propsId"],
    () => getTripId(props.id),
    {
      initialData: props.trip,
    }
  );

  if (!userLoading && !user) {
    router.push("/api/auth/login");
    return <div></div>;
  }
  return (
    <Layout>
      <NextSeo title={data.name} />
      <TripDetail
        data={data}
        isLoading={isLoading}
        error={error}
        ethPrice={props.ethPrice}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await axios.get(`/trips/${id}`);
  const trip = response.data;
  const ethPrice = await getEthPrice();
  return {
    props: {
      trip: trip,
      id: id,
      ethPrice: ethPrice.market_data.current_price.usd,
    },
  };
};
