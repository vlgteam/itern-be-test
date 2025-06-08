import React, { useState } from "react";
import { Form, Input, Button, Typography, Divider, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../../features/authentication/authApi"; // Đường dẫn này bạn chỉnh lại nếu khác

const { Title } = Typography;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    try {
      await authApi.register({
        email: values.email,
        password: values.password,
      });

      message.success("Đăng ký thành công!");
      navigate("/");
    } catch (error) {
      console.error("Register failed:", error);
      message.error("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <ShoppingCartOutlined style={{ fontSize: 48, color: "#1890ff" }} />
          <Title level={3} style={{ marginTop: 16 }}>
            Đăng ký tài khoản
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

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Hoặc</Divider>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Đăng nhập ngay
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
