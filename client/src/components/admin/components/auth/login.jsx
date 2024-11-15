import React, { useContext } from "react";
import { Form, Input, Checkbox, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { openNotificationWithIcon, NotificationContext } from "@/App";
import { useDispatch } from "react-redux";
import { setLoadingAdmin, setUserAdmin } from "../../../../store/admin/auth";

const LoginAdmin = () => {
  const api = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(setLoadingAdmin(true));

    try {
      const response = await axios.post(`http://localhost:5555/api/auth/login`, values);

      if (response.status === 200) {
        const userData = response.data;
        dispatch(setUserAdmin(userData));

        localStorage.setItem("userAdmin", JSON.stringify(userData));
        localStorage.setItem("tokenAdmin", userData?.token);

        openNotificationWithIcon(api, "success", "Login Successful", "You have successfully logged in!");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      openNotificationWithIcon(api, "error", "Login Failed", "Please check your credentials and try again.");
    } finally {
      dispatch(setLoadingAdmin(false));
    }
  };

  return (
    <Row style={{ alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Col span={8}>
        <h1>ĐĂNG NHẬP</h1>
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, message: "Please input your Email!" }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginAdmin;
