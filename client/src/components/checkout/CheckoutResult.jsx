import React from "react";
import Breadcumb from "../layouts/breadcumb";
import { Alert, Button } from "antd";
import { useNavigate } from "react-router-dom";

const CheckoutResult = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Breadcumb parentTitle="Trang chủ" title="Thông báo thanh toán" />

      <div className="page-content-area my-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Alert
                message="Thanh toán thành công!"
                description="Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất."
                type="success"
                showIcon
                className="mb-4"
                style={{ fontSize: "16px", padding: "20px" }}
              />
              <div className="text-left">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate("/home")}
                >
                  Quay về trang chủ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutResult;
