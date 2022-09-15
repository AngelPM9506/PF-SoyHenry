import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Trip } from "src/utils/interface";
import { TripCard } from "./TripCard";

interface Props {
  trips: Trip[];
}

const CarouselTrips = ({ trips }: Props) => {
  const lastTrips = trips?.reverse().slice(0, 11);
  console.log(lastTrips);
  return (
    <Carousel infiniteLoop>
      {lastTrips?.map((t) => {
        return <TripCard props={t} />;
      })}
    </Carousel>
  );
};

export default CarouselTrips;
