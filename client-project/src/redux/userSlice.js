import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  active: false,
  phone_number: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      const { id, first_name, last_name, email, active, phone_number } =
        action.payload;
      state.id = id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.active = active;
      state.phone_number = phone_number;
    },
    login: (state, action) => {
      const { access, refresh } = action.payload;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    },
    logout: (state) => {
      state.id = "";
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.active = false;
      state.phone_number = "";
    },
    getMe: (state, action) => {
      const { id, first_name, last_name, email, active, phone_number } =
        action.payload;
        console.log("action.payload=>", action.payload);
      Object.assign(state, {
        id,
        first_name,
        last_name,
        email,
        active,
        phone_number,
      });
    },
  },
});

export const { register, login, logout, getMe } = userSlice.actions;
export default userSlice.reducer;
