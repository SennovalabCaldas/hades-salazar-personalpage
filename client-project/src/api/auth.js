import { ENV } from "../utils/constants";

const { BASE_API, API_ROUTES } = ENV;

export class Auth {
  baseApi = BASE_API;
  apiRoutes = API_ROUTES;

  register = async (data) => {
    const response = await fetch(`${this.baseApi}${this.apiRoutes.REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    return json;
  };

  login = async (data) => {
    console.log(`${this.baseApi}${this.apiRoutes.LOGIN}`);
    const response = await fetch(`${this.baseApi}${this.apiRoutes.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    // console.log("json=>", json);
    if (json.access) {
      this.setAccessToken(json.access);
    }
    return json;
  };

  getMe = async () => {
    const response = await fetch(`${this.baseApi}${this.apiRoutes.USER}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });

    const json = await response.json();
    // console.log("json=>", json);

    return json;
  };

  setAccessToken = (access) => {
    localStorage.setItem("access", access);
  };

  getAccessToken = () => {
    return localStorage.getItem("access");
  };

  logout = () => {  
    localStorage.removeItem("access");
  }
}
