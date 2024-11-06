import { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { login } from "../../service";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export interface ILogin {
  userName: string;
  password: string;
}
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (params: ILogin) => {
    const token = await login(params);
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      navigate('/home');
    }
  };

  return (
    <Form
      name="login-form"
      onFinish={onFinish}
      style={{
        maxWidth: 300,
        margin: "0 auto",
        padding: "1rem",
        border: "1px solid #d9d9d9",
        borderRadius: 4,
      }}
    >
      <Form.Item
        name="userName"
        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
      >
        <Input placeholder="Tên đăng nhập" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
