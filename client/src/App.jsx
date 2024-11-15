import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AuthLayouts from "./components/layouts/AuthLayouts";
import Login from "./components/auth/login";
import Home from "./components/home";
import MainLayouts from "./components/layouts/MainLayouts";
import Product from "./components/product";
import ProductDetail from "./components/product/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useEffect } from "react";
import { notification } from "antd";
import Register from "./components/auth/register";
import { setUser } from "./store/auth";
import LoginAdmin from "./components/admin/components/auth/login";
import MainLayoutAdmin from "./components/admin/components/layouts/mainLayouts";
import CategoriesAdmin from "./components/admin/components/category";
import ProductsAdmin from "./components/admin/components/product";
import { setUserAdmin } from "./store/admin/auth";
import { fetchCategories } from "./store/categories";
import { fetchAllOrderByUserId, fetchCartDetailByUserID } from "./store/cart";
import Order from "./components/order";
import Checkout from "./components/checkout";
import MyAccount from "./components/account";
import OrdersAdmin from "./components/admin/components/orders";
import CheckoutResult from "./components/checkout/CheckoutResult";
import OrderDetailAdmin from "./components/admin/components/orders/OrderDetail";

export const NotificationContext = createContext(null);

export const openNotificationWithIcon = (api, type, title, description) => {
  if (api) {
    return api[type]({
      message: title,
      description: description,
    });
  }
};

// Định dạng tiền Việt
export const formatCurrency = (amount) => {
  // Kiểm tra nếu amount không phải là số
  if (isNaN(amount)) {
    throw new Error("Giá trị phải là một số.");
  }

  // Định dạng số tiền
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

function App() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticatedAdmin = useSelector((state) => state.authAdmin.isAuthenticated);

  const token = localStorage.getItem("token");
  const userInfor = JSON.parse(localStorage.getItem("user")) ?? "";

  useEffect(() => {
    if (token && userInfor?.name) {
      dispatch(setUser(userInfor));
      // lưu danh sách categories khi có user
      dispatch(fetchCartDetailByUserID({ token, userId: userInfor._id }));
      dispatch(fetchAllOrderByUserId({ token, userId: userInfor._id }));
    }

    dispatch(fetchCategories());

    // admin
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const userInforAdmin = JSON.parse(localStorage.getItem("userAdmin")) ?? "";

    if (tokenAdmin && userInforAdmin?.name) {
      dispatch(setUserAdmin(userInforAdmin));
    }
  }, [dispatch, token, userInfor]);

  const PrivateRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
  };

  const PrivateRouteAdmin = () => {
    return isAuthenticatedAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
  };

  return (
    <NotificationContext.Provider value={api}>
      <div>
        {contextHolder}
        <Routes>
          {/* CLIENT */}
          <Route path="/auth" element={<AuthLayouts />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
          <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect / to /home */}
          {/* Phải đăng nhập mới vào đc trang thanh toán và xem giỏ hàng */}
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<MainLayouts />}>
              <Route path="my-account" element={<MyAccount />}></Route>
              <Route path="order" element={<Order />}></Route>
              <Route path="checkout" element={<Checkout />}></Route>
              <Route path="checkout-result" element={<CheckoutResult />}></Route>
            </Route>
          </Route>
          {/* router public */}
          <Route element={<MainLayouts />}>
            <Route path="home" element={<Home />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="product/:id" element={<ProductDetail />}></Route>
          </Route>
          {/* ADMIN */}
          <Route path="/admin" element={<PrivateRouteAdmin />}>
            <Route path="dashboard" element={<MainLayoutAdmin />}>
              <Route path="categories" element={<CategoriesAdmin />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="orders" element={<OrdersAdmin />} />
              <Route path="orders/:id" element={<OrderDetailAdmin />} />
            </Route>
          </Route>
          <Route path="/admin/login" element={<LoginAdmin />} />
          {/* Fallback Route */}
          <Route path="*" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/auth/login" />} />
        </Routes>
      </div>
    </NotificationContext.Provider>
  );
}

export default App;
