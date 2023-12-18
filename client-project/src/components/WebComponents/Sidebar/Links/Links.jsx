import React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05 },
    staggeredDirection: -1,
  },
};
const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

export const Links = () => {
  const items = [
    "Homepage",
    "Experiencia",
    "Servicios",
    "Proyectos",
    "Contacto",
    "Blog",
  ];
  return (
    <motion.div className="links" variants={variants}>
      {items.map((item) => (
        <motion.a
          href={`#${item}`}
          key={item}
          variants={itemVariants}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
        >
          {item}
        </motion.a>
      ))}
    </motion.div>
  );
};
