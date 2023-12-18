import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import {
  Modal,
  Avatar,
  Switch,
  Radio,
  Divider,
  Table,
  notification,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSlideA, getAllSlides } from "../../../redux/sliderSlice";
import { SliderSection } from "../../../api";
import { ENV } from "../../../utils/constants";
import { NewSlide } from "./NewSlide";
import "./Slides.scss";

const { BASE_RESOURCES } = ENV;
const slides = new SliderSection();
const baseApi = BASE_RESOURCES;

export const Slides = () => {
  const dispatch = useDispatch();
  const [slideData, setSlideData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const user = useSelector((state) => state.user);
  const [switchState, setSwitchState] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Establece el tamaño de la página
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleSwitchChange = (checked, slideId) => {
    setSwitchState(checked);
    slides.updateStateSlide(slideId, checked).then((res) => {
      console.log(res);
    });
  };

  const handleEditClick = (slide) => {
    setSelectedSlide(slide);
    slides.getSlide(slide.id).then(() => {
      console.log("Carga información");

      setIsModalVisible(true);
    });
  };

  useEffect(() => {
    slides
      .getSlides()
      .then((res) => {
        dispatch(getAllSlides(res.data));
        setSlideData(res.data); // Update the state after dispatching
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, isSubmitting, isModalVisible]);

  useEffect(() => {
    if (isSubmitting) {
      notification.success({
        message: "Éxito",
        description: "Slide creado correctamente.",
        onClose: () => {
          setIsModalVisible(false);
        },
      });
    }
  }, [isSubmitting]);

  const columns = [
    {
      title: "Titulo",
      dataIndex: "slide_title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Descripción",
      dataIndex: "slide_description",
    },
    {
      title: "Imagen",
      dataIndex: "slide_image",
      render: (text) => (
        <Avatar
          src={`${baseApi}/${text}`}
          shape="square"
          size={64}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      title: "Fecha creación",
      dataIndex: "created_at",
    },
    {
      title: "Publicar",
      dataIndex: "active",
      filters: [
        {
          text: "Si",
          value: true,
        },
        {
          text: "No",
          value: false,
        },
      ],
      onFilter: (value, record) => record.active == value,
      filterSearch: true,
      render: (text, record) => (
        <Switch
          checkedChildren="Si"
          unCheckedChildren="No"
          defaultChecked={text}
          onChange={(checked) => handleSwitchChange(checked, record.id)}
        />
      ),
    },
    {
      title: "Acciones",
      dataIndex: "id",
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              slides
                .deleteSlide(text)
                .then((res) => {
                  dispatch(deleteSlideA(text));
                  notification.info({
                    message: "Se ha eliminado correctamente",
                    description: "Slide eliminado correctamente.",
                  });
                })
                .then(() => {
                  slides
                    .getSlides()
                    .then((res) => {
                      dispatch(getAllSlides(res.data));
                      setSlideData(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <div className="academic-experience">
      <h1>Slides &#x1F4E2;</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
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
            setSelectedSlide(null);
            setIsModalVisible(true);
          }}
        >
          Nuevo
        </button>
      </div>

      <div>
        <Divider />
        <Table
          columns={columns}
          dataSource={slideData}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
      <Modal
        title="Nuevo Slide"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
        footer={null}
      >
        <NewSlide
          closeModal={() => setIsModalVisible(false)}
          slide={selectedSlide}
        />
      </Modal>
    </div>
  );
};
