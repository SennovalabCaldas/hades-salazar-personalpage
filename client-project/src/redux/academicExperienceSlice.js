import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  academic_name: "",
  academic_image: "",
  academic_description: "",
  academic_experiences: [],
};

const academicExperienceSlice = createSlice({
  name: "academicExperience",
  initialState,
  reducers: {
    addAcademicExperience: (state, action) => {
      const { id, academic_name, academic_image, academic_description } =
        action.payload;
      state.id = id;
      state.academic_name = academic_name;
      state.academic_image = academic_image;
      state.academic_description = academic_description;
    },
    editAcademicExperience: (state, action) => {
      const { id, academic_name, academic_image, academic_description } =
        action.payload;
      state.id = id;
      state.academic_name = academic_name;
      state.academic_image = academic_image;
      state.academic_description = academic_description;
    },

    deleteAcademicExperienceA: (state, action) => {
      const { id, academic_name, academic_image, academic_description } =
        action.payload;
      state.id = id;
      state.academic_name = academic_name;
      state.academic_image = academic_image;
      state.academic_description = academic_description;
    },

    getAllAcademicExperiences: (state, action) => {
      const { academic_experiences } = action.payload;
      state.academic_experiences = academic_experiences;
    },
  },
});

export const {
  addAcademicExperience,
  editAcademicExperience,
  deleteAcademicExperienceA,
  getAllAcademicExperiences,
} = academicExperienceSlice.actions;
export default academicExperienceSlice.reducer;
