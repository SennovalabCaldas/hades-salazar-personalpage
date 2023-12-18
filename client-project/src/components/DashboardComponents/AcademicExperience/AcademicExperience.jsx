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
import { ENV } from "../../../utils/constants";
import { AcademicExperienceSection } from "../../../api";
import {
  deleteAcademicExperienceA,
  getAllAcademicExperiences,
} from "../../../redux/academicExperienceSlice";
import { NewAcademicExperience } from "./NewAcademicExperience";
import "./AcademicExperience.scss";

const { BASE_RESOURCES } = ENV;
const academicExperiences = new AcademicExperienceSection();
const baseApi = BASE_RESOURCES;

export const AcademicExperience = () => {
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
    academicExperiences
      .updateStateAcademicExperience(slideId, checked)
      .then((res) => {
        console.log(res);
      });
  };

  const handleEditClick = (slide) => {
    setSelectedSlide(slide);
    academicExperiences.getAcademicExperience(slide.id).then(() => {
      console.log("Carga información");

      setIsModalVisible(true);
    });
  };

  useEffect(() => {
    academicExperiences
      .getAcademicExperiences()
      .then((res) => {
        dispatch(getAllAcademicExperiences(res.data));
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
      title: "Nombre curso",
      dataIndex: "academic_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Institución",
      dataIndex: "academic_description",
    },
    {
      title: "Año graduación",
      dataIndex: "year_of_experience",
    },
    {
      title: "Imagen",
      dataIndex: "academic_image",
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
              academicExperiences
                .deleteAcademicExperience(text)
                .then((res) => {
                  dispatch(deleteAcademicExperienceA(text));
                  notification.info({
                    message: "Se ha eliminado correctamente",
                    description: "Slide eliminado correctamente.",
                  });
                })
                .then(() => {
                  academicExperiences
                    .getAcademicExperiences()
                    .then((res) => {
                      dispatch(getAllAcademicExperiences(res.data));
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
      <h1>Experiencia académica &#x1F9BE;</h1>

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
        title="Experiencia académica"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
        footer={null}
      >
        <NewAcademicExperience
          closeModal={() => setIsModalVisible(false)}
          slide={selectedSlide}
        />
      </Modal>
    </div>
  );
};
