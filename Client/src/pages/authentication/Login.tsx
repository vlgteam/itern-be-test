import React, { useState } from "react";
import { Form, Input, Button, Typography, Divider, message } from "antd";
import {
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../../features/authentication/authApi";
const { Title } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const role = await authApi.login(values.email, values.password);
      console.log("Login successful");
      message.success("Đăng nhập thành công!");
      if (role === "admin") {
        navigate("/admin/homepage");
      } else if (role === "user") {
        navigate("/user/homepage");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Email hoặc mật khẩu không đúng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <ShoppingCartOutlined className="text-blue-500 text-5xl" />
          <Title level={3} className="!mt-4">
            Đăng nhập
          </Title>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <Form.Item className="text-right -mt-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Quên mật khẩu?
            </a>
          </Form.Item>
        </Form>

        <Divider plain>Hoặc</Divider>

        <Button
          icon={<GoogleOutlined />}
          block
          onClick={() =>
            message.info("Chức năng Google Login sẽ được tích hợp sau")
          }
          className="bg-white border-gray-300 text-black hover:bg-gray-100"
        >
          Đăng nhập với Google
        </Button>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Đăng ký ngay
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
