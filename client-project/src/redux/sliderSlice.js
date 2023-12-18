import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  slide_name: "",
  slide_image: "",
  slide_description: "",
  slides: [],
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    addSlide: (state, action) => {
      const { id, slide_name, slide_image, slide_description } = action.payload;
      state.id = id;
      state.slide_name = slide_name;
      state.slide_image = slide_image;
      state.slide_description = slide_description;
    },
    editSlide: (state, action) => {
      const { id, slide_name, slide_image, slide_description } = action.payload;
      state.id = id;
      state.slide_name = slide_name;
      state.slide_image = slide_image;
      state.slide_description = slide_description;
    },

    deleteSlideA: (state, action) => {
      const { id, slide_name, slide_image, slide_description } = action.payload;
      state.id = id;
      state.slide_name = slide_name;
      state.slide_image = slide_image;
      state.slide_description = slide_description;
    },

    getAllSlides: (state, action) => {
      const { slides } = action.payload;
      state.slides = slides;
    },
  },
});

export const { addSlide, editSlide, deleteSlideA, getAllSlides } =
  sliderSlice.actions;
export default sliderSlice.reducer;
