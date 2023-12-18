import React from "react";
import "./Home.scss";
import { Nabvar } from "./Nabvar/Nabvar";
import { Homepage } from "./Homepage/Homepage";
import { ExperienciaLaboral } from "./ExperienciaLaboral/ExperienciaLaboral";
export const Home = () => {
  return (
    <div>
      <section id="Homepage">
        <Nabvar />
        <Homepage />
      </section>
      <section id="ExperienciaLaboral">
        <ExperienciaLaboral />
      </section>
      <section id="Experiencia">Experiencia</section>
      <section id="Servicios">Servicios</section>
      <section id="Proyectos">Proyectos</section>
      <section id="Contacto">Contacto</section>
      <section id="Blog">Blog
      </section>
    </div>
  );
};
