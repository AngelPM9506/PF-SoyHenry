import type { NextPage } from "next";
import { TripCard } from "../components/TripCard";
import { Trip } from "src/interfaces/Trip";

interface Props {
  trips: Trip[];
}

export default function Trips({ trips }: Props) {
  return (
    //  props.Trips.length === 0 ? (
    //   <div>
    //     <h1>There are no trips yet! </h1>
    //   </div>
    // ) :
    // (
    <div>
      <h1>All the trips will be here!</h1>
      {trips.map((t) => (
        <TripCard key={t.id} props={t} />
      ))}
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/trips"); //chequear que endPoint eligen los chicos en Api
  const trips = await res.json();
  console.log(trips);
  return {
    props: {
      trips: trips,
    },
  };
};
