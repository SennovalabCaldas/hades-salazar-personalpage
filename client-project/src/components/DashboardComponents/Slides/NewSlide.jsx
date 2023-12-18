import React, { useState, useEffect } from "react";
import { Button, Form, Input, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ENV } from "../../../utils/constants";
import { SliderSection } from "../../../api";
import { getAllSlides } from "../../../redux/sliderSlice";
import { useDispatch } from "react-redux";
import "./NewSlide.scss"; // Importa tu archivo de estilos (si es necesario)

const { BASE_RESOURCES } = ENV;
const baseApi = BASE_RESOURCES;
const slider = new SliderSection();

export const NewSlide = ({ closeModal, slide }) => {
  const dispatch = useDispatch();

  const [slideTitle, setSlideTitle] = useState("");
  const [slideDescription, setSlideDescription] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (slide) {
      setSlideTitle(slide.slide_title || "");
      setSlideDescription(slide.slide_description || "");
      if (slide.slide_image) {
        setFileList([
          {
            uid: "-1",
            name: "slide_image",
            status: "done",
            url: `${baseApi}/${slide.slide_image}`,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [slide]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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
            type: "image/jpeg",
            lastModified: Date.now(),
          },
        },
      ]);
    }
  }, [fileList]);

  const handleFinish = async (values) => {
    setIsSubmitting(true);

    const uploadedFile = fileList[0]?.originFileObj;

    if (!uploadedFile) {
      console.error("No se ha seleccionado ningún archivo");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("slide_title", slideTitle);
    formData.append("slide_description", slideDescription);
    formData.append("slide_image", uploadedFile);

    try {
      const action = slide
        ? slider.updateSlider(formData, slide.id)
        : slider.createSlider(formData);

      await action;

      const slides = await slider.getSlides();
      dispatch(getAllSlides(slides.data));
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      notification.success({
        message: "Éxito",
        description: slide
          ? "Slide actualizado correctamente."
          : "Slide creado correctamente.",
      });
    }
  }, [isSubmitting, slide]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="new-slide-container">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Titulo"
          rules={[{ required: true, message: "El titulo es requerido" }]}
        >
          <Input
            value={slideTitle}
            onChange={(e) => setSlideTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Descripción"
          rules={[{ required: true, message: "La descripción es requerida" }]}
        >
          <Input.TextArea
            value={slideDescription}
            onChange={(e) => setSlideDescription(e.target.value)}
          />
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {slide ? "Actualizar" : "Guardar"}
          </Button>
          <Button onClick={closeModal}>Cancelar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewSlide;
