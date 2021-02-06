import React, { useContext } from "react";
import { Layout, Form, Input, Button, Typography, notification } from "antd";
import { Route, Redirect } from "react-router-dom";
import { login } from "../../api/usuarios";
import { authContext } from "../../providers/AuthContext";
import jwtDecode from "jwt-decode";
import "./Login.scss";

const { Content } = Layout;
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8 },
};

export default function Login({ history }) {
  const { auth, setAuthData } = useContext(authContext);

  const onFinish = async (values) => {
    const response = await login(values);

    if (response.code === 200) {
      let datosLogin = jwtDecode(response.data);
      datosLogin.token = response.data;
      setAuthData(datosLogin);
      const ruta_siguiente = localStorage.getItem('ruta_siguiente')
      // if(ruta_siguiente.length != 0){
      //   window.location.href = ruta_siguiente;
      // }
      // else{
        window.location.href = "/cocina";
      // }
    } else {
      notification["error"]({
        message: "Error",
        description: response.message,
      });
    }
  };

  return (
    <Layout className="login">
      <Content className="login-content">
        <div className="login-form">
          <Title style={{ textAlign: "center" }} level={3}>
            Inicia Sesi&oacute;n
          </Title>
          <br />
          <Form {...layout} name="basic" onFinish={onFinish}>
            <Form.Item
              label="Correo"
              name="correo"
              rules={[{ required: true, message: "Usuario requerido." }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Contraseña requerida." }]}
            >
              <Input.Password />
            </Form.Item>
            <br />
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}
