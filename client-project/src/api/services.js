import { ENV } from "../utils/constants";
import { Auth } from "./auth";

const { BASE_API, API_ROUTES } = ENV;
const auth = new Auth();

export class ServicesSection {
  baseApi = BASE_API;
  apiRoutes = API_ROUTES;

  createService = async (data) => {
    console.log("data=>", data);
    const response = await fetch(`${this.baseApi}${this.apiRoutes.SERVICE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
      },
      body: data,
    });

    const json = await response.json();

    return json;
  };

  getServices = async () => {
    console.log("Esot en getServices");
    const response = await fetch(`${this.baseApi}${this.apiRoutes.SERVICES}`, {
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

  getService = async (id) => {
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.SERVICES}/${id}`,
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

  updateStateService = async (id, checked) => {
    const url = `${this.baseApi}${this.apiRoutes.SERVICES}/${id}/active`;

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

  updateServicer = async (formData, id) => {
    try {
      const url = `${this.baseApi}${this.apiRoutes.SERVICES}/${id}`;
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

  deleteService = async (id) => {
    console.log(`${this.baseApi}${this.apiRoutes.SERVICES}/${id}`);
    const response = await fetch(
      `${this.baseApi}${this.apiRoutes.SERVICES}/${id}`,
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
