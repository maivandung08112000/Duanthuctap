import React, { useContext } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotificationContext, openNotificationWithIcon } from "../../App";
import axios from "axios";

const Register = () => {
  const api = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`http://localhost:5555/api/auth/register`, values);

      if (response.status === 201) {
        openNotificationWithIcon(api, "success", "Register Successful", "You have successfully logged in!");
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
      
      openNotificationWithIcon(api, "error", "Register Failed", "Please check your credentials and try again.");
    }
  };

  return (
    <div className="col-sm-12 col-md-12 col-lg-12 col-xs-12">
      <Form onFinish={onFinish}>
        <div className="login-form">
          <h4 className="login-title">Đăng ký</h4>
          <div className="row">
            <div className="col-md-6 col-12 mb-20">
              <label>Họ Tên</label>
              <Form.Item name="name">
                <Input placeholder="Họ tên" />
              </Form.Item>
            </div>
            <div className="col-md-6 col-12 mb-20">
              <label>Email</label>
              <Form.Item name="email">
                <Input placeholder="Email" />
              </Form.Item>
            </div>
            <div className="col-md-12 mb-20">
              <label>Password</label>
              <Form.Item name="password">
                <Input.Password type="password" placeholder="Password" />
              </Form.Item>
            </div>
            <div className="col-md-12 mb-20">
              <label>Quyền</label>
              <Form.Item name="role">
                <Select
                  showSearch
                  placeholder="Select roles"
                  filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                  options={[
                    {
                      value: "admin",
                      label: "Admin",
                    },
                    {
                      value: "user",
                      label: "User",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="col-sm-6"></div>
            <div className="col-sm-6 text-start text-sm-end">
              <Link to="/auth/login" className="forget-pass-link">
                Đăng nhập?
              </Link>
            </div>
            <div className="col-md-12">
              <Button className="register-button" htmlType="submit">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Register;
