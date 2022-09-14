import type { NextPage } from "next";
import { TripCard } from "../components/TripCard";
import { Trip } from "src/interfaces/Trip";
import { SimpleGrid } from "@chakra-ui/react";

interface Props {
  trips: Trip[];
}

export default function Trips({ trips }: Props) {
  return trips.length === 0 ? (
    <div>
      <h1>There are no trips yet! </h1>
    </div>
  ) : (
    <SimpleGrid minChildWidth="330px" spacing={2}>
      {trips.map((t) => (
        <TripCard key={t.id} props={t} />
      ))}
    </SimpleGrid>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/trips"); //chequear que endPoint eligen los chicos en Api
  const trips = await res.json();
  return {
    props: {
      trips: trips,
    },
  };
};
