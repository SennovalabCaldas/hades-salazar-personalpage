import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sliderReducer from "./sliderSlice";
import academicExperienceReducer from "./academicExperienceSlice";
import proffessionalExperienceReducer from "./proffessionalExperienceSlice";
import categoryServicesReducer from "./categoryServicesSlice";
import servicesReducer from "./servicesSlice";
import calendarEventsReducer from "./calendarEventsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    slider: sliderReducer,
    academicExperience: academicExperienceReducer,
    proffessionalExperience: proffessionalExperienceReducer,
    categoryServices: categoryServicesReducer,
    services: servicesReducer,
    calendarEvents: calendarEventsReducer,
  },
});

export default store;
