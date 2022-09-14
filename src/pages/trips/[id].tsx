import { Box } from "@chakra-ui/react";
import { Trip } from "src/interfaces/Trip";
import Layout from "../../components/layout/Layout";
import TripDetail from "../../components/TripDetail";

interface Props {
  Trip: Trip;
}

export default function Detail({ trip }) {
  console.log(trip);
  return (
    <Layout>
      <TripDetail props={trip} />
    </Layout>
  );
}

export async function getStaticPaths(context) {
  const allTrips = await fetch("http://localhost:3000/api/trips");
  const json = await allTrips.json();
  const paths = json.map((t) => {
    const id = t.id;
    return { params: { id } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch("http://localhost:3000/api/trips/" + id);
  const trip = await res.json();
  return {
    props: {
      trip: trip,
    },
  };
}
