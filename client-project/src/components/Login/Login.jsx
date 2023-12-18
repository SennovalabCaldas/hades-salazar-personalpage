import { Button, Checkbox, Form, Input } from "antd";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "../../api";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/userSlice";
import { motion } from "framer-motion";
import { image } from "../../assets";

const auth = new Auth();

export const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);

  const onFinish = (values) => {
    console.log("Success:", values);
    const data = {
      email: values.email,
      current_password: values.current_password,
    };
    console.log(data);
    auth
      .login(data)
      .then((res) => {
        dispatch(login(res));
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-left"></div>
      <div
        className="login-right"
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          maxWidth: "600px",
          margin: "auto",
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={image.logo}
            alt="logo"
            style={{
              width: "300px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </motion.div>
        <Form
          name="basic"
          style={{
            maxWidth: 650,
            margin: "auto",
            fontSize: "12px",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Correo"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="current_password"
            rules={[
              {
                required: true,
                message: "Please input your current_password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox
              style={{
                textAlign: "center",
                width: "100%",
                fontSize: "12px",
              }}
            >
              Recordar mis credenciales
            </Checkbox>
          </Form.Item>

          <Form.Item
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#ff4d4f",
                borderColor: "#ff4d4f",
                width: "100%",
                fontSize: "12px",
                fontWeight: "bold",
                borderRadius: "5px",
                color: "#fff",
              }}
            >
              Iniciar sesión
            </Button>
          </Form.Item>
          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: "12px",
            }}
          >
            <a
              type="primary"
              href="/forgot-password"
              style={{
                textAlign: "center",
                width: "100%",
                fontSize: "12px",
              }}
            >
              ¿Olvidaste tu contraseña?
            </a>
            <div>
              <a
                type="primary"
                href="/register"
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: "12px",
                }}
              >
                ¿No tienes una cuenta? <strong>Registrate</strong>
              </a>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
