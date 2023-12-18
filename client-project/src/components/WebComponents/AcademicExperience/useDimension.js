import React, { useEffect } from "react";

export const useDimension = () => {
  const [dimension, setDimension] = React.useState({
    width: 0,
    height: 0,
  });

  const updateDimension = () => {
    const { innerWidth, innerHeight } = window;
    setDimension({
      width: innerWidth,
      height: innerHeight,
    });
  };

  useEffect(() => {
    updateDimension();
    window.addEventListener("resize", updateDimension);
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  return dimension;
};
