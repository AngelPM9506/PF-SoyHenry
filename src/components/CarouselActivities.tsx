import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Activity, Trip } from "src/utils/interface";
import { TripCard } from "./TripCard";

interface Props {
  activities: Activity[];
}

const CarouselActivities = ({ activities }: Props) => {
  const lastActivities = activities?.reverse().slice(0, 11);
  return (
    <Carousel infiniteLoop>
      {lastActivities?.map((t, i) => {
        return <div key={i}>Activitiees</div>;
      })}
    </Carousel>
  );
};

export default CarouselActivities;
