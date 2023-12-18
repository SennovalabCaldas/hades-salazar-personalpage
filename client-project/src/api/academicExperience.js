import { ENV } from "../utils/constants";
import { Auth } from "./auth";

const { BASE_API, API_ROUTES } = ENV;
const auth = new Auth();

export class AcademicExperienceSection {
  baseApi = BASE_API;
  apiRoutes = API_ROUTES;

  createAcademicExperience = async (data) => {
    console.log("data=>", data);
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.ACADEMIC_EXPERIENCE}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: data,
      }
    );

    const json = await response.json();

    return json;
  };

  getAcademicExperiences = async () => {
    console.log(`${this.baseApi}${this.apiRoutes.ACADEMIC_EXPERIENCES}`);
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.ACADEMIC_EXPERIENCES}`
    );

    console.log("response=>", response);
    const json = await response.json();
    console.log("json=>", json);
    return json;
  };

  getAcademicExperience = async (id) => {
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.ACADEMIC_EXPERIENCES}/${id}`,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    return json;
  };

  updateStateAcademicExperience = async (id, checked) => {
    const url = `${this.baseApi}${this.apiRoutes.ACADEMIC_EXPERIENCES}/${id}/active`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ active: checked }), // Enviar el estado 'active' en formato JSON
      });

      if (!response.ok) {
        throw new Error(
          `Error al actualizar el estado del slide: ${response.statusText}`
        );
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error en la actualización del estado del slide:", error);
      throw error;
    }
  };

  updateAcademicExperience = async (formData, id) => {
    try {
      const url = `${this.baseApi}${this.apiRoutes.ACADEMIC_EXPERIENCES}/${id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: formData, // No se establece el Content-Type, se deja que el navegador lo maneje automáticamente.
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el slide: ${response.statusText}`);
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error en la actualización del slide:", error);
      throw error;
    }
  };

  deleteAcademicExperience = async (id) => {
    console.log(`${this.baseApi}${this.apiRoutes.ACADEMIC_EXPERIENCES}/${id}`);
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.ACADEMIC_EXPERIENCES}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      }
    );

    const json = await response.json();

    return json;
  };
}
