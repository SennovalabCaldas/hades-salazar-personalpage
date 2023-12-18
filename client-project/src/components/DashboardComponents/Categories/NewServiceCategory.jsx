import React, { useState } from "react";
import { Button, Form, Input, Modal, Switch, notification } from "antd";
import { ENV } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { ServiceCategoriesSection } from "../../../api/serviceCategories";
import {
  addServiceCategories,
  getAllServiceCategories,
} from "../../../redux/categoryServicesSlice";

const { BASE_RESOURCES } = ENV;
const baseApi = BASE_RESOURCES;

const categories = new ServiceCategoriesSection();

export const NewServiceCategory = ({ closeModal, categoryService }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    closeModal();
  };

  const handleSubmit = async (values) => {
    console.log(values);
    setIsSubmitting(true);

    try {
      await categories
        .createServiceCategories(values)
        .then((res) => {
          dispatch(addServiceCategories(res.data));
          dispatch(getAllServiceCategories());
        })
        .catch((err) => {
          console.log(err);
        });
      notification.success({
        message: "Service Category added successfully",
      });
      closeModal();
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitEdit = async (values) => {
    console.log(values);
    setIsSubmitting(true);

    try {
      await categories
        .updateServiceCategories(categoryService.id, values)
        .then((res) => {
          dispatch(addServiceCategories(res.data));
          dispatch(getAllServiceCategories());
        })
        .catch((err) => {
          console.log(err);
        });
      notification.success({
        message: "Service Category updated successfully",
      });
      closeModal();
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        onFinish={categoryService ? handleSubmitEdit : handleSubmit}
        initialValues={categoryService ? categoryService : null}
      >
        <Form.Item
          name="category_name"
          rules={[
            {
              required: true,
              message: "Please input the category name!",
            },
          ]}
        >
          <Input placeholder="Nombre de la categoría" />
        </Form.Item>
        <Form.Item name="active" label="Active" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {categoryService ? "Actualizar" : "Crear"}
          </Button>
          <Button
            htmlType="button"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
