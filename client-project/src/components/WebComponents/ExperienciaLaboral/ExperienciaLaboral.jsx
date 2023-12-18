import React, { useState, useEffect } from "react";
import { animated, useSpring, config } from "react-spring";
import { Link } from "react-scroll";

export const ExperienciaLaboral = () => {
  const [visible, setVisible] = useState(false);

  // Configuración de la animación con react-spring
  const timelineSpring = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(50px)",
    config: config.slow,
  });

  // Manejar la visibilidad del componente al hacer scroll
  const handleScroll = () => {
    const yOffset = window.pageYOffset;
    setVisible(yOffset > 100); // Puedes ajustar este valor según tus necesidades
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <animated.div style={timelineSpring} className="timeline">
      <Link to="event1" smooth={true} duration={500}>
        Evento 1
      </Link>
      <Link to="event2" smooth={true} duration={500}>
        Evento 2
      </Link>
      <Link to="event3" smooth={true} duration={500}>
        Evento 3
      </Link>
      {/* Agrega más eventos según sea necesario */}
    </animated.div>
  );
};
