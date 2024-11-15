import React, { useContext } from "react";
import Breadcumb from "../layouts/breadcumb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio } from "antd";
import { formatCurrency, NotificationContext, openNotificationWithIcon } from "../../App";
import axios from "axios";

const Checkout = () => {
  const api = useContext(NotificationContext);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const cartByUserID = useSelector((state) => state.cart);

  const [formCheckout] = Form.useForm();

  const onSubmit = () => {
    formCheckout
      .validateFields()
      .then(async (values) => {
        // Giả sử token được lưu trong localStorage
        const token = localStorage.getItem("token"); 
  
        const response = await axios.post(
          `http://localhost:5555/api/place-order`, 
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào headers
            },
          }
        );
  
        if (response.status === 201) {
          openNotificationWithIcon(api, "success", "Order Successful", "You have successfully placed an order!");
          formCheckout.resetFields();
          navigate("/home");
  
          if (values.payment_method === "cod") {
            navigate("/checkout-result");
          }
        }
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        openNotificationWithIcon(api, "error", "Order Failed", "Please check your values.");
      });
  };
  
  return (
    <div>
      <Breadcumb parentTitle={"Trang chủ"} title={"Thanh toán"} />

      <div className="page-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  page wrapper  =======*/}
              <div className="page-wrapper">
                <div className="page-content-wrapper">
                  {/* Checkout Form s*/}
                  <Form layout="vertical" onFinish={onSubmit} form={formCheckout} className="checkout-form">
                    <div className="row row-40">
                      {/* Billing Address */}
                      <div className="col-lg-7">
                        <div id="billing-form">
                          <h4 className="checkout-title">Thông tin thanh toán</h4>
                          <div className="row">
                            <div className="col-md-6 col-md-12">
                              <Form.Item name="receiver_name" label="Họ tên người nhận" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
                                <Input placeholder="Họ tên người nhận" />
                              </Form.Item>
                            </div>
                            <div className="col-md-6 col-md-12">
                              <Form.Item
                                name="receiver_phone"
                                label="Số điện thoại người nhận"
                                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                                <Input placeholder="Số điện thoại người nhận" />
                              </Form.Item>
                            </div>
                            <div className="col-md-6 col-md-12">
                              <Form.Item name="receiver_email" label="Email người nhận" rules={[{ required: true, message: "Vui lòng nhập email" }]}>
                                <Input placeholder="Email người nhận" />
                              </Form.Item>
                            </div>
                            <div className="col-md-6 col-md-12">
                              <Form.Item
                                name="receiver_address"
                                label="Địa chỉ người nhận"
                                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
                                <Input placeholder="Địa chỉ người nhận" />
                              </Form.Item>
                            </div>
                            <div className="col-md-6 col-md-12">
                              <Form.Item name="note" label="Ghi chú">
                                <Input placeholder="Ghi chú" />
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cart Total */}
                      <div className="col-lg-5">
                        <div className="checkout-cart-total">
                          <h4 className="checkout-title">Giỏ hàng</h4>
                          <ul>
                            {cartByUserID?.cartData?.map((product) =>
                              product.variant.map((variant) => (
                                <li key={`${product.product_id}-${variant.color}-${variant.size}`}>
                                  {product.name} x {variant.quantity} <span>{formatCurrency(variant.price * variant.quantity)}</span>
                                </li>
                              ))
                            )}
                          </ul>

                          <p>
                            Tổng tiền{" "}
                            <span>
                              {formatCurrency(cartByUserID.cartData.reduce(
                                (total, product) =>
                                  total + product.variant.reduce((subtotal, variant) => subtotal + variant.price * variant.quantity, 0),
                                0
                              ))}
                            </span>
                          </p>
                          <p>
                            Phí ship <span>30.000</span>
                          </p>
                          <h4>
                            Tổng cộng{" "}
                            <span>
                              {formatCurrency(cartByUserID.cartData.reduce(
                                (total, product) =>
                                  total + product.variant.reduce((subtotal, variant) => subtotal + variant.price * variant.quantity, 0),
                                0
                              ))}
                            </span>
                          </h4>
                        </div>

                        {/* Payment Method */}
                        <div className="checkout-payment-method">
                          <h4 className="checkout-title">Phương thức thanh toán</h4>
                          <Form.Item name="payment_method" rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán" }]}>
                            <Radio.Group>
                              <Radio value="cod">COD</Radio>
                              <Radio value="momo">MoMo</Radio>
                              <Radio value="vnpay">VNPay</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                        <Button type="primary" htmlType="submit" className="place-order">
                          Đặt hàng
                        </Button>
                      </div>
                    </div>
                  </Form>
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

export default Checkout;
