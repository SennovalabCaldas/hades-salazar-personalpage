import React, { useEffect, useState } from "react";
import { CalendarEventsSection } from "../../../api";
import { Button, Form, Input, Select, Option, notification, Tag } from "antd";
import {
  addCalendarEvent,
  getAllEvents,
} from "../../../redux/calendarEventsSlice";
import { useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/es";

const calendarEvents = new CalendarEventsSection();

const isDateDisabled = (current) => {
  const currentDate = moment();
  console.log(currentDate.startOf("day"));
  return (
    current &&
    (current < currentDate.startOf("day") ||
      current > currentDate.add(1, "year"))
  );

  // return current && current < moment().endOf("day");
};

export const NewCalendarEvent = ({
  setIsSubmitting,
  setIsModalVisible,
  selectedEvent,
  setSelectedEvent,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const isSubmitting = false;
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title || "");
      setDescription(selectedEvent.description || "");
      setStart(selectedEvent.start || "");
      setEnd(selectedEvent.end || "");
      setStatus(selectedEvent.status || "");
    }
  }, [selectedEvent]);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const response = await calendarEvents.createCalendarEvent({
      title: title,
      description: description,
      start: start,
      end: end,
      status: status,
    });
    dispatch(addCalendarEvent(response));
    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
    setStatus("");

    if (response.error) {
      console.log(response.error);
      setIsSubmitting(false);
      return;
    }

    console.log(response);
    setIsSubmitting(false);
    setIsModalVisible(false);
  };

  const options = [
    { value: "Pendiente" },
    { value: "Cancelar" },
    { value: "Confirmar" },
  ];

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={
          value === "Pendiente"
            ? "default"
            : value === "Cancelar"
            ? "error"
            : "success"
        }
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}

      >
        {label}
      </Tag>
    );
  };

  const onFinishUpdate = async (values) => {
    setIsSubmitting(true);
    const response = await calendarEvents.updateCalendarEvent(
      selectedEvent.id,
      {
        title: title,
        description: description,
        start: start,
        end: end,
        status: status,
      }
    );
    dispatch(addCalendarEvent(response));
    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
    setStatus("");

    if (response.error) {
      console.log(response.error);
      setIsSubmitting(false);
      return;
    }

    console.log(response);
    setIsSubmitting(false);
    setIsModalVisible(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
    setStatus("");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="modal fade"
      id="newCalendarEventModal"
      tabIndex="-1"
      aria-labelledby="newCalendarEventModalLabel"
      aria-hidden="true"
    >
      {selectedEvent ? (
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinishUpdate}
          onFinishFailed={onFinishFailed}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <Button
                  type="button"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    calendarEvents
                      .deleteCalendarEvent(selectedEvent.id)
                      .then((res) => {
                        dispatch(addCalendarEvent(res.data));
                        dispatch(getAllEvents());
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    notification.info({
                      message: "Se ha eliminado correctamente",
                      description: "Evento eliminado correctamente.",
                    });
                    closeModal();
                  }}
                  style={{
                    border: "none",
                    borderRadius: "0.5rem",
                    backgroundColor: "#faad14",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                ></Button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <Input.TextArea
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="start" className="form-label">
                    Start
                  </label>
                  <Input
                    type="datetime-local"
                    className="form-control"
                    id="start"
                    name="start"
                    onChange={(e) =>
                      setStart(
                        moment(e.target.value).format("YYYY-MM-DDTHH:mm")
                      )
                    }
                    value={start}
                    required
                    disabledDate={isDateDisabled}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="end" className="form-label">
                    End
                  </label>
                  <Input
                    type="datetime-local"
                    className="form-control"
                    id="end"
                    name="end"
                    onChange={(e) => setEnd(e.target.value)}
                    value={end}
                    required
                    disabledDate={isDateDisabled}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <Select
                    mode="multiple"
                    tagRender={tagRender}
                    defaultValue={["Cancelar", "Confirmar"]}
                    style={{
                      width: "100%",
                    }}
                    options={options}
                  />
                </div>
              </div>
              <div
                className="modal-footer"
                style={{
                  display: "flex",

                  justifyContent: "flex-end",
                  paddingTop: "10px",

                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{
                    marginRight: "1rem",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "0.5rem",
                    backgroundColor: "#1890ff",
                  }}
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  disabled={isSubmitting}
                  style={{
                    marginRight: "1rem",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "0.5rem",
                    backgroundColor: "#faad14",
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </Form>
      ) : (
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <Input.TextArea
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="start" className="form-label">
                    Start
                  </label>
                  <Input
                    type="datetime-local"
                    className="form-control"
                    id="start"
                    name="start"
                    onChange={(e) =>
                      setStart(
                        moment(e.target.value).format("YYYY-MM-DDTHH:mm")
                      )
                    }
                    value={start}
                    required
                    disabledDate={isDateDisabled}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="end" className="form-label">
                    End
                  </label>
                  <Input
                    type="datetime-local"
                    className="form-control"
                    id="end"
                    name="end"
                    onChange={(e) => setEnd(e.target.value)}
                    value={end}
                    required
                    disabledDate={isDateDisabled}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <Select
                    mode="multiple"
                    tagRender={tagRender}
                    defaultValue={["Cancelar", "Confirmar"]}
                    style={{
                      width: "100%",
                    }}
                    options={options}
                  />
                </div>
              </div>
              <div
                className="modal-footer"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "10px",

                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{
                    marginRight: "1rem",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "0.5rem",
                    backgroundColor: "#1890ff",
                  }}
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  disabled={isSubmitting}
                  style={{
                    marginRight: "1rem",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "0.5rem",
                    backgroundColor: "#faad14",
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
};
