import React, { useEffect, useState } from "react";

import logo from "@/assets/img/logo.webp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth";
import { clearCartStore } from "../../store/cart";
import { formatCurrency } from "../../App";

const Header = () => {
  const dispatch = useDispatch();
  const cartByUserID = useSelector((state) => state.cart);
  const userInfor = JSON.parse(localStorage.getItem("user")) ?? "";

  const [isSettingsMenuActive, setIsSettingsMenuActive] = useState(false);
  const [isMiniCartActive, setIsMiniCartActive] = useState(false);

  useEffect(() => {
    // Sự kiện đóng khi click ra ngoài.
    const handleClickOutside = (e) => {
      // Kiểm tra nếu click ra ngoài của cả settings và mini-cart
      if (!e.target.closest(".header-settings-icon") && !e.target.closest(".mini-cart") && !e.target.closest(".header-cart-icon")) {
        setIsSettingsMenuActive(false);
        setIsMiniCartActive(false);
        document.body.classList.remove("active-overlay");
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    // Cleanup sự kiện khi component bị unmount
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // handle click mở setting
  const handleSettingsClick = (e) => {
    e.preventDefault();
    setIsSettingsMenuActive(!isSettingsMenuActive);
    setIsMiniCartActive(false); // Đóng mini cart nếu settings menu được mở
    document.body.classList.add("active-overlay");
  };

  // handle click mở giỏ hàng
  const handleMiniCartClick = (e) => {
    e.preventDefault();
    setIsMiniCartActive(!isMiniCartActive);
    setIsSettingsMenuActive(false); // Đóng settings menu nếu minicart được mở
    document.body.classList.add("active-overlay");
  };

  return (
    <div className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/*=======  header wrapper  =======*/}
            <div className="header-wrapper d-none d-lg-flex">
              {/* logo */}
              <div className="logo">
                <a>
                  <img width={93} height={25} src={logo} className="img-fluid" alt="" />
                </a>
              </div>
              {/* menu wrapper */}
              <div className="navigation-menu-wrapper">
                <nav>
                  <ul>
                    <li>
                      <Link to="/home">Trang chủ</Link>
                    </li>
                    <li>
                      <Link to="/product">Sản phẩm</Link>
                    </li>
                    <li>
                      <Link to="/order">Giỏ hàng</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* header icon */}
              <div className="header-icon-wrapper">
                <ul className="icon-list">
                  <li>
                    <div className="header-cart-icon">
                      <a href="#" id="minicart-trigger" onClick={handleMiniCartClick}>
                        <i className="ion-bag" />
                        <span className="counter">{cartByUserID?.cartData?.length}</span>
                      </a>
                      {/* mini cart  */}
                      <div className={`mini-cart ${isMiniCartActive ? "active" : ""}`} id="mini-cart">
                        <div className="cart-items-wrapper ps-scroll">
                          {cartByUserID?.cartData?.map((product) => (
                            <div className="single-cart-item" key={product.product_id}>
                              <a href="javascript:void(0)" className="remove-icon">
                                <i className="ion-android-close" />
                              </a>
                              <div className="image">
                                <a href="javascript:void(0)">
                                  <img src={`http://localhost:5555${product.img_url}`} width={80} height={106} className="img-fluid" alt="" />
                                </a>
                              </div>
                              <div className="content">
                                <p className="product-title">
                                  <Link to="/product">{product.name}</Link>
                                </p>
                                {/* Lặp qua từng biến thể để hiển thị thông tin số lượng và giá */}
                                {product.variant.map((variant, index) => (
                                  <p className="count" key={index}>
                                    <span>{variant.quantity} x </span> {formatCurrency(variant.price)} - Màu {variant.color} - Size: {variant.size}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="cart-calculation">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td className="text-start">Total :</td>
                                <td className="text-end">{formatCurrency(cartByUserID?.total_price)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="cart-buttons">
                          <Link to="/order">Giỏ hàng</Link>
                          <Link to="/order">Thanh toán</Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="header-settings-icon">
                      <li>
                        {/* Settings Trigger */}
                        <a href="javascript:void(0)" id="header-settings-trigger" onClick={handleSettingsClick}>
                          <div className="setting-button">
                            <span />
                            <span />
                            <span />
                          </div>
                        </a>
                        {/* Settings Menu */}
                        <div className={`settings-menu-wrapper ${isSettingsMenuActive ? "active" : ""}`} id="settings-menu-wrapper">
                          <div className="single-settings-block">
                            <h4 className="title">Tài khoản</h4>
                            {userInfor?.name && userInfor?.name !== "" ? (
                              <ul>
                                <li>
                                  <Link to="/my-account">Tài khoản</Link>
                                </li>
                                <li>
                                  <a
                                    onClick={() => {
                                      dispatch(logout());
                                      dispatch(clearCartStore());
                                    }}>
                                    Đăng xuất
                                  </a>
                                </li>
                              </ul>
                            ) : (
                              <ul>
                                <li>
                                  <Link to="/auth/login">Đăng nhập</Link>
                                </li>
                                <li>
                                  <Link to="/auth/register">Đăng ký</Link>
                                </li>
                              </ul>
                            )}
                          </div>
                        </div>
                      </li>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/*=======  End of header wrapper  =======*/}
            {/*=======  mobile navigation area  =======*/}
            <div className="header-mobile-navigation d-block d-lg-none">
              <div className="row align-items-center">
                <div className="col-6 col-md-6">
                  <div className="header-logo">
                    <a href="javascript:void(0)">
                      <img width={93} height={25} src="assets/img/logo.webp" className="img-fluid" alt="" />
                    </a>
                  </div>
                </div>
                <div className="col-6 col-md-6">
                  <div className="mobile-navigation text-end">
                    <div className="header-icon-wrapper">
                      <ul className="icon-list justify-content-end">
                        <li>
                          <div className="header-cart-icon">
                            <a href="javascript:void(0)">
                              <i className="ion-bag" />
                              <span className="counter">3</span>
                            </a>
                          </div>
                        </li>
                        <li>
                          <a href="javascript:void(0)" className="mobile-menu-icon" id="mobile-menu-trigger">
                            <i className="fa fa-bars" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*=======  End of mobile navigation area  =======*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
