import React, { useEffect, useState, useContext } from "react";
import { Button, Space, Table, Drawer, Form, Row, Col, Input, Select, Popconfirm, Tag } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { openNotificationWithIcon, NotificationContext } from "@/App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../../App";

const OrdersAdmin = () => {
  const api = useContext(NotificationContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const [data, setData] = useState([]);

  const columns = [
    { title: "Id đơn hàng", dataIndex: "order_id", key: "order_id", ellipsis: true },
    { title: "Tên người nhận", dataIndex: "receiver_name", key: "receiver_name", ellipsis: true },
    { title: "Số điện thoại", dataIndex: "receiver_phone", key: "receiver_phone", ellipsis: true },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "pending" ? "orange" : status === "completed" ? "green" : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    { title: "Tông tiền", dataIndex: "total_price", key: "total_price", render: (price) => `${formatCurrency(price)}` },
    { title: "Ngày tạo", dataIndex: "created_at", key: "created_at", render: (date) => new Date(date).toLocaleString() },
    {
      title: "Chức năng",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button icon={<InfoCircleOutlined />} onClick={() => handleDetail(record)} />
        </Space>
      ),
    },
  ];

  // hàm chạy lần đầu lấy data
  useEffect(() => {
    handleGetList();
  }, []);

  // lấy toàn bộ ds
  const handleGetList = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/api/all-orders`);

      if (response.status === 200) {
        setData(response.data.orders);
        // lưu list category vào store
        // dispatch(setListCategory(response.data)); 
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
    }
  };

  const handleDetail = (data) => {
    navigate(`/admin/dashboard/orders/${data?.order_id}`, { state: { order: data } }); // Điều hướng đến route với orderId
  };

  // Định nghĩa hàm hiển thị `items` trong bảng mở rộng
  const expandedRowRender = (order) => {
    const itemColumns = [
      { title: "ID", dataIndex: "product_id", key: "product_id" },
      { title: "Tên", dataIndex: "name", key: "name" },
      { title: "Ảnh", dataIndex: "img_url", key: "img_url", render: (url) => <img src={`http://localhost:5555${url}`} alt="product" style={{ width: 50 }} /> },
      {
        title: "Biến thể",
        key: "variants",
        render: (text, record) => (
          <ul>
            {record.variants.map((variant, idx) => (
              <li key={idx}>
                Color: {variant.color}, Size: {variant.size}, Price: ${variant.price}, Quantity: {variant.quantity}
              </li>
            ))}
          </ul>
        ),
      },
    ];

    return <Table columns={itemColumns} dataSource={order.items} pagination={false} rowKey="product_id" />;
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="order_id"
        pagination={{ pageSize: 5 }}
        scroll={{ y: "calc(100vh - 350px)" }}
      />
    </>
  );
};

export default OrdersAdmin;
