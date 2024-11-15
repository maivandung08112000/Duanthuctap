import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotificationContext, openNotificationWithIcon } from "../../App";
import axios from "axios";
import { setUser } from "../../store/auth/index"

const Login = () => {
  const api = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`http://localhost:5555/api/auth/login`, values);

      if (response.status === 200) {
        const userData = response.data;
        dispatch(setUser(userData));

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData?.token);

        openNotificationWithIcon(api, "success", "Login Successful", "You have successfully logged in!");
        navigate("/home");
      }
    } catch (error) {
      openNotificationWithIcon(api, "error", "Login Failed", "Please check your credentials and try again.");
    } finally {
    }
  };

  return (
    <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
      <Form className="login-form" onFinish={onFinish} validateTrigger={["onBlur", "onSubmit"]}>
        <div className="login-form">
          <h4 className="login-title">Đăng nhập</h4>
          <div className="row">
            <div className="col-md-12 col-12 mb-20">
              <label>Email*</label>
              <Form.Item name="email">
                <Input placeholder="Email" />
              </Form.Item>
            </div>
            <div className="col-md-12 col-12 mb-20">
              <label>Mật khẩu</label>

              <Form.Item name="password">
                <Input type="password" placeholder="Password" />
              </Form.Item>
            </div>

            <div className="col-sm-6">
              <div className="check-box d-inline-block ml-0 ml-md-2">
                <input type="checkbox" id="remember_me" />
                <label htmlFor="remember_me">Lưu</label>
              </div>
            </div>
            <div className="col-sm-6 text-start text-sm-end">
              <Link to="/auth/register" className="forget-pass-link">
                Đăng ký?
              </Link>
            </div>
            <div className="col-md-12">
              <Button className="register-button" htmlType="submit">
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
