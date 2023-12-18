import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Switch,
  Upload,
  notification,
} from "antd";
import { ENV } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { ServiceCategoriesSection, ServicesSection } from "../../../api";
import { addSService } from "../../../redux/servicesSlice";
import { UploadOutlined } from "@ant-design/icons";

import "./NewService.scss"; // Agrega un archivo de estilos si es necesario

const { BASE_RESOURCES } = ENV;
const baseApi = BASE_RESOURCES;

const { Option } = Select;
const services = new ServicesSection();
const serviceCategories = new ServiceCategoriesSection();

export const NewService = ({ closeModal, service }) => {
  console.log("Servicio que llega al model", service);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    closeModal();
  };

  useEffect(() => {
    serviceCategories
      .getAllServiceCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, isSubmitting, isModalVisible]);

  useEffect(() => {
    if (
      fileList.length === 1 &&
      fileList[0].url &&
      !fileList[0].originFileObj
    ) {
      setFileList([
        {
          ...fileList[0],
          originFileObj: {
            type: "image/jpeg", // Replace with actual image type
            lastModified: Date.now(),
          },
        },
      ]);
    }
  }, [fileList]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (service) {
      console.log("service=>", service);
      form.setFieldsValue({
        service_name: service.service_name || "",
        service_description: service.service_description || "",
        service_price: service.service_price || "",
        active: service.active || false,
        category_id: service.category_id || "",
      });
      if (service.service_image) {
        setFileList([
          {
            uid: "-1",
            name: "service_image",
            status: "done",
            url: `${baseApi}/${service.service_image}`,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
    console.log(service);
  }, [service]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    const uploadedFile = fileList[0]?.originFileObj;

    if (!uploadedFile) {
      console.error("No se ha seleccionado ningún archivo");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("service_name", values.service_name);
    formData.append("service_description", values.service_description);
    formData.append("service_price", values.service_price);
    formData.append("active", values.active ? 1 : 0);
    formData.append("service_image", uploadedFile);
    formData.append("category_id", values.category_id);

    try {
      await services
        .createService(formData)
        .then((res) => {
          dispatch(addSService(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
      notification.success({
        message: "Servicio creado correctamente",
      });
      closeModal();
      setIsSubmitting(false);
      form.resetFields(); // Restablece los valores del formulario
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="new-service-container">
      {service ? (
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          onFinish={handleSubmit}
          initialValues={service ? service : null}
        >
          <Form.Item
            name="service_name"
            label="Nombre del Servicio"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el nombre del servicio",
              },
            ]}
          >
            <Input placeholder="Nombre del Servicio" />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Categoría del Servicio"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione la categoría del servicio",
              },
            ]}
          >
            <Select placeholder="Seleccione una categoría">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.category_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="service_description"
            label="Descripción del Servicio"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la descripción del servicio",
              },
            ]}
          >
            <Input.TextArea placeholder="Descripción del Servicio" />
          </Form.Item>

          <Form.Item
            name="service_price"
            label="Precio del Servicio"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el precio del servicio",
              },
            ]}
          >
            <Input placeholder="Precio del Servicio" />
          </Form.Item>

          <Form.Item label="Imagen">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              beforeUpload={() => false}
            >
              {fileList.length < 1 && <UploadOutlined />}
            </Upload>
          </Form.Item>

          <Form.Item name="active" label="Activo" valuePropName="checked">
            <Switch checkedChildren="Activo" unCheckedChildren="Inactivo" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Enviar
            </Button>
            <Button
              htmlType="button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
          onFinish={handleSubmit}
        >
          {/* Agrega aquí los campos del formulario según tus necesidades */}
          <Form.Item
            name="service_name"
            label="Nombre del Servicio"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el nombre del servicio",
              },
            ]}
          >
            <Input placeholder="Nombre del Servicio" />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Categoría del Servicio"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione la categoría del servicio",
              },
            ]}
          >
            <Select placeholder="Seleccione una categoría">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.category_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="service_description"
            label="Descripción del Servicio"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la descripción del servicio",
              },
            ]}
          >
            <Input.TextArea placeholder="Descripción del Servicio" />
          </Form.Item>

          <Form.Item
            name="service_price"
            label="Precio del Servicio"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el precio del servicio",
              },
            ]}
          >
            <Input placeholder="Precio del Servicio" />
          </Form.Item>

          <Form.Item label="Imagen">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              beforeUpload={() => false}
            >
              {fileList.length < 1 && <UploadOutlined />}
            </Upload>
          </Form.Item>

          <Form.Item name="active" label="Activo" valuePropName="checked">
            <Switch checkedChildren="Activo" unCheckedChildren="Inactivo" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Enviar
            </Button>
            <Button
              htmlType="button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
