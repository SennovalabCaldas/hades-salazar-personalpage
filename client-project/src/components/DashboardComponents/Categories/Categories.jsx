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
import { NewServiceCategory } from "./NewServiceCategory";
import "./Categories.scss";
import { ServiceCategoriesSection } from "../../../api/serviceCategories";
import {
  deleteServiceCategoriesA,
  getAllServiceCategories,
} from "../../../redux/categoryServicesSlice";

const { BASE_RESOURCES } = ENV;
const serviceCategories = new ServiceCategoriesSection();
const baseApi = BASE_RESOURCES;

export const Categories = ({ closeModal, slide }) => {
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
    serviceCategories
      .updateStateServiceCategories(slideId, checked)
      .then((res) => {
        console.log(res);
      });
  };

  const handleEditClick = (slide) => {
    setSelectedSlide(slide);
    serviceCategories.getSlide(slide.id).then(() => {
      console.log("Carga información");

      setIsModalVisible(true);
    });
  };

  useEffect(() => {
    serviceCategories
      .getAllServiceCategories()
      .then((res) => {
        dispatch(getAllServiceCategories(res.data));
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
      title: "🏷 IDENTIFICADOR",
      dataIndex: "category_name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Visible",
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
              serviceCategories
                .deleteServiceCategories(text)
                .then((res) => {
                  dispatch(deleteServiceCategoriesA(text));
                  notification.info({
                    message: "Se ha eliminado correctamente",
                    description: "Slide eliminado correctamente.",
                  });
                })
                .then(() => {
                  serviceCategories
                    .getAllServiceCategories()
                    .then((res) => {
                      dispatch(getAllServiceCategories(res.data));
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
      <h1>Categorías de servicios &#x1F516;</h1>

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
        title="Nueva categoría de servicio"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => setIsModalVisible(false)}
        footer={null}
      >
        <NewServiceCategory
          closeModal={() => setIsModalVisible(false)}
          categoryService={selectedSlide}
        />
      </Modal>
    </div>
  );
};
