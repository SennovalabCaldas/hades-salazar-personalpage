import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Switch,
  Upload,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ENV } from "../../../utils/constants";
import { AcademicExperienceSection } from "../../../api";
import {
  getAllAcademicExperiences,
  getAllSlides,
} from "../../../redux/academicExperienceSlice";
import { useDispatch } from "react-redux";
import "./AcademicExperience.scss";

const { BASE_RESOURCES } = ENV;
const baseApi = BASE_RESOURCES;

const academicExperience = new AcademicExperienceSection();

export const NewAcademicExperience = ({ closeModal, slide }) => {
  const [slideTitle, setSlideTitle] = useState("");
  const [slideDescription, setSlideDescription] = useState("");
  const [year_of_experience, setYearOfExperience] = useState("");
  const [switchState, setSwitchState] = useState(false);
  const [active, setActive] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slideData, setSlideData] = useState([]);
  const dispatch = useDispatch();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSwitchChange = (checked, slideId) => {
    setSwitchState(checked);
    academicExperience
      .updateStateAcademicExperience(slideId, checked)
      .then((res) => {
        console.log(res);
      });
  };

  const options = [];

  for (let i = 2000; i <= new Date().getFullYear(); i++) {
    options.push({
      value: i,
      label: `${i}`,
    });
  }

  useEffect(() => {
    if (slide) {
      console.log("slide=>", slide);
      setSlideTitle(slide.academic_name || "");
      setSlideDescription(slide.academic_description || "");
      setYearOfExperience(slide.year_of_experience || "");
      setActive(slide.active || false);
      console.log(slide.academic_image);
      if (slide.academic_image) {
        setFileList([
          {
            uid: "-1",
            name: "academic_image",
            status: "done",
            url: `${baseApi}/${slide.academic_image}`,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
    console.log(slideTitle, slideDescription);
  }, [slide]);

  // Update preview image on state change
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

  const onFinishUpdate = async (values) => {
    setIsSubmitting(true);

    const uploadedFile = fileList[0]?.originFileObj;

    if (!uploadedFile) {
      console.error("No se ha seleccionado ningún archivo");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();

    formData.append("academic_name", slideTitle);
    formData.append("academic_description", slideDescription);
    formData.append("year_of_experience", year_of_experience);
    formData.append("active", active ? 1 : 0);
    formData.append("academic_image", uploadedFile);

    try {
      await academicExperience.updateAcademicExperience(formData, slide.id);
      academicExperience
        .getAcademicExperiences()
        .then((res) => {
          dispatch(getAllAcademicExperiences(res.data));
          setSlideData(res.data);
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);

    const uploadedFile = fileList[0]?.originFileObj;

    if (!uploadedFile) {
      console.error("No se ha seleccionado ningún archivo");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("academic_name", slideTitle);
    formData.append("academic_description", slideDescription);
    formData.append("year_of_experience", year_of_experience);
    formData.append("active", active);
    formData.append("academic_image", uploadedFile);

    try {
      await academicExperience.createAcademicExperience(formData);
      academicExperience
        .getAcademicExperiences()
        .then((res) => {
          dispatch(getAllAcademicExperiences(res.data));
          setSlideData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      notification.success({
        message: "Éxito",
        description: "Slide creado correctamente.",
      });
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="new-academic-experience-container">
      {slide ? (
        <>
          <div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onFinishUpdate}
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
                rules={[
                  { required: true, message: "La descripción es requerida" },
                ]}
              >
                <Input.TextArea
                  value={slideDescription}
                  onChange={(e) => setSlideDescription(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Año de experiencia"
                rules={[
                  {
                    required: true,
                    message: "El año de experiencia es requerido",
                  },
                ]}
              >
                <Select
                  value={slide ? slide.year_of_experience : null}
                  onChange={(newValue) => setYearOfExperience(newValue)}
                >
                  {options.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Activo"
                rules={[
                  {
                    required: true,
                    message: "El año de experiencia es requerido",
                  },
                ]}
              >
                <Switch
                  checkedChildren="Si"
                  unCheckedChildren="No"
                  defaultChecked={active}
                  onChange={(checked) => handleSwitchChange(checked, slide.id)}
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
                  Actualizar
                </Button>
                <Button onClick={closeModal}>Cancelar</Button>
              </Form.Item>
            </Form>
          </div>
        </>
      ) : (
        <>
          <div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onFinish}
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
                rules={[
                  { required: true, message: "La descripción es requerida" },
                ]}
              >
                <Input.TextArea
                  value={slideDescription}
                  onChange={(e) => setSlideDescription(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Año de experiencia"
                rules={[
                  {
                    required: true,
                    message: "El año de experiencia es requerido",
                  },
                ]}
              >
                <Select
                  value={slide ? slide.year_of_experience : null}
                  onChange={(newValue) => setYearOfExperience(newValue)}
                >
                  {options.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Activo"
                rules={[
                  {
                    required: true,
                    message: "El año de experiencia es requerido",
                  },
                ]}
              >
                <Switch
                  checkedChildren="Si"
                  unCheckedChildren="No"
                  defaultChecked={active}
                  onChange={(checked) => setActive(checked)}
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
                  Guardar
                </Button>
                <Button onClick={closeModal}>Cancelar</Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};
