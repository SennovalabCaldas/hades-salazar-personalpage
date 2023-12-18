import React from "react";
import { image } from "../../../assets";
import { motion } from "framer-motion";
import "./Nabvar.scss";
import { Sidebar } from "../Sidebar/Sidebar";

export const Nabvar = () => {
  return (
    <div className="navbar">
      <Sidebar></Sidebar>
      <div className="wrapper">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={image.logo} alt="logo" />
        </motion.div>
        <div className="social">
          <a href="https://www.facebook.com/hades.salazar.5">
            <img src={image.fb} alt="facebook" />
          </a>
          <a href="https://www.instagram.com/hades_salazar/">
            <img src={image.ig} alt="instagram" />
          </a>
          <a href="https://www.linkedin.com/in/hades-salazar-3b8b8a1b8/">
            <img src={image.x} alt="linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
};
