import { ENV } from "../utils/constants";
import { Auth } from "./auth";

const { BASE_API, API_ROUTES } = ENV;
const auth = new Auth();

export class SliderSection {
  baseApi = BASE_API;
  apiRoutes = API_ROUTES;

  createSlider = async (data) => {
    console.log("data=>", data);
    const response = await fetch(`${this.baseApi}${this.apiRoutes.SLIDER}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
      },
      body: data,
    });

    const json = await response.json();

    return json;
  };

  getSlides = async () => {
    console.log("Esot en getSlides");
    const response = await fetch(`${this.baseApi}${this.apiRoutes.SLIDERS}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
      },
    });
    console.log("response=>", response);
    const json = await response.json();
    console.log("json=>", json);
    return json;
  };

  getSlide = async (id) => {
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.SLIDERS}/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      }
    );

    const json = await response.json();
    return json;
  };

  updateStateSlide = async (id, checked) => {
    const url = `${this.baseApi}${this.apiRoutes.SLIDERS}/${id}/active`;

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

  updateSlider = async (formData, id) => {
    try {
      const url = `${this.baseApi}${this.apiRoutes.SLIDERS}/${id}`;
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

  deleteSlide = async (id) => {
    console.log(`${this.baseApi}${this.apiRoutes.SLIDERS}/${id}`);
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.SLIDERS}/${id}`,
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
