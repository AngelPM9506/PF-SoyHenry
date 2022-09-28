import { useColorModeValue } from "@chakra-ui/react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

export const Arrow = ({ className, style, onClick }: any) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        borderRadius: "50%",
        display: "block",
        background: useColorModeValue("#293541", "none"),
      }}
      onClick={onClick}
    />
  );
};

export var settings = {
  adaptiveHeight: true,
  adaptiveWidth: true,
  pauseOnHover: true,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2500,
  cssEase: "linear",
  prevArrow: <Arrow />,
  nextArrow: <Arrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
