import {
  MailOutlined,
  MobileOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Typography } from "antd";
import React, { useState } from "react";
import { Auth } from "../../api";
import { register } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { image } from "../../assets";

const auth = new Auth();

export const Register = () => {
  const [active, setActive] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formLayout, setFormLayout] = useState("horizontal");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone_number,
      current_password: values.current_password,
      active: active,
    };
    console.log(data);

    auth
      .register(data)
      .then((res) => {
        console.log(res);
        dispatch(register(res));
        if (res.active === 1) redirect("/admin/dashboard");
        else redirect("/login");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        width: "70%",
        height: "100hv",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
        padding: "50px 70px",
      }}
    >
      <div
        style={{
          width: "30%",
          height: "100hv",
        }}
      >
        <img
          src={image.logo}
          alt="spotify"
          style={{
            width: "100%",
            height: "100hv",
            objectFit: "contain",
          }}
        />
      </div>
      <div
        style={{
          textAlign: "center",
          width: "60%",
        }}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
          style={{
            maxWidth: 600,
            margin: "0 auto",
            backgroundColor: "rgb(248 248 248)",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Typography.Title
            style={{
              textAlign: "center",
            }}
            level={3}
          >
            Registro
          </Typography.Title>
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre de usuario",
              },
            ]}
          >
            <Input
              placeholder="Nombre(s)"
              addonAfter={<UserOutlined />}
              style={{
                width: "90%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su apellido(s)",
              },
            ]}
          >
            <Input
              placeholder="Apellido(s)"
              addonAfter={<UserOutlined />}
              style={{
                width: "90%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su número de teléfono",
              },
            ]}
            style={{
              width: "100%",
            }}
          >
            <PhoneInput
              placeholder="Número de teléfono"
              defaultCountry="US" // Cambia esto según la región predeterminada
              international
              countryCallingCodeEditable={false}
              inputProps={{
                style: {
                  width: "90%",
                },
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su correo electrónico",
              },
            ]}
          >
            <Input
              placeholder="Correo electrónico"
              addonAfter={<MailOutlined />}
              style={{
                width: "90%",
              }}
            />
          </Form.Item>
          <Form.Item
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            <Form.Item
              name="current_password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su contraseña",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <Input.Password
                placeholder="Contraseña"
                addonAfter={<UnlockOutlined />}
                style={{
                  width: "90%",
                }}
              />
            </Form.Item>
            <Form.Item
              name="repeat_password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su contraseña",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input.Password
                placeholder="Repetir contraseña"
                addonAfter={<UnlockOutlined />}
                style={{
                  width: "90%",
                }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Registrarme
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
