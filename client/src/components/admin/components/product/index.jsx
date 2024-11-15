import React, { useEffect, useState, useContext } from "react";
import { Button, Space, Table, Drawer, Form, Row, Col, Input, Select, Popconfirm, Tag, Collapse, Upload, Image, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { openNotificationWithIcon, NotificationContext } from "@/App";
import axios from "axios";
import { useSelector } from "react-redux";

const ProductsAdmin = () => {
  const api = useContext(NotificationContext);

  const category = useSelector((state) => state.categoryAdmin.listCategory);

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("ADD");
  const [formCurd] = Form.useForm();

  //
  const [data, setData] = useState([]);

  //
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

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
              const formattedImages = formatImageFileList(record?.image);
              setFileList(formattedImages);

              showDrawer();
              setAction("UPDATE");
              formCurd.setFieldsValue({
                ...record,
                image: formattedImages,
              });
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
    try {
      const values = await formCurd.validateFields();
      const formData = new FormData();

      // Thêm các field văn bản (text fields)
      formData.append("name", values.name);
      formData.append("status", values.status);
      formData.append("description", values.description);
      formData.append("category_id", values.category_id);

      // Thêm biến thể (variants) nếu có
      if (values.variants && values.variants.length > 0) {
        values.variants.forEach((variant, index) => {
          formData.append(`variants[${index}]`, JSON.stringify(variant)); // Gửi từng biến thể dưới dạng chuỗi JSON
        });
      }

      // Thêm file ảnh
      if (fileList && fileList.length > 0) {
        fileList.forEach((file) => {
          if (file.originFileObj) {
            formData.append("images", file.originFileObj); // Gửi ảnh mới nếu có
          }
        });
      }

      // Gửi yêu cầu API tùy theo hành động (ADD hoặc UPDATE)
      const url = action === "ADD" ? `http://localhost:5555/api/product/add` : `http://localhost:5555/api/product/update/${values._id}`;

      const method = action === "ADD" ? "post" : "put";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Kiểm tra phản hồi và thông báo kết quả
      if (response.status === 201 || response.status === 200) {
        openNotificationWithIcon(
          api,
          "success",
          `${action} Product Successful`,
          `You have successfully ${action === "ADD" ? "added" : "updated"} the product!`
        );
        handleGetList(); // Lấy lại danh sách sản phẩm
        onClose(); // Đóng modal hoặc form
        formCurd.resetFields(); // Reset form sau khi hoàn thành
      }
    } catch (error) {
      openNotificationWithIcon(api, "error", `${action} Product Failed`, "Please check your values.");
      console.error("Error occurred:", error);
    }
  };

  // lấy toàn bộ ds
  const handleGetList = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/api/product`);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
    }
  };

  // hàm xoá
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5555/api/product/delete/${id}`);
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

  //
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // Cập nhật fileList vào form
    formCurd.setFieldsValue({
      images: newFileList.map((file) => file.response?.url || file.url), // Lưu URL của ảnh đã upload
    });
  };

  // Convert server image data to format for Upload component
  const formatImageFileList = (images) => {
    return images.map((image, index) => ({
      uid: index, // Unique id for each file
      name: image.img_url.split("/").pop(), // Extract the image name from the URL
      status: "done", // Upload status
      url: `http://localhost:5555${image.img_url}`, // Full URL
    }));
  };

  // Bỏ qua kiểm tra upload
  const beforeUpload = (file) => {
    // Ngăn không cho upload ngay lập tức và bỏ qua kiểm tra
    return false;
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button">
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </button>
  );

  // render form
  const itemsCollapse = [
    {
      key: "1",
      label: "Thông tin chung",
      children: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}>
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: "Please select an status",
                  },
                ]}>
                <Select placeholder="Please select a status">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="category_id"
                label="Danh mục"
                rules={[
                  {
                    required: true,
                    message: "Please select an category",
                  },
                ]}>
                <Select placeholder="Please select a category">
                  {category.map((x, idx) => (
                    <Select.Option key={idx} value={x._id}>
                      {x.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                name="image"
                label="Ảnh"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}>
                <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange} beforeUpload={beforeUpload}>
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
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
                    message: "please enter url description",
                  },
                ]}>
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: "2",
      label: "Danh sách sản phẩm biến thể",
      children: (
        <Form.List name="variants">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Row key={index} gutter={16}>
                  <Col span={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, "size"]}
                      label={"Size"}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, whitespace: true, message: "Vui lòng nhập size sản phẩm." }]}>
                      <Select placeholder="Please select a Size">
                        <Select.Option value="S">Size S</Select.Option>
                        <Select.Option value="XS">Size XS</Select.Option>
                        <Select.Option value="M">Size M</Select.Option>
                        <Select.Option value="L">Size L</Select.Option>
                        <Select.Option value="XL">Size XL</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...field}
                      label={"Mô tả"}
                      name={[field.name, "sku"]}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, whitespace: true, message: "Vui lòng nhập mô tả thêm." }]}>
                      <Input placeholder="Mô tả thêm" />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...field}
                      label={"Màu"}
                      name={[field.name, "color"]}
                      rules={[{ required: true, message: "Please input color!" }]}
                      validateTrigger={["onChange", "onBlur"]}>
                      <Select placeholder="Please select a Màu">
                        <Select.Option value="white">Màu trắng</Select.Option>
                        <Select.Option value="black">Màu đen</Select.Option>
                        <Select.Option value="red">Màu đỏ</Select.Option>
                        <Select.Option value="green">Màu xanh</Select.Option>
                        <Select.Option value="yellow">Màu vàng</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...field}
                      label={"Giá"}
                      name={[field.name, "price"]}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm." }]}
                      style={{ margin: 0 }}>
                      <InputNumber placeholder="Giá" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...field}
                      label={"Số lượng"}
                      name={[field.name, "stock"]}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[{ required: true, message: "Vui lòng nhập số lượng." }]}
                      style={{ margin: 0 }}>
                      <InputNumber placeholder="Nhập số lượng" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <div style={{display: "flex", alignItems: "center"}}>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                        style={{ fontSize: 24, color: "red" }}
                      />
                    ) : null}
                  </div>
                </Row>
              ))}

              <div>
                <Button onClick={() => add()} icon={<PlusOutlined />}>
                  Thêm sản phẩm biến thể
                </Button>
                <Form.ErrorList errors={errors} />
              </div>
            </>
          )}
        </Form.List>
      ),
    },
  ];

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
        title={action === "ADD" ? "Thêm mới sản phẩm" : "Cập nhật sản phẩm"}
        width={1080}
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
          <Collapse defaultActiveKey={["1"]} items={itemsCollapse}></Collapse>
        </Form>
      </Drawer>

      {/* show ảnh xem trước */}
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ProductsAdmin;
