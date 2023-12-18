import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  category_name: "",
  active: false,
  serviceCategories: [],
};

const categoryServicesSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    addServiceCategories: (state, action) => {
      const { category_name, active } = action.payload;
      state.category_name = category_name;
      state.active = active;
    },
    editServiceCategories: (state, action) => {
      const { id, category_name, active } = action.payload;
      state.id = id;
      state.category_name = category_name;
      state.active = active;
    },
    deleteServiceCategoriesA: (state, action) => {
      const { id, category_name, active } = action.payload;
      state.id = id;
      state.category_name = category_name;
      state.active = active;
    },
    getAllServiceCategories: (state, action) => {
      const { serviceCategories } = action.payload;
      state.serviceCategories = serviceCategories;
    },
  },
});

export const {
  addServiceCategories,
  editServiceCategories,
  deleteServiceCategoriesA,
  getAllServiceCategories,
} = categoryServicesSlice.actions;
export default categoryServicesSlice.reducer;
