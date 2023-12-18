import React, { useEffect, useState } from "react";
import "./Homepage.scss";
import { image } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { getAllSlides } from "../../../redux/sliderSlice";
import { SliderSection } from "../../../api";
import { ENV } from "../../../utils/constants";
import { motion } from "framer-motion";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import { Navigate, useNavigate } from "react-router-dom";

const { BASE_RESOURCES } = ENV;
const colors = [
  "linear-gradient(to bottom, #313033, #3c434b, #42585f, #4d6e69, #69826b)",
  "linear-gradient(to bottom, #313033, #403e46, #504c59, #605a6d, #716982)",
  "linear-gradient(to bottom, #313033, #423e45, #564c58, #6b5b69, #82697a)",
  "linear-gradient(to bottom, #313033, #4a4145, #655251, #78685a, #808269);",
];

export const Homepage = () => {
  const dispatch = useDispatch();
  const [slideData, setSlideData] = useState([]);
  const slides = new SliderSection();
  const baseApi = BASE_RESOURCES;
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const navigate = useNavigate();

  const getRandomColorIndex = () => {
    return Math.floor(Math.random() * colors.length);
  };

  const redirectTo = () => {
    navigate("/gallery");
  };

  const handleColorChange = () => {
    setCurrentColorIndex(getRandomColorIndex());
  };

  useEffect(() => {
    slides
      .getSlides()
      .then((res) => {
        dispatch(getAllSlides(res.data));
        const activeSlides = res.data.filter((slide) => slide.active);
        setSlideData(activeSlides);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <div className="homepage">
      <AwesomeSlider
        animation="cubeAnimation"
        cssModule={AwesomeSliderStyles}
        bullets={false}
        mobileTouch={true}
        startup={true}
        infinite={true}
        fillParent={true}
        className="slider"
      >
        {slideData.map((slide, index) => {
          const colorIndex = index % colors.length;
          return (
            <div
              key={slide.id}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: colors[colorIndex],
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <motion.div>
                    <h1
                      style={{
                        textTransform: "uppercase",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    >
                      {slide.slide_title}
                    </h1>
                    <br />
                    <p
                      style={{
                        fontSize: "1.5rem",
                        textAlign: "justify",
                      }}
                    >
                      {slide.slide_description}
                    </p>
                    <button
                      class="btn"
                      onClick={() => {
                        redirectTo("/gallery");
                      }}
                    >
                      <i class="animation"></i>VER GALERÍA<i class="animation"></i>
                    </button>
                  </motion.div>
                  <img
                    src={image.hades}
                    alt="slide"
                    style={{
                      width: "50%",
                      height: "50%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </AwesomeSlider>
    </div>
  );
};
