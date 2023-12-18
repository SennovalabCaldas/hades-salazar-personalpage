import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  academic_name: "",
  academic_image: "",
  academic_description: "",
  year_start: "",
  year_end: "",
  active: false,
  academic_experiences: [],
};

const proffessionalExperienceSlice = createSlice({
  name: "academicExperience",
  initialState,
  reducers: {
    addProffessionalExperience: (state, action) => {
      const {
        id,
        academic_name,
        academic_image,
        academic_description,
        year_start,
        year_end,
        active,
      } = action.payload;
      state.id = id;
      state.academic_name = academic_name;
      state.academic_image = academic_image;
      state.academic_description = academic_description;
      state.year_start = year_start;
      state.year_end = year_end;
      state.active = active;
    },
    editProffessionalExperience: (state, action) => {
      const {
        id,
        academic_name,
        academic_image,
        academic_description,
        year_start,
        year_end,
        active,
      } = action.payload;
      state.id = id;
      state.academic_name = academic_name;
      state.academic_image = academic_image;
      state.academic_description = academic_description;
      state.year_start = year_start;
      state.year_end = year_end;
      state.active = active;
    },

    deleteProffessionalExperienceA: (state, action) => {
      const {
        id,
        academic_name,
        academic_image,
        academic_description,
        year_start,
        year_end,
        active,
      } = action.payload;
      state.id = id;
      state.academic_name = academic_name;
      state.academic_image = academic_image;
      state.academic_description = academic_description;
      state.year_start = year_start;
      state.year_end = year_end;
      state.active = active;
    },

    getAllProffessionalExperiences: (state, action) => {
      const { academic_experiences } = action.payload;
      state.academic_experiences = academic_experiences;
    },
  },
});

export const {
  addProffessionalExperience,
  editProffessionalExperience,
  deleteProffessionalExperienceA,
  getAllProffessionalExperiences,
} = proffessionalExperienceSlice.actions;
export default proffessionalExperienceSlice.reducer;
