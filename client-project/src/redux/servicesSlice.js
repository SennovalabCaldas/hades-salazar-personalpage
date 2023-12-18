import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  service_name: "",
  service_description: "",
  service_image: "",
  service_price: "",
  active: false,
  category_id: "",
  services: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    addService: (state, action) => {
      const {
        service_name,
        service_description,
        service_image,
        service_price,
        active,
        category_id,
      } = action.payload;

      state.service_name = service_name;
      state.service_description = service_description;
      state.service_image = service_image;
      state.service_price = service_price;
      state.active = active;
      state.category_id = category_id;
    },
    editSService: (state, action) => {
      const {
        service_name,
        service_description,
        service_image,
        service_price,
        active,
        category_id,
      } = action.payload;

      state.service_name = service_name;
      state.service_description = service_description;
      state.service_image = service_image;
      state.service_price = service_price;
      state.active = active;
      state.category_id = category_id;
    },

    deleteServiceA: (state, action) => {
      const {
        service_name,
        service_description,
        service_image,
        service_price,
        active,
        category_id,
      } = action.payload;

      state.service_name = service_name;
      state.service_description = service_description;
      state.service_image = service_image;
      state.service_price = service_price;
      state.active = active;
      state.category_id = category_id;
    },

    getAllServices: (state, action) => {
      const { services } = action.payload;
      console.log(services);
      state.services = services;
    },
  },
});

export const { addSService, editService, deleteServiceA, getAllServices } =
  servicesSlice.actions;
export default servicesSlice.reducer;
