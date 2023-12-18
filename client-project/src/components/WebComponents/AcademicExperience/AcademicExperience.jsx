import React, { useEffect, useRef } from "react";
import { image } from "../../../assets";
import "./AcademicExperience.scss";
import { Image } from "antd";
import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useDimension } from "./useDimension";

const images = [image.img1, image.img2, image.img3, image.img4];

export const AcademicExperience = () => {
  const container = useRef(null);
  const { height } = useDimension();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 4.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="main">
      <div className="spacer" />
      <div className="gallery">
        <Column images={[images[0], images[1], images[0], images[1]]} y={y1} />
        <Column images={[images[2], images[3], images[0], images[1]]} y={y2} />
        <Column images={[images[2], images[3], images[0], images[1]]} y={y3} />
        <Column images={[images[0], images[3], images[1], images[1]]} y={y4} />
      </div>
      <div className="spacer" />
    </div>
  );
};

const Column = ({ images, y = 0 }) => {
  return (
    <motion.div style={{ y }} className="column">
      {images.map((image, index) => (
        <div key={index} className="image-wrapper">
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <Image
              src={image}
              alt="img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
};
