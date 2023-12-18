const SERVER_IP = "http://localhost:3100";

const API_VERSION = "api/v1";

export const ENV = {
  BASE_RESOURCES: SERVER_IP,
  BASE_API: `${SERVER_IP}/${API_VERSION}`,
  API_ROUTES: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    USER: "/auth/get-me",

    SLIDERS: "/slides",
    SLIDER: "/slides/new-slide",

    ACADEMIC_EXPERIENCES: "/academic-experiences",
    ACADEMIC_EXPERIENCE: "/academic-experiences/new-academic",

    PROFFESSIONAL_EXPERIENCES: "/proffessional-experiences",
    PROFFESSIONAL_EXPERIENCE:
      "/proffessional-experiences/new-proffessional-experience",

    SERVICE_CATEGORIES: "/service-categories",
    SERVICE_CATEGORY: "/service-categories/new-service-category",

    SERVICES: "/services",
    SERVICE: "/services/new-service",

    CALENDAR_EVENTS: "/calendar-events",
    CALENDAR_EVENT: "/calendar-events/new-calendar-event",
  },
};
