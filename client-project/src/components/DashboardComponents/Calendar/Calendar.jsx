// https://www.youtube.com/watch?v=ZFhDJAOd9Tg

import React, { useEffect, useState } from "react";
import moment from "moment"; // Agrega esta línea para importar moment
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEventsSection } from "../../../api";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../../redux/calendarEventsSlice";
import { Modal } from "antd";
import { NewCalendarEvent } from "./NewCalendarEvent";
import "./Calendar.scss";

const calendarEvents = new CalendarEventsSection();

export const Calendar = () => {
  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);
  const [eventsData, setEventsData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    calendarEvents
      .getAllCalendarEvents()
      .then((res) => {
        dispatch(getAllEvents(res.data));
        setEventsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, isSubmitting, isModalVisible]);

  const formattedEvents = eventsData.map((event) => ({
    ...event,
    start: moment(event.start).toDate(),
    end: moment(event.end).toDate(),
  }));

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h1>Calendario</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <button
            style={{
              marginRight: "1rem",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "0.5rem",
              backgroundColor: "#1890ff",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedEvent(null);
              setIsModalVisible(true);
            }}
          >
            Nuevo
          </button>
        </div>
      </div>
      <div>
        <BigCalendar
          localizer={localizer}
          events={formattedEvents}
          toolbar={true}
          selectable={true}
          formats={{
            dayHeaderFormat: (date, culture, localizer) =>
              localizer.format(date, "dddd", culture),
          }}
          min={moment().toDate()} // Utilizar moment para obtener la fecha actual
          onSelectEvent={(event) => {
            setSelectedEvent(event);
            setIsModalVisible(true);
          }}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 500,
            backgroundColor: "#ffffff",
            border: "1px solid #e8e8e8",
            borderRadius: "2px",
          }}
        />
      </div>
      <Modal
        title="Nuevo evento"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <NewCalendarEvent
          setIsSubmitting={setIsSubmitting}
          setIsModalVisible={setIsModalVisible}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </Modal>
    </div>
  );
};
