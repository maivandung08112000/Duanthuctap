import React, { useEffect, useState, useContext } from "react";
import { Button, Space, Table, Drawer, Form, Row, Col, Input, Select, Popconfirm, Tag } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { openNotificationWithIcon, NotificationContext } from "@/App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setListCategory } from "../../../../store/admin/categories";

const CategoriesAdmin = () => {
  const api = useContext(NotificationContext);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("ADD");
  const [formCurd] = Form.useForm();

  //
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      ellipsis: true,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "InActive",
          value: "inactive",
        },
        {
          text: "Closed",
          value: "closed",
        },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (value, record) => {
        let color = value === "active" ? "green" : "gray";
        if (value === "closed") {
          color = "red";
        }
        return <Tag color={color}>{value.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (text, record) => (
        <span style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              showDrawer();
              setAction("UPDATE");
              formCurd.setFieldsValue(record);
            }}
          />
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record?._id)}
            okText="Yes"
            cancelText="No">
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // hàm chạy lần đầu lấy data
  useEffect(() => {
    handleGetList();
  }, []);

  // hàm thêm sửa
  const handleAddorUpdate = async () => {
    if (action === "ADD") {
      formCurd
        .validateFields()
        .then(async (values) => {
          const response = await axios.post(`http://localhost:5555/api/categories/add`, values);

          if (response.status === 201) {
            openNotificationWithIcon(api, "success", "Add product Successful", "You have successfully added product!");
            handleGetList();
            onClose();
            formCurd.resetFields();
          }
        })
        .catch((err) => {
          console.error("Error occurred:", err);
          openNotificationWithIcon(api, "error", "Add product Failed", "Please check your values.");
        })
        .finally(() => {});
    } else {
      formCurd
        .validateFields()
        .then(async (values) => {
          const response = await axios.put(`http://localhost:5555/api/categories/update/${values?._id}`, values);

          if (response.status === 200) {
            openNotificationWithIcon(api, "success", "Update product Successful", "You have successfully updated product!");
            handleGetList();
            onClose();
            formCurd.resetFields();
          }
        })
        .catch((err) => {
          console.error("Error occurred:", err);
          openNotificationWithIcon(api, "error", "Update product Failed", "Please check your values.");
        })
        .finally(() => {});
    }
  };

  // lấy toàn bộ ds
  const handleGetList = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/api/categories`);

      if (response.status === 200) {
        setData(response.data);
        // lưu list category vào store
        dispatch(setListCategory(response.data));
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
    }
  };

  // hàm xoá
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5555/api/categories/delete/${id}`);
      if (response.status === 200) {
        openNotificationWithIcon(api, "success", "Delete product Successful", "You have successfully deleted product!");
        handleGetList();
      }
    } catch (error) {
      console.error("Error occurred:", err);
      openNotificationWithIcon(api, "error", "Delete product Failed", "Please check your values.");
    } finally {
    }
  };

  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}>
        <Button
          type="primary"
          onClick={() => {
            showDrawer();
            formCurd.resetFields();
            setAction("ADD");
          }}
          icon={<PlusOutlined />}>
          Thêm
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          y: "calc(100vh - 350px)",
        }}
      />

      <Drawer
        title={action === "ADD" ? "Thêm mới danh mục" : "Cập nhật danh mục"}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Đóng</Button>
            <Button onClick={() => handleAddorUpdate("ADD")} type="primary">
              Lưu
            </Button>
          </Space>
        }>
        <Form layout="vertical" hideRequiredMark form={formCurd}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                  },
                ]}>
                <Input placeholder="Vui lòng nhập tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập trạng thái",
                  },
                ]}>
                <Select placeholder="Vui lòng nhập trạng thái">
                  <Select.Option value="active">Hoạt động</Select.Option>
                  <Select.Option value="inactive">Không hoạt động</Select.Option>
                  <Select.Option value="closed">Đóng</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả",
                  },
                ]}>
                <Input.TextArea rows={4} placeholder="Vui lòng nhập mô tả" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CategoriesAdmin;
