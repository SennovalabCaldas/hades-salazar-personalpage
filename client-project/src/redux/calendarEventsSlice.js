import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  title: "",
  start: "",
  end: "",
  calendarEvents: [],
};

const calendarEventsSlice = createSlice({
  name: "calendarEvents",
  initialState,
  reducers: {
    addCalendarEvent: (state, action) => {
      const { title, start, end } = action.payload;
      state.title = title;
      state.start = start;
      state.end = end;
    },
    editCalendarEvent: (state, action) => {
      const { id, title, start, end } = action.payload;
      state.id = id;
      state.title = title;
      state.start = start;
      state.end = end;
    },
    deleteCalendarEvent: (state, action) => {
      const { id, title, start, end } = action.payload;
      state.id = id;
      state.title = title;
      state.start = start;
      state.end = end;
    },
    getAllEvents: (state, action) => {
      const { calendarEvents } = action.payload;
      state.calendarEvents = calendarEvents;
    },
  },
});

export const {
  addCalendarEvent,
  editCalendarEvent,
  deleteCalendarEvent,
  getAllEvents,
} = calendarEventsSlice.actions;
export default calendarEventsSlice.reducer;
