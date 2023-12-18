import { ENV } from "../utils/constants";
import { Auth } from "./auth";

const { BASE_API, API_ROUTES } = ENV;
const auth = new Auth();

export class ServiceCategoriesSection {
  baseApi = BASE_API;
  apiRoutes = API_ROUTES;

  createServiceCategories = async (data) => {
    console.log("data=>", data);
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.SERVICE_CATEGORY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify(data),
      }
    );

    const json = await response.json();

    return json;
  };

  getAllServiceCategories = async () => {
    console.log("Esot en getSlides");
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.SERVICE_CATEGORIES}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      }
    );
    console.log("response=>", response);
    const json = await response.json();
    console.log("json=>", json);
    return json;
  };

  getSlide = async (id) => {
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.SERVICE_CATEGORIES}/${id}`,
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

  updateStateServiceCategories = async (id, checked) => {
    const url = `${this.baseApi}${this.apiRoutes.SERVICE_CATEGORIES}/${id}/active`;

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

  updateServiceCategories = async (id, data) => {
    try {
      const response = await fetch(
        `${this.baseApi}${this.apiRoutes.SERVICE_CATEGORIES}/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify(data),
        }
      );

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

  deleteServiceCategories = async (id) => {
    console.log(`${this.baseApi}${this.apiRoutes.SERVICE_CATEGORIES}/${id}`);
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.SERVICE_CATEGORIES}/${id}`,
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
