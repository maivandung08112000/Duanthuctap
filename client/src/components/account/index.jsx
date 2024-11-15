import React from "react";
import Breadcumb from "../layouts/breadcumb";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { clearCartStore } from "../../store/cart";
import { Form, Input, Button, Tag } from "antd";
import { formatCurrency } from "../../App";

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderByUserID = useSelector((state) => state.cart.orderData);

  const userInfor = JSON.parse(localStorage.getItem("user")) ?? "";

  const [form] = Form.useForm();

  const handleFinish = () => {};

  return (
    <div>
      <Breadcumb parentTitle={"Trang chủ"} title={"Tài khoản"} />

      <div className="page-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  page wrapper  =======*/}
              <div className="page-wrapper">
                <div className="page-content-wrapper">
                  <div className="row">
                    {/* My Account Tab Menu Start */}
                    <div className="col-lg-3 col-12">
                      <div className="myaccount-tab-menu nav" role="tablist">
                        <a href="#dashboad" className="active" data-bs-toggle="tab">
                          <i className="fa fa-dashboard" />
                          Tổng quan
                        </a>
                        <a href="#orders" data-bs-toggle="tab">
                          <i className="fa fa-cart-arrow-down" />
                          Đơn hàng
                        </a>
                        <a href="#payment-method" data-bs-toggle="tab">
                          <i className="fa fa-credit-card" />
                          Phương thức thanh toán
                        </a>
                        <a href="#address-edit" data-bs-toggle="tab">
                          <i className="fa fa-map-marker" />
                          Địa chỉ
                        </a>
                        <a href="#account-info" data-bs-toggle="tab">
                          <i className="fa fa-user" /> Thông tin tài khoản
                        </a>
                        <a
                          onClick={() => {
                            dispatch(logout());
                            dispatch(clearCartStore());
                            navigate("/home");
                          }}>
                          <i className="fa fa-sign-out" /> Đăng xuất
                        </a>
                      </div>
                    </div>
                    {/* My Account Tab Menu End */}
                    {/* My Account Tab Content Start */}
                    <div className="col-lg-9 col-12">
                      <div className="tab-content" id="myaccountContent">
                        {/* Single Tab Content Start */}
                        <div className="tab-pane fade show active" id="dashboad" role="tabpanel">
                          <div className="myaccount-content">
                            <h3>Tổng quan</h3>
                            <div className="welcome mb-20">
                              <p>
                                Xin chào, <strong>{userInfor?.name}</strong> (Nếu không phải <strong>{userInfor?.name}</strong>
                                <a
                                  onClick={() => {
                                    dispatch(logout());
                                    dispatch(clearCartStore());
                                    navigate("/home");
                                  }}
                                  className="logout"
                                  style={{ marginLeft: 8, color: "red" }}>
                                  Đăng xuất
                                </a>
                                )
                              </p>
                            </div>
                            <p className="mb-0">
                              Từ bảng điều khiển tài khoản của bạn. bạn có thể dễ dàng kiểm tra &amp; và xem các đơn đặt hàng gần đây của mình, quản
                              lý địa chỉ giao hàng và thanh toán cũng như chỉnh sửa chi tiết mật khẩu và tài khoản của mình.
                            </p>
                          </div>
                        </div>
                        {/* Single Tab Content End */}
                        {/* Single Tab Content Start */}
                        <div className="tab-pane fade" id="orders" role="tabpanel">
                          <div className="myaccount-content">
                            <h3>Danh sách đơn hàng</h3>
                            <div className="myaccount-table table-responsive text-center">
                              <table className="table table-bordered">
                                <thead className="thead-light">
                                  <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Ngày</th>
                                    <th>Trạng thái</th>
                                    <th>Tổng cộng</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orderByUserID?.map((order, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{order.receiver_name}</td>
                                      <td> {new Date(order.created_at).toLocaleString()}</td>
                                      <td>
                                        <Tag color={order.status === "pending" ? "orange" : order.status === "completed" ? "green" : "red"}>
                                          {order.status.toUpperCase()}
                                        </Tag>
                                      </td>
                                      <td>{formatCurrency(order.total_price)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        {/* Single Tab Content End */}
                        {/* Single Tab Content Start */}
                        <div className="tab-pane fade" id="payment-method" role="tabpanel">
                          <div className="myaccount-content">
                            <h3>Phương thức thanh toán</h3>
                            <p className="saved-message">Bạn chưa thể lưu phương thức thanh toán của mình.</p>
                          </div>
                        </div>
                        {/* Single Tab Content End */}
                        {/* Single Tab Content Start */}
                        <div className="tab-pane fade" id="address-edit" role="tabpanel">
                          <div className="myaccount-content">
                            <h3>Địa chỉ thanh toán</h3>
                            <address>
                              <p>
                                <strong>{userInfor?.name}</strong>
                              </p>
                              <p>
                                1355 Market St, Suite 900 <br />
                                San Francisco, CA 94103
                              </p>
                              <p>Mobile: (123) 456-7890</p>
                            </address>
                            <a href="#" className="btn d-inline-block edit-address-btn">
                              <i className="fa fa-edit" />
                              Cập nhật địa chỉ
                            </a>
                          </div>
                        </div>
                        {/* Single Tab Content End */}
                        {/* Single Tab Content Start */}
                        <div className="tab-pane fade" id="account-info" role="tabpanel">
                          <div className="myaccount-content">
                            <h3>Chi tiết tài khoản</h3>
                            <div className="account-details-form">
                              <Form form={form} onFinish={handleFinish} layout="vertical" className="custom-form" size="large">
                                <div className="row">
                                  <div className="col-lg-6 col-12">
                                    <Form.Item name="firstName" rules={[{ required: true, message: "Please enter your first name" }]}>
                                      <Input id="first-name" placeholder="First Name" className="custom-input" />
                                    </Form.Item>
                                  </div>
                                  <div className="col-lg-6 col-12">
                                    <Form.Item name="lastName" rules={[{ required: true, message: "Please enter your last name" }]}>
                                      <Input id="last-name" placeholder="Last Name" className="custom-input" />
                                    </Form.Item>
                                  </div>
                                  <div className="col-12">
                                    <Form.Item name="displayName" rules={[{ required: true, message: "Please enter a display name" }]}>
                                      <Input id="display-name" placeholder="Display Name" className="custom-input" />
                                    </Form.Item>
                                  </div>
                                  <div className="col-12">
                                    <Form.Item name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
                                      <Input id="email" placeholder="Email Address" type="email" className="custom-input" />
                                    </Form.Item>
                                  </div>
                                  <div className="col-12 mb-2">
                                    <h4>Thay đổi mật khẩu</h4>
                                  </div>
                                  <div className="col-12">
                                    <Form.Item name="currentPassword" rules={[{ required: true, message: "Please enter your current password" }]}>
                                      <Input.Password id="current-pwd" placeholder="Current Password" className="custom-input" />
                                    </Form.Item>
                                  </div>
                                  <div className="col-lg-6 col-12">
                                    <Form.Item name="newPassword" rules={[{ required: true, message: "Please enter a new password" }]}>
                                      <Input.Password id="new-pwd" placeholder="New Password" className="custom-input" />
                                    </Form.Item>
                                  </div>
                                  <div className="col-lg-6 col-12">
                                    <Form.Item
                                      name="confirmPassword"
                                      dependencies={["newPassword"]}
                                      rules={[
                                        { required: true, message: "Please confirm your password" },
                                        ({ getFieldValue }) => ({
                                          validator(_, value) {
                                            if (!value || getFieldValue("newPassword") === value) {
                                              return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Passwords do not match!"));
                                          },
                                        }),
                                      ]}>
                                      <Input.Password id="confirm-pwd" placeholder="Confirm Password" className="custom-input" />
                                    </Form.Item>
                                  </div>
                                  <div className="col-12">
                                    <Form.Item>
                                      <Button htmlType="submit" className="save-change-btn">
                                        Cập nhật
                                      </Button>
                                    </Form.Item>
                                  </div>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                        {/* Single Tab Content End */}
                      </div>
                    </div>
                    {/* My Account Tab Content End */}
                  </div>
                </div>
              </div>
              {/*=======  End of page wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
