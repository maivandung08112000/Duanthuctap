import React, { useState } from "react";
import { DesktopOutlined, FileOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons";
import {  Layout, Menu, theme, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { logoutAdmin } from "../../../../store/admin/auth";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Q.lý danh mục", "1", <PieChartOutlined />),
  getItem("Q.lý sản phẩm", "2", <DesktopOutlined />),
  getItem("Q.lý đơn hàng", "3", <DesktopOutlined />),
];

const MainLayoutAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authAdmin.user);

  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState("Q.lý danh mục");

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin/login");
  };

  const handleButtonClick = (e) => {
  };
  const handleMenuClickAcc = (e) => {

    // đăng xuất
    if (e.key === "2") {
      handleLogout();
      navigate("/admin/login");
    }
  };
  const menuAcc = [
    {
      label: "Profile",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Logout",
      key: "2",
      icon: <UserOutlined />,
      danger: true,
    },
  ];
  const menuProps = {
    items: menuAcc,
    onClick: handleMenuClickAcc,
  };

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      navigate("/admin/dashboard/categories");
      setTitle("Q.Lý Danh mục");
    } else if (e.key === "2") {
      navigate("/admin/dashboard/products"); 
      setTitle("Q.Lý Sản phẩm");
    } else if (e.key === "3") {
      navigate("/admin/dashboard/orders"); 
      setTitle("Q.Lý Đơn hàng");
    } 
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} onClick={handleMenuClick} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "32px",
            paddingLeft: "24px",
            marginBottom: "24px"
          }}>
          <div className="d-flex w-100 ">
          <h3>{title}</h3>
          </div>
          {/* Dropdown show tên user */}
          <Dropdown.Button
            menu={menuProps}
            placement="bottomLeft"
            icon={<UserOutlined />}
            onClick={handleButtonClick}
            style={{ justifyContent: "flex-end" }}>
            {user?.name} - {user.role}
          </Dropdown.Button>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100%)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            padding: "14px"
          }}>
          ADMIN ECOMMERCE LUXURY SHOP ©{new Date().getFullYear()} Created by group
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayoutAdmin;
