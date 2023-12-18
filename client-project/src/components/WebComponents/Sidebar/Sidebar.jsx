import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToogleButton } from "./ToogleButton/ToogleButton";
import { Links } from "./Links/Links";
import "./Sidebar.scss";
import { type } from "@testing-library/user-event/dist/type";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(true);

  const variants = {
    open: {
      clipPath: "circle(1200px at 50px 50px)",
      transition: { type: "spring", stiffness: 20 },
    },
    closed: {
      clipPath: "circle(30px at 50px 50px)",
      transition: { delay: 0.5, type: "spring", stiffness: 400, damping: 40 },
    },
  };

  return (
    <motion.div className="sidebar" animate={open ? "open" : "closed"}>
      <motion.div className="bg" variants={variants}>
        <Links></Links>
      </motion.div>
      <ToogleButton setOpen={setOpen}></ToogleButton>
    </motion.div>
  );
};
